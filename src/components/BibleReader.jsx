import React, { useState, useEffect } from 'react';
import { Search, Book as BookIcon, ChevronRight, ChevronLeft } from 'lucide-react';

const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

const BibleReader = () => {
  const [verses, setVerses] = useState([]);
  const [currentBook, setCurrentBook] = useState('John');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [reference, setReference] = useState('John 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('browse'); // 'browse' or 'search'

  const fetchChapter = async (book, chapter) => {
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(book + ' ' + chapter)}?translation=kjv`);
      const data = await response.json();
      if (data.verses) {
        setVerses(data.verses);
        setReference(data.reference);
      } else {
        setVerses([]);
      }
    } catch (err) {
      console.error("Bible fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=kjv`);
      const data = await response.json();
      if (data.verses) {
        setVerses(data.verses);
        setReference(data.reference);
      } else {
        setVerses([{ text: "No results found for that reference.", verse: 0 }]);
      }
    } catch (err) {
      console.error("Bible search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapter(currentBook, currentChapter);
  }, [currentBook, currentChapter]);

  const handleBookChange = (e) => {
    setCurrentBook(e.target.value);
    setCurrentChapter(1);
  };

  const handleChapterNav = (dir) => {
    const nextChapter = Math.max(1, currentChapter + dir);
    setCurrentChapter(nextChapter);
  };

  return (
    <div style={{
      height: '100%',
      padding: '1.5rem',
      background: 'white',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      border: '1px solid var(--glass-border)',
      overflow: 'hidden'
    }}>
      {/* Header & Mode Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ 
          fontSize: '1.2rem', 
          fontWeight: 900, 
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <BookIcon size={20} color="var(--primary)" />
          HOLY BIBLE
        </h2>
        <div style={{ display: 'flex', background: 'var(--bg-color)', borderRadius: '10px', padding: '2px' }}>
          <button 
            onClick={() => setMode('browse')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.7rem',
              fontWeight: 800,
              cursor: 'pointer',
              background: mode === 'browse' ? 'white' : 'transparent',
              color: mode === 'browse' ? 'var(--primary)' : 'var(--text-dim)',
              boxShadow: mode === 'browse' ? 'var(--shadow-sm)' : 'none'
            }}
          >BROWSE</button>
          <button 
            onClick={() => setMode('search')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.7rem',
              fontWeight: 800,
              cursor: 'pointer',
              background: mode === 'search' ? 'white' : 'transparent',
              color: mode === 'search' ? 'var(--primary)' : 'var(--text-dim)',
              boxShadow: mode === 'search' ? 'var(--shadow-sm)' : 'none'
            }}
          >SEARCH</button>
        </div>
      </div>

      {/* Controls Area */}
      <div style={{ padding: '0.5rem', background: 'var(--bg-color)', borderRadius: '16px' }}>
        {mode === 'browse' ? (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select 
              value={currentBook} 
              onChange={handleBookChange}
              style={{
                flexGrow: 2,
                padding: '0.6rem',
                borderRadius: '10px',
                border: '1px solid var(--glass-border)',
                background: 'white',
                fontSize: '0.85rem',
                fontWeight: 600,
                outline: 'none'
              }}
            >
              {BIBLE_BOOKS.map(book => <option key={book} value={book}>{book}</option>)}
            </select>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'white', padding: '2px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
              <button onClick={() => handleChapterNav(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-dim)' }}><ChevronLeft size={18} /></button>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, minWidth: '30px', textAlign: 'center' }}>{currentChapter}</span>
              <button onClick={() => handleChapterNav(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-dim)' }}><ChevronRight size={18} /></button>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={(e) => { e.preventDefault(); performSearch(searchQuery); }}
            style={{ display: 'flex', gap: '8px' }}
          >
            <input 
              type="text" 
              placeholder="e.g. John 3:16 or Psalm 23"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flexGrow: 1,
                padding: '0.6rem 1rem',
                borderRadius: '10px',
                border: '1px solid var(--glass-border)',
                background: 'white',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button type="submit" style={{
              background: 'var(--primary)',
              border: 'none',
              borderRadius: '10px',
              padding: '0 12px',
              color: 'white',
              cursor: 'pointer'
            }}><Search size={18} /></button>
          </form>
        )}
      </div>

      {/* Scripture View */}
      <div 
        className="custom-scrollbar"
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '1rem',
          lineHeight: 1.8,
          fontSize: '1rem',
          color: 'var(--text-main)',
          minHeight: 0
        }}
      >
        <style>
          {`
            .custom-scrollbar::-webkit-scrollbar { width: 5px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.1); border-radius: 10px; }
            .verse-num {
              font-size: 0.65rem;
              font-weight: 800;
              color: var(--primary);
              vertical-align: super;
              margin-right: 4px;
              opacity: 0.7;
            }
          `}
        </style>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>
            <div className="animate-pulse">Opening the scrolls...</div>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--primary)', textAlign: 'center' }}>{reference}</h3>
            {verses.map((v, i) => (
              <span key={i} style={{ marginBottom: '8px', display: 'inline' }}>
                <span className="verse-num">{v.verse}</span>
                {v.text}{' '}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div style={{ 
        padding: '0.5rem', 
        fontSize: '0.65rem', 
        color: 'var(--text-dim)', 
        textAlign: 'center', 
        borderTop: '1px solid var(--glass-border)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Authorized King James Version
      </div>
    </div>
  );
};

export default BibleReader;
