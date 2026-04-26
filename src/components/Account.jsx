import React from 'react';
import { User, LogOut, Mail, Settings, Shield } from 'lucide-react';
import { auth } from '../firebase';

const Account = ({ user, openAuth }) => {
  if (!user) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        borderRadius: '24px',
        padding: '2rem',
        textAlign: 'center',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--glass-border)'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: 'var(--bg-color)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-dim)'
        }}>
          <User size={40} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Your Journey Awaits</h2>
          <p style={{ color: 'var(--text-dim)', fontWeight: 500, maxWidth: '300px' }}>Sign in to sync your progress, customize your profile, and join the Guardians community.</p>
        </div>
        <button 
          onClick={openAuth}
          style={{ 
            padding: '1rem 2.5rem', 
            borderRadius: '16px', 
            background: 'var(--primary)', 
            color: 'white', 
            border: 'none', 
            fontSize: '1.1rem', 
            fontWeight: 800, 
            cursor: 'pointer',
            boxShadow: 'var(--shadow-emerald)'
          }}
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      borderRadius: '24px',
      padding: '2rem',
      gap: '2rem',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--glass-border)',
      overflowY: 'auto'
    }}>
      {/* Header Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--bg-color)' }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '32px', 
          overflow: 'hidden', 
          background: 'var(--primary-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(16, 185, 129, 0.15)'
        }}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <User size={48} color="var(--primary)" />
          )}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>
              {user.displayName || 'Guardian'}
            </h2>
            <Shield size={18} color="var(--primary)" fill="rgba(16, 185, 129, 0.1)" />
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--text-dim)', fontWeight: 500, margin: 0 }}>{user.email}</p>
        </div>
      </div>

      {/* Stats / Info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1.25rem', background: 'var(--bg-color)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.02)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Account Status</p>
          <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Verified Guardian</p>
        </div>
        <div style={{ padding: '1.25rem', background: 'var(--bg-color)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.02)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Member Since</p>
          <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>{new Date(user.metadata.creationTime).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Menu Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
        <button style={{ 
          display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', 
          background: 'transparent', border: '1.5px solid var(--bg-color)', 
          borderRadius: '16px', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.9rem',
          cursor: 'pointer', transition: 'all 0.2s'
        }}>
          <Settings size={20} /> App Settings
        </button>
        <button style={{ 
          display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', 
          background: 'transparent', border: '1.5px solid var(--bg-color)', 
          borderRadius: '16px', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.9rem',
          cursor: 'pointer', transition: 'all 0.2s'
        }}>
          <Mail size={20} /> Notification Preferences
        </button>
        <button 
          onClick={() => auth.signOut()}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', 
            background: '#fff1f2', border: '1px solid #ffe4e6', 
            borderRadius: '16px', color: '#e11d48', fontWeight: 800, fontSize: '0.9rem',
            cursor: 'pointer', transition: 'all 0.2s', marginTop: '1rem'
          }}
        >
          <LogOut size={20} /> SIGN OUT
        </button>
      </div>
    </div>
  );
};

export default Account;
