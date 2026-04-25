import React from 'react';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import LifeChart from './LifeChart';
import WhyWeBuiltThis from './WhyWeBuiltThis';
import Features from './Features';
import Pricing from './Pricing';

const Hero = ({ stats }) => {
  const [viewType, setViewType] = React.useState('Monthly');

  // ── Dynamic Urgency Engine ──────────────────────────────────────────────
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthName = today.toLocaleString('default', { month: 'long' });
  const monthProgress = Math.round((day / daysInMonth) * 100);
  const yearProgress = Math.round((month / 12) * 100);
  const age = stats?.age || 0;

  const getUrgencyMessage = () => {
    if (viewType === 'Monthly') {
      return { 
        headline: `${monthName.toUpperCase()} IS ENOUGH TO HEAL/RECOVER.`, 
        sub: `Take the first step today. Join now and reclaim your rhythm.` 
      };
    }
    if (viewType === 'Yearly') {
      return { headline: `A YEAR OF TRANSFORMATION.`, sub: `Reflect on how far you've come. The final stretch is yours to define.` };
    }
    return { headline: `YOUR LONG-TERM HARMONY`, sub: `Recovery isn't a destination, it's a crescendo. Map your progress and see the growth.` };
  };

  const urgency = getUrgencyMessage();

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 2rem 60px',
        position: 'relative',
        overflow: 'hidden',
        borderBottomRightRadius: '200px',
        backgroundColor: 'var(--bg-color)'
      }}>
        {/* Organic Curved Diagonal Split */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0, 
          pointerEvents: 'none',
          background: 'var(--bg-color)' 
        }}>
          <svg 
            viewBox="0 0 1000 1000" 
            preserveAspectRatio="none" 
            style={{ 
              width: '100%', 
              height: '100%',
              opacity: 1
            }}
          >
            <path 
              d="M1000,1000 L1000,0 C900,500 100,500 0,1000 Z" 
              fill="hsl(145, 45%, 94%)" 
            />
            {/* Elegant Wave Lines */}
            <path 
              d="M1000,850 C800,400 200,600 0,950" 
              stroke="white" 
              strokeWidth="1.5" 
              fill="none" 
              opacity="0.4"
            />
            <path 
              d="M1000,700 C750,300 250,500 0,800" 
              stroke="white" 
              strokeWidth="1" 
              fill="none" 
              opacity="0.3"
            />
            <path 
              d="M1000,550 C700,200 300,400 0,650" 
              stroke="white" 
              strokeWidth="0.8" 
              fill="none" 
              opacity="0.2"
            />
            <path 
              d="M1000,400 C650,100 350,300 0,500" 
              stroke="white" 
              strokeWidth="0.5" 
              fill="none" 
              opacity="0.1"
            />
          </svg>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Eyebrow */}
          <div className="flex-center gap-2" style={{ justifyContent: 'center' }}>
            <span className="animate-pulse-slow" style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              color: 'var(--primary)'
            }}>
              Recovery Support Ecosystem
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: 'var(--text-main)',
            margin: '0.5rem 0',
          }}>
            Break Cycles. <span style={{ color: 'var(--primary)' }}>Find Rhythm.</span> Reclaim Life.
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: 'var(--text-dim)',
            maxWidth: '550px',
            margin: '0 auto',
            fontWeight: 500
          }}>
            A dedicated sanctuary to track your resilience and connect with support. Transform your recovery into a lasting symphony of growth.
          </p>

          {/* CTAs */}
          <div className="flex-center gap-4" style={{ marginTop: '1.5rem' }}>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '12px',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
            >
              Join for Free
            </button>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '12px',
              background: 'transparent',
              color: 'var(--text-main)',
              border: '1px solid var(--glass-border)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Start Journey
            </button>
          </div>
        </motion.div>
      </section>

      {/* Chart Section */}
      <section style={{
        padding: '0 0 3rem',
        width: '100%'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ padding: '1.5rem 0 6rem', height: '650px', display: 'flex', flexDirection: 'column', background: 'transparent', alignItems: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1100px',
            marginBottom: '2rem',
            padding: '0 1rem'
          }}>
            <div style={{
              background: 'rgba(226, 232, 240, 0.5)',
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              fontSize: '0.7rem',
              fontWeight: 900,
              color: 'var(--text-dim)',
              letterSpacing: '0.1em',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase'
            }}>
              Demo
            </div>

            {/* View Selector */}
            <div style={{
              background: 'rgba(226, 232, 240, 0.5)',
              padding: '4px',
              borderRadius: '12px',
              display: 'flex',
              gap: '4px',
              position: 'relative',
              width: 'fit-content',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {['Monthly', 'Yearly', 'Lifetime'].map((type) => (
                <button
                  key={type}
                  onClick={() => setViewType(type)}
                  style={{
                    padding: '0.5rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1,
                    background: viewType === type ? 'white' : 'transparent',
                    color: viewType === type ? 'var(--text-main)' : 'var(--text-dim)',
                    boxShadow: viewType === type ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            
            {/* Empty spacer for centering the middle element */}
            <div style={{ width: '80px', visibility: 'hidden' }}></div>
          </div>

          {/* Dynamic Urgency Banner */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            padding: '1rem 0',
            marginBottom: '1rem',
            maxWidth: '620px',
            width: '100%',
            textAlign: 'center',
            borderBottom: '1px solid rgba(16, 185, 129, 0.1)'
          }}>
            <p style={{ 
              margin: 0, 
              fontWeight: 900, 
              fontSize: '1.5rem', 
              color: 'var(--text-main)', 
              letterSpacing: '-0.02em',
              textTransform: 'uppercase'
            }}>
              {urgency.headline}
            </p>
            <p style={{ 
              margin: 0, 
              fontWeight: 600, 
              fontSize: '0.8rem', 
              color: '#10b981', 
              opacity: 0.8,
              letterSpacing: '0.01em'
            }}>
              {urgency.sub}
            </p>
          </div>

          <div style={{ flexGrow: 1, width: '100%', paddingBottom: '2rem' }}>
            <LifeChart age={stats?.age || 0} viewType={viewType} />
          </div>

          <div className="flex-between text-2xs text-dim" style={{ paddingTop: '1rem', fontWeight: 700, marginTop: '1rem' }}>
            <div className="flex-center gap-2">
              <Info size={12} style={{ color: '#10b981' }} />
              <span>Momentum Indicator: Stable Growth</span>
            </div>
            <span>REFERENCE: RECOVERY-STABILITY-INDEX-V2</span>
          </div>
        </motion.div>

        {/* Features Section */}
        <div id="features">
          <Features />
        </div>

        {/* Pricing Section */}
        <div id="pricing">
          <Pricing />
        </div>

        {/* Why We Built This Section */}
        <WhyWeBuiltThis />
      </section>
    </main >
  );
};

export default Hero;
