import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthModal = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(8px)',
      padding: '2rem',
      zIndex: 9999
    }} onClick={onClose}>
      <div 
        onClick={e => e.stopPropagation()}
        style={{
        width: '100%',
        maxWidth: '400px',
        background: 'white',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-premium)',
        padding: '3rem 2rem',
        border: '1px solid var(--glass-border)',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'var(--bg-color)',
            border: 'none',
            borderRadius: '50%',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-dim)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            letterSpacing: '-0.04em', 
            fontWeight: 900, 
            margin: '0 0 0.5rem 0',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            CRESCENDO<span style={{ color: 'var(--primary)' }}>.</span>
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>
            {isLogin ? 'Welcome back, Guardian.' : 'Begin your journey.'}
          </p>
        </div>

        {error && (
          <div style={{ 
            background: '#fef2f2', 
            color: '#ef4444', 
            padding: '1rem', 
            borderRadius: '12px', 
            fontSize: '0.8rem', 
            fontWeight: 700,
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input 
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                borderRadius: '12px',
                border: '2px solid var(--bg-color)',
                background: 'var(--bg-color)',
                fontSize: '0.9rem',
                outline: 'none',
                fontWeight: 600
              }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                borderRadius: '12px',
                border: '2px solid var(--bg-color)',
                background: 'var(--bg-color)',
                fontSize: '0.9rem',
                outline: 'none',
                fontWeight: 600
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: loading ? 'default' : 'pointer',
              marginTop: '0.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
            }}
          >
            {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
            {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'white',
            color: 'var(--text-main)',
            border: '2px solid var(--glass-border)',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: loading ? 'default' : 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'var(--bg-color)'}
          onMouseOut={e => e.currentTarget.style.background = 'white'}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.419 L -8.284 53.419 C -8.554 54.819 -9.414 55.979 -10.534 56.719 L -10.534 59.469 L -6.644 59.469 C -4.364 57.339 -3.264 54.709 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.579 C -11.764 58.319 -13.134 58.739 -14.754 58.739 C -17.884 58.739 -20.534 56.629 -21.484 53.799 L -25.464 53.799 L -25.464 56.889 C -23.494 60.809 -19.424 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.799 C -21.734 53.059 -21.874 52.279 -21.874 51.489 C -21.874 50.699 -21.734 49.919 -21.484 49.179 L -21.484 46.089 L -25.464 46.089 C -26.284 47.729 -26.754 49.559 -26.754 51.489 C -26.754 53.419 -26.284 55.249 -25.464 56.889 L -21.484 53.799 Z"/>
              <path fill="#EA4335" d="M -14.754 44.239 C -12.984 44.239 -11.404 44.849 -10.154 46.029 L -6.584 42.459 C -8.724 40.469 -11.514 39.239 -14.754 39.239 C -19.424 39.239 -23.494 41.669 -25.464 45.589 L -21.484 48.679 C -20.534 45.849 -17.884 44.239 -14.754 44.239 Z"/>
            </g>
          </svg>
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary)', 
              fontWeight: 800, 
              cursor: 'pointer',
              padding: 0
            }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
