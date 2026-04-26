import React from 'react';
import { Users, MessageSquare, ShieldCheck } from 'lucide-react';

const Community = () => {
  return (
    <div style={{
      height: '100%',
      padding: '2rem',
      background: 'white',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      border: '1px solid var(--glass-border)',
      overflowY: 'auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }}>Guardians Community</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>You are not walking this path alone.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { user: 'Gabriel', msg: 'Day 15 feeling strong. The scripture today really helped.', time: '2m ago' },
          { user: 'Elijah', msg: 'Anyone else struggling with late-night urges? Looking for tips.', time: '15m ago' },
          { user: 'Sarah', msg: 'Remember: One day at a time. The momentum builds!', time: '1h ago' }
        ].map((chat, i) => (
          <div key={i} style={{ 
            padding: '1rem', 
            background: 'var(--bg-color)', 
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} /> {chat.user}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{chat.time}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>{chat.msg}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', position: 'relative' }}>
        <input 
          placeholder="Share a word of encouragement..."
          style={{
            width: '100%',
            padding: '1rem',
            paddingRight: '3rem',
            borderRadius: '16px',
            border: '2px solid var(--bg-color)',
            background: 'var(--bg-color)',
            fontSize: '0.85rem',
            outline: 'none',
            fontFamily: 'Inter, sans-serif'
          }}
        />
        <MessageSquare 
          size={18} 
          style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} 
        />
      </div>
    </div>
  );
};

export default Community;
