import React, { useState, useEffect } from 'react';
import { Download, X, Share, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    // Check if already in standalone mode
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsStandalone(standalone);
    
    if (!standalone) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (!isVisible || isStandalone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        style={{
          position: 'fixed',
          bottom: '90px',
          left: '1rem',
          right: '1rem',
          zIndex: 2000,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(24px)',
          padding: '1.25rem',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          border: '1px solid rgba(16, 185, 129, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
              <img src="/crescendo_logo.png" alt="Crescendo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#1a1a1a' }}>Install Crescendo</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)' }}>Add to home screen for the full experience</p>
            </div>
          </div>
          <button onClick={() => setIsVisible(false)} style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', color: '#666' }}>
            <X size={18} />
          </button>
        </div>

        {deferredPrompt ? (
          <button
            onClick={handleInstall}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '1rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)'
            }}
          >
            <Download size={20} />
            Install Now
          </button>
        ) : (
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.03)', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 600, color: '#333', display: 'flex', alignItems: 'center', gap: '12px', lineHeight: 1.4 }}>
            {isIOS ? (
              <>
                <Share size={20} color="var(--primary)" />
                <span>Tap <strong>Share</strong> then scroll to <strong>'Add to Home Screen'</strong></span>
              </>
            ) : (
              <>
                <MoreVertical size={20} color="var(--primary)" />
                <span>Tap the <strong>browser menu</strong> (three dots) and select <strong>'Install App'</strong> or <strong>'Add to Home Screen'</strong></span>
              </>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPrompt;
