import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import { User, LogOut, Mail, Settings, Zap } from 'lucide-react';

const Navbar = ({ apps, slots, openApp, isMobile, user, openAuth, startFighterMode }) => {
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
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img src="/lamb_logo.png" alt="Logo" style={{ height: '50px', width: 'auto', display: 'block' }} />
        </div>

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
              const isAccount = app.id === 'account';
              const Icon = app.icon;
              
              return (
                <button
                  key={app.id}
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
                  {isAccount && user?.photoURL ? (
                    <img src={user.photoURL} alt="Me" style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <Icon size={16} />
                  )}
                  {app.name}
                </button>
              );
            })}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* URGENCY BUTTON (Previously User Icon) */}
          <button 
            onClick={startFighterMode}
            className="urge-btn"
            style={{ 
              background: 'var(--primary)', 
              border: 'none',
              cursor: 'pointer', 
              color: 'white', 
              fontSize: '0.7rem',
              padding: '0.5rem 1rem',
              borderRadius: '100px',
              fontWeight: 900,
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Zap size={14} fill="white" />
            URGE
          </button>

          {!user && (
            <button 
              onClick={openAuth}
              style={{ 
                background: 'transparent', 
                border: '1px solid var(--primary)',
                cursor: 'pointer', 
                color: 'var(--primary)', 
                fontSize: '0.7rem',
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                fontWeight: 800,
                transition: 'all 0.3s ease',
                textTransform: 'uppercase'
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


