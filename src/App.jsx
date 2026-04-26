import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import BibleReader from './components/BibleReader';
import ChecklistTracker from './components/ChecklistTracker';
import TennisGame from './components/TennisGame';
import Community from './components/Community';
import Account from './components/Account';
import AuthModal from './components/AuthScreen';
import { BookOpen, Home, Users, Trophy, User, Zap, X } from 'lucide-react';
import { auth } from './firebase';

const APP_CONFIG = {
  bible: { id: 'bible', name: 'Bible', icon: BookOpen, component: BibleReader, closable: false },
  home: { id: 'home', name: 'Home', icon: Home, component: ChecklistTracker, closable: true },
  community: { id: 'community', name: 'Community', icon: Users, component: Community, closable: true },
  tennis: { id: 'tennis', name: 'Tennis', icon: Trophy, component: TennisGame, closable: true },
  account: { id: 'account', name: 'Account', icon: User, component: Account, closable: true }
};

function App() {
  const [slots, setSlots] = useState(['bible', 'home', 'tennis']);
  const [activeMobileApp, setActiveMobileApp] = useState('home');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFighterMode, setIsFighterMode] = useState(false);
  const [showFighterMessage, setShowFighterMessage] = useState(false);

  const [communityDraft, setCommunityDraft] = useState('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) setIsAuthModalOpen(false);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, []);

  const isMobile = windowWidth < 1024;
  const openAuth = () => setIsAuthModalOpen(true);

  const startFighterMode = () => {
    setShowFighterMessage(true);
    setTimeout(() => {
      setShowFighterMessage(false);
      setIsFighterMode(true);
      openApp('tennis');
    }, 4000);
  };

  const openApp = (appId) => {
    if (isMobile) {
      setActiveMobileApp(appId);
      return;
    }

    if (slots.includes(appId)) {
      if (appId === 'bible') return; // Bible is fixed
      // If it's already open, just make sure it stays
      return;
    }
    
    // Find first available slot (1 or 2)
    const newSlots = [...slots];
    if (newSlots[1] === null) {
      newSlots[1] = appId;
    } else if (newSlots[2] === null) {
      newSlots[2] = appId;
    } else {
      // Swap out slot 2 if both full
      newSlots[2] = appId;
    }
    setSlots(newSlots);
  };

  const shareToCommunity = (text) => {
    setCommunityDraft(text);
    openApp('community');
  };

  const closeApp = (slotIndex) => {
    if (slotIndex === 0) return; // Cannot close bible
    const newSlots = [...slots];
    if (newSlots[slotIndex] === 'tennis') setIsFighterMode(false);
    newSlots[slotIndex] = null;
    setSlots(newSlots);
  };

  const MobileAppComp = APP_CONFIG[activeMobileApp]?.component;

  const appProps = {
    user,
    openAuth,
    communityDraft,
    setCommunityDraft,
    shareToCommunity,
    isFighterMode
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      background: 'var(--bg-color)',
      fontFamily: 'Inter, sans-serif',
      overflowX: 'hidden'
    }}>
      <style>
        {`
          @keyframes urgeGlow {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); transform: scale(1); }
            50% { box-shadow: 0 0 30px 10px rgba(16, 185, 129, 0.2); transform: scale(1.05); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); transform: scale(1); }
          }
          .urge-btn {
            animation: urgeGlow 2s infinite ease-in-out;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .urge-btn:hover {
            transform: scale(1.1) translateY(-5px);
            background: var(--text-main) !important;
          }
        `}
      </style>

      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onSuccess={() => setIsAuthModalOpen(false)} 
        />
      )}

      <AnimatePresence>
        {showFighterMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url("/fighter_bg.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center'
            }}
          >
            {/* Dark Overlay for readability */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }} />
            
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              style={{ maxWidth: '800px', zIndex: 1, position: 'relative' }}
            >
              <h2 style={{ color: 'var(--primary)', fontSize: '1.25rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800 }}>
                Emergency Override
              </h2>
              <p style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem' }}>
                Do not sell your future and health for 2 mins pleasure.
              </p>
              <p style={{ color: 'var(--primary)', fontSize: '1.75rem', fontWeight: 700, fontStyle: 'italic', marginBottom: '2rem' }}>
                "Just come down, it's just but this moment."
              </p>
              <div style={{ width: '80px', height: '4px', background: 'var(--primary)', margin: '0 auto', borderRadius: '2px', boxShadow: '0 0 15px var(--primary)' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar 
        apps={APP_CONFIG} 
        slots={isMobile ? [activeMobileApp] : slots} 
        openApp={openApp} 
        isMobile={isMobile} 
        user={user}
        openAuth={openAuth}
        startFighterMode={startFighterMode}
      />
      
      <main style={{ 
        flexGrow: 1, 
        padding: isMobile ? '1rem' : '1.5rem',
        marginTop: isMobile ? '70px' : '100px', 
        display: isMobile ? 'flex' : 'grid',
        flexDirection: 'column',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1800px',
        margin: isMobile ? '70px auto 80px' : '100px auto 40px',
        width: '100%',
        height: 'auto',
        minHeight: isMobile ? 'calc(100vh - 150px)' : 'calc(100vh - 140px)',
        position: 'relative'
      }}>
        <AnimatePresence mode="popLayout">
          {isMobile ? (
            <motion.div
              key={activeMobileApp}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              style={{ 
                height: 'calc(100vh - 160px)',
                width: '100%',
                position: 'relative' 
              }}
            >
              {MobileAppComp && <MobileAppComp {...appProps} />}
            </motion.div>
          ) : (
            slots.map((appId, index) => {
              if (!appId) return null;
              
              const AppComp = APP_CONFIG[appId]?.component;
              if (!AppComp) return null;

              return (
                <motion.div
                  key={appId}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 100 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 30,
                    opacity: { duration: 0.2 }
                  }}
                  style={{ 
                    height: 'calc(100vh - 180px)',
                    minHeight: '600px',
                    position: 'relative' 
                  }}
                >
                  <AppComp {...appProps} />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(16, 185, 129, 0.1)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '0.75rem 1rem 1.5rem 1rem', // Extra padding for iOS home indicator
          zIndex: 2000,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.03)'
        }}>
          {Object.values(APP_CONFIG).map((app) => {
            const isActive = activeMobileApp === app.id;
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => openApp(app.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  color: isActive ? 'var(--primary)' : 'var(--text-dim)',
                  cursor: 'pointer',
                  padding: '8px',
                  transition: 'color 0.2s ease'
                }}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span style={{ 
                  fontSize: '0.65rem', 
                  fontWeight: isActive ? 800 : 600,
                  opacity: isActive ? 1 : 0.8
                }}>
                  {app.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
