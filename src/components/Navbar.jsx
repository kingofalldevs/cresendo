import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleScroll();
    handleResize();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navLinks = ['Features', 'Pricing'];

  return (
    <>
      <nav style={{ 
        height: scrolled ? '64px' : '80px',
        width: isMobile ? '92%' : (scrolled ? '85%' : '95%'),
        maxWidth: '1200px',
        margin: scrolled ? '1rem auto' : '1.5rem auto',
        padding: isMobile ? '0 1.5rem' : '0 2.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '40px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.03)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          {/* Logo */}
          <h1 style={{ 
            fontSize: '1.1rem', 
            letterSpacing: '-0.04em', 
            fontWeight: 900, 
            margin: 0,
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            CRESCENDO<span style={{ color: 'var(--primary)' }}>.</span>
          </h1>

          {/* Desktop Links */}
          {!isMobile && (
            <div style={{ 
              display: 'flex', 
              gap: '2.5rem', 
              alignItems: 'center',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              {navLinks.map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                    opacity: 0.6,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.opacity = 1}
                  onMouseOut={(e) => e.target.style.opacity = 0.6}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {!isMobile && (
              <button style={{ 
                background: scrolled ? 'var(--primary)' : 'white', 
                border: 'none',
                cursor: 'pointer', 
                color: scrolled ? 'white' : 'var(--text-main)', 
                fontSize: '0.75rem',
                padding: '0.6rem 1.4rem',
                borderRadius: '100px',
                fontWeight: 700,
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease'
              }}>
                Sign In
              </button>
            )}

            {isMobile && (
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px'
                }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '90px',
              left: '4%',
              right: '4%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '2rem',
              zIndex: 999,
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}
              >
                {item}
              </a>
            ))}
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '0.5rem 0' }} />
            <button style={{ 
              background: 'var(--primary)', 
              border: 'none',
              cursor: 'pointer', 
              color: 'white', 
              fontSize: '0.9rem',
              padding: '1rem',
              borderRadius: '16px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Sign In
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

