import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import BibleReader from './components/BibleReader';
import ChecklistTracker from './components/ChecklistTracker';
import TennisGame from './components/TennisGame';
import Community from './components/Community';
import Motivation from './components/Motivation';
import { BookOpen, Home, Users, Trophy, Zap, X } from 'lucide-react';

const APP_CONFIG = {
  bible: { id: 'bible', name: 'Bible', icon: BookOpen, component: BibleReader, closable: false },
  home: { id: 'home', name: 'Home', icon: Home, component: ChecklistTracker, closable: true },
  community: { id: 'community', name: 'Community', icon: Users, component: Community, closable: true },
  tennis: { id: 'tennis', name: 'Tennis', icon: Trophy, component: TennisGame, closable: true },
  motivation: { id: 'motivation', name: 'Motivation', icon: Zap, component: Motivation, closable: true }
};

function App() {
  const [slots, setSlots] = useState(['bible', 'home', 'tennis']);
  const [activeMobileApp, setActiveMobileApp] = useState('home');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 1024;

  const openApp = (appId) => {
    if (isMobile) {
      setActiveMobileApp(appId);
      return;
    }

    if (slots.includes(appId)) return;
    
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

  const closeApp = (slotIndex) => {
    if (slotIndex === 0) return; // Cannot close bible
    const newSlots = [...slots];
    newSlots[slotIndex] = null;
    setSlots(newSlots);
  };

  const MobileAppComp = APP_CONFIG[activeMobileApp]?.component;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      background: 'var(--bg-color)',
      fontFamily: 'Inter, sans-serif',
      overflowX: 'hidden'
    }}>
      <Navbar 
        apps={APP_CONFIG} 
        slots={isMobile ? [activeMobileApp] : slots} 
        openApp={openApp} 
        isMobile={isMobile} 
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
              transition={{ duration: 0.2 }}
              style={{ 
                height: 'calc(100vh - 160px)',
                width: '100%',
                position: 'relative' 
              }}
            >
              {MobileAppComp && <MobileAppComp />}
            </motion.div>
          ) : (
            slots.map((appId, index) => {
              if (!appId) return null;
              
              const AppComp = APP_CONFIG[appId].component;
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
                  {APP_CONFIG[appId].closable && (
                    <button
                      onClick={() => closeApp(index)}
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        zIndex: 10,
                        background: 'rgba(0,0,0,0.05)',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '4px',
                        cursor: 'pointer',
                        color: 'var(--text-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                  <AppComp />
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
