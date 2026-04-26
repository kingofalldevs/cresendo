import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import BibleReader from './components/BibleReader';
import ChecklistTracker from './components/ChecklistTracker';
import TennisGame from './components/TennisGame';
import Community from './components/Community';
import Motivation from './components/Motivation';
import Footer from './components/Footer';
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

  const openApp = (appId) => {
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
        slots={slots} 
        openApp={openApp} 
        isMobile={window.innerWidth < 768} 
      />
      
      <main style={{ 
        flexGrow: 1, 
        padding: '1.5rem',
        marginTop: '100px', // Adjusted for taller navbar
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1800px',
        margin: '100px auto 40px',
        width: '100%',
        height: 'auto',
        minHeight: 'calc(100vh - 140px)',
        position: 'relative'
      }}>
        <AnimatePresence mode="popLayout">
          {slots.map((appId, index) => {
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
                      justifyContent: 'center'
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
                <AppComp />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
