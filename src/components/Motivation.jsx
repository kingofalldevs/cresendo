import React from 'react';
import { Youtube, Zap, Shield } from 'lucide-react';

const Motivation = () => {
  // USER: Update this ID daily for your 'GrindBuddy' fuel
  const DAILY_VIDEO_ID = 'OyKIbaSk2s4'; 
  const DAILY_TITLE = 'Stop Wasting Time - Jim Rohn';

  return (
    <div style={{
      height: '100%',
      padding: '2rem',
      background: 'white',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '2rem',
      border: '1px solid var(--glass-border)',
      textAlign: 'center'
    }}>
      <div style={{ flexShrink: 0 }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          fontWeight: 900, 
          color: 'var(--text-main)',
          lineHeight: 1.1
        }}>
          THE DAILY <span style={{ color: 'var(--primary)' }}>GRIND</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600, marginTop: '0.5rem' }}>
          One message. One focus. Zero excuses.
        </p>
      </div>

      <div style={{
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#000',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(16, 185, 129, 0.1)'
      }}>
        <div style={{ 
          position: 'relative', 
          paddingBottom: '56.25%',
          height: 0 
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${DAILY_VIDEO_ID}?modestbranding=1&rel=0`}
            title={DAILY_TITLE}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      </div>

      <div style={{ padding: '0 1rem', marginTop: 'auto' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px',
          color: 'var(--text-main)',
          fontWeight: 800,
          fontSize: '0.9rem'
        }}>
          <Youtube size={20} color="#ff0000" />
          {DAILY_TITLE}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '1rem', fontStyle: 'italic' }}>
          "Don't wish it were easier, wish you were better." — Jim Rohn
        </p>
      </div>
    </div>
  );
};

export default Motivation;
