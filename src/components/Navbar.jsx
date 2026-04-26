import React from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ apps, slots, openApp, isMobile }) => {
  return (
    <nav style={{ 
      height: 'auto',
      width: '100%',
      padding: '0.75rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 2000,
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(16, 185, 129, 0.08)',
      transition: 'all 0.3s ease',
      gap: '0.75rem'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '1800px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        {/* Logo */}
        <h1 style={{ 
          fontSize: '1rem', 
          letterSpacing: '-0.04em', 
          fontWeight: 900, 
          margin: 0,
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          CRESCENDO<span style={{ color: 'var(--primary)' }}>.</span>
        </h1>

        {/* Center: App Tabs */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '4px',
            background: 'rgba(0,0,0,0.03)',
            borderRadius: '16px'
          }}>
            {Object.values(apps).map((app) => {
              const isOpen = slots.includes(app.id);
              const Icon = app.icon;
              return (
                <motion.button
                  key={app.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openApp(app.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    background: isOpen ? 'white' : 'transparent',
                    color: isOpen ? 'var(--primary)' : 'var(--text-dim)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    boxShadow: isOpen ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.2s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  <Icon size={16} />
                  {app.name}
                  {isOpen && (
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--primary)'
                    }} />
                  )}
                </motion.button>
              );
            })}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={{ 
            background: 'var(--primary)', 
            border: 'none',
            cursor: 'pointer', 
            color: 'white', 
            fontSize: '0.75rem',
            padding: '0.6rem 1.25rem',
            borderRadius: '100px',
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

