import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, MessageSquare, Send, User, Heart, MessageCircle, ArrowLeft } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, arrayUnion, arrayRemove, where } from 'firebase/firestore';

const Community = ({ user, openAuth, communityDraft, setCommunityDraft }) => {
  const [displayName, setDisplayName] = useState(localStorage.getItem('crescendo_guardian_name') || '');
  const [tempName, setTempName] = useState('');
  
  const [posts, setPosts] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const [activePost, setActivePost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (communityDraft) {
      setNewMessage(communityDraft);
      setCommunityDraft('');
      // ensure we are on main feed
      setActivePost(null);
    }
  }, [communityDraft, setCommunityDraft]);

  // Fetch Posts (Reddit style: newest first)
  useEffect(() => {
    if (!displayName) return;

    const q = query(collection(db, 'community_posts'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = [];
      snapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(fetchedPosts);
      setErrorMsg(null);
    }, (error) => {
      console.error("Firestore Error:", error);
      if (error.code === 'permission-denied') {
        setErrorMsg("Connection blocked: Please enable Test Mode in your Firestore Database Rules.");
      } else {
        setErrorMsg(error.message);
      }
    });

    return () => unsubscribe();
  }, [displayName]);

  // Fetch Comments for Active Post
  useEffect(() => {
    if (!activePost) {
      setComments([]);
      return;
    }
    const q = query(collection(db, 'community_comments'), where('postId', '==', activePost.id), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      setComments(fetched);
    });
    return () => unsubscribe();
  }, [activePost]);

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    try {
      localStorage.setItem('crescendo_guardian_name', tempName.trim());
      setDisplayName(tempName.trim());
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !displayName) return;
    const text = newMessage.trim();
    setNewMessage(''); 
    try {
      await addDoc(collection(db, 'community_posts'), {
        user: displayName,
        uid: user.uid,
        msg: text,
        createdAt: serverTimestamp(),
        likes: [],
        commentCount: 0
      });
      setErrorMsg(null);
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.code === 'permission-denied') {
        setErrorMsg("Cannot post: Please enable Test Mode in your Firestore Database Rules.");
      }
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !displayName || !activePost) return;
    const text = newComment.trim();
    setNewComment('');
    try {
      await addDoc(collection(db, 'community_comments'), {
        postId: activePost.id,
        user: displayName,
        uid: user.uid,
        msg: text,
        createdAt: serverTimestamp(),
        likes: []
      });
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const handleLike = async (collectionName, docId, currentLikes = []) => {
    if (!user) {
      openAuth();
      return;
    }
    const docRef = doc(db, collectionName, docId);
    const hasLiked = currentLikes.includes(user.uid);
    try {
      if (hasLiked) {
        await updateDoc(docRef, { likes: arrayRemove(user.uid) });
      } else {
        await updateDoc(docRef, { likes: arrayUnion(user.uid) });
      }
      
      // Update local state for activePost if we are liking the parent post from within the thread
      if (activePost && docId === activePost.id) {
        setActivePost(prev => ({
          ...prev,
          likes: hasLiked ? prev.likes.filter(id => id !== user.uid) : [...prev.likes, user.uid]
        }));
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    let date;
    if (typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      try {
        date = new Date(timestamp);
      } catch (e) {
        return 'Just now';
      }
    }
    
    if (isNaN(date.getTime())) return 'Just now';

    const now = new Date();
    const diff = (now - date) / 1000;

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 172800) return 'Yesterday';
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  const renderPostCard = (post, isComment = false) => {
    const likes = post.likes || [];
    const hasLiked = user && likes.includes(user.uid);
    const isMine = user && post.uid === user.uid;

    // Detect and beautifully style shared streaks (e.g. 🔥 30 DAY STREAK)
    const messageText = typeof post.msg === 'string' ? post.msg : '';
    const streakMatch = messageText.match(/(🔥\s*\d+\s*DAY STREAK)/i);
    const hasStreak = streakMatch !== null;
    const streakText = hasStreak ? streakMatch[1] : null;
    const remainingText = hasStreak ? messageText.replace(streakText, '').trim() : messageText;

    return (
      <div key={post.id} style={{ 
        padding: '1rem', 
        background: isComment ? 'transparent' : 'white', 
        borderBottom: isComment ? 'none' : '1px solid var(--glass-border)',
        borderLeft: isComment ? '2px solid var(--glass-border)' : 'none',
        marginLeft: isComment ? '0.5rem' : '0',
        marginBottom: isComment ? '0' : '0.5rem',
        borderRadius: isComment ? '0' : '16px',
        boxShadow: isComment ? 'none' : '0 2px 8px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '0.8rem', color: isMine ? 'var(--primary)' : 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={14} color={isMine ? 'var(--primary)' : 'var(--text-dim)'} />
            {post.user}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>{formatTime(post.createdAt)}</span>
        </div>
        {hasStreak && (
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 900, marginBottom: remainingText ? '0.5rem' : '0', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)', width: 'fit-content', letterSpacing: '0.05em' }}>
            {streakText}
          </div>
        )}
        {remainingText && (
          <p style={{ fontSize: '0.9rem', margin: '0.25rem 0', lineHeight: 1.5, color: 'var(--text-main)', wordBreak: 'break-word' }}>
            {remainingText}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
          <button
            onClick={() => handleLike(isComment ? 'community_comments' : 'community_posts', post.id, likes)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: hasLiked ? '#ef4444' : 'var(--text-dim)', transition: 'color 0.2s' }}
          >
            <Heart size={14} fill={hasLiked ? '#ef4444' : 'none'} strokeWidth={hasLiked ? 0 : 2} />
            {likes.length > 0 && <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>{likes.length}</span>}
          </button>
          
          {!isComment && (
            <button
              onClick={() => setActivePost(post)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)', transition: 'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--text-main)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
            >
              <MessageSquare size={14} strokeWidth={2} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Reply</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderAuthOrComposer = (isComment = false) => {
    if (!user) {
      return (
        <div style={{ padding: '1rem', background: 'white', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={20} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)' }}>Sign in to join the conversation.</span>
          </div>
          <button onClick={openAuth} style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>
            Sign In
          </button>
        </div>
      );
    }

    if (!displayName) {
      return (
        <form onSubmit={handleJoin} style={{ padding: '1rem', background: 'white', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input 
              type="text" value={tempName} onChange={(e) => setTempName(e.target.value)}
              placeholder="Set anonymous display name..." maxLength={15}
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '12px', border: '2px solid var(--bg-color)', background: 'var(--bg-color)', fontSize: '0.85rem', outline: 'none', fontWeight: 600 }}
            />
          </div>
          <button type="submit" style={{ padding: '0.75rem 1.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Save Name
          </button>
        </form>
      );
    }

    if (isComment) {
      return (
        <form onSubmit={handlePostComment} style={{ padding: '1rem', background: 'white', borderTop: '1px solid var(--glass-border)', flexShrink: 0, position: 'sticky', bottom: 0 }}>
          <div style={{ position: 'relative' }}>
            <input 
              value={newComment} onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              style={{ width: '100%', padding: '1rem', paddingRight: '3.5rem', borderRadius: '16px', border: '2px solid var(--bg-color)', background: 'var(--bg-color)', fontSize: '0.85rem', outline: 'none' }}
            />
            <button type="submit" disabled={!newComment.trim()}
              style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: newComment.trim() ? 'var(--primary)' : 'transparent', color: newComment.trim() ? 'white' : 'var(--text-dim)', border: 'none', padding: '0.5rem', borderRadius: '10px', cursor: newComment.trim() ? 'pointer' : 'default', transition: 'all 0.2s' }} >
              <Send size={16} />
            </button>
          </div>
        </form>
      );
    }

    return (
      <form onSubmit={handleSendMessage} style={{ marginBottom: '1rem', position: 'relative' }}>
        <input 
          value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Share a thought with the community..."
          style={{ width: '100%', padding: '1.25rem', paddingRight: '3.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', background: 'white', fontSize: '0.9rem', outline: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', fontWeight: 500 }}
        />
        <button type="submit" disabled={!newMessage.trim()}
          style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: newMessage.trim() ? 'var(--primary)' : 'var(--bg-color)', color: newMessage.trim() ? 'white' : 'var(--text-dim)', border: 'none', padding: '0.5rem', borderRadius: '10px', cursor: newMessage.trim() ? 'pointer' : 'default', transition: 'all 0.2s' }} >
          <Send size={16} />
        </button>
      </form>
    );
  };

  return (
    <div style={{ height: '100%', background: 'var(--bg-color)', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '1rem 1.5rem', background: 'white', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: activePost ? 'flex-start' : 'space-between', gap: '1rem', flexShrink: 0, zIndex: 10 }}>
        {activePost ? (
          <button 
            onClick={() => setActivePost(null)}
            style={{ background: 'var(--bg-color)', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-main)' }}
          >
            <ArrowLeft size={18} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={24} color="var(--primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>Guardians Support</h2>
          </div>
        )}
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
          {activePost ? 'Thread' : (displayName ? `Posting as ${displayName}` : 'Viewing as Guest')}
        </div>
      </div>

      <div className="custom-scrollbar" style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <style>{`.custom-scrollbar::-webkit-scrollbar { width: 5px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.2); border-radius: 10px; }`}</style>
        
        {errorMsg && (
          <div style={{ margin: '1rem', padding: '1rem', background: '#fef2f2', color: '#ef4444', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #fca5a5', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        {!activePost ? (
          /* Main Feed */
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            {renderAuthOrComposer(false)}

            {posts.map(post => renderPostCard(post, false))}
          </div>
        ) : (
          /* Thread View */
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Parent Post */}
            <div style={{ padding: '1rem', background: 'white', borderBottom: '1px solid var(--glass-border)' }}>
              {renderPostCard(activePost, false)}
            </div>
            
            {/* Comments List */}
            <div style={{ flexGrow: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Comments ({comments.length})
              </h3>
              {comments.map(comment => renderPostCard(comment, true))}
            </div>

            {renderAuthOrComposer(true)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
