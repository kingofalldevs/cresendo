import React from 'react';
import { motion } from 'framer-motion';

const WhyWeBuiltThis = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      style={{ 
        width: '100%',
        marginTop: '6rem',
        marginBottom: '6rem',
        padding: '2.5rem 0',
        background: 'transparent'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          color: '#10b981',
          textTransform: 'uppercase'
        }}>
          Our Mission
        </span>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          color: '#0f172a',
          marginTop: '0.75rem',
          letterSpacing: '-0.02em'
        }}>
          Why We Built This
        </h2>
      </div>
      
      {/* Three Paragraph Layout */}
      <div style={{ 
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.8, 
          color: '#334155',
          textAlign: 'center',
          fontWeight: 400
        }}>
          I built Crescendo to transform the chaotic journey of addiction into a tangible, visual narrative of recovery. By leveraging momentum tracking and pattern recognition, I created a "harmony curve" that captures the organic process of reclaiming one's life. This isn't just a dashboard; it's a mirror of the resilience we build through every high and low, providing a high-fidelity visualization of the most important transition: the move from struggle to peace.
        </p>

        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.8, 
          color: '#334155',
          textAlign: 'center',
          fontWeight: 400
        }}>
          The technical foundation is designed to provide clarity when things feel overwhelming. Using a React-based frontend orchestrated with Vite, Crescendo delivers a responsive interface for real-time support. We've integrated advanced visualization tools to map out trigger points and momentum streaks, helping users see the progress that often feels invisible in the day-to-day. Behind the scenes, we prioritize privacy and security, ensuring your journey remains yours alone.
        </p>

        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.8, 
          color: '#334155',
          textAlign: 'center',
          fontWeight: 400
        }}>
          To complete the experience, we've focused on creating a supportive ecosystem that grows with you. Crescendo is about finding your rhythm—not a sudden jump to perfection, but a gradual increase in strength, support, and self-awareness. It’s a tool for reflection and a companion for the climb, designed to help you see the bigger picture and remember that every small win is part of a larger, beautiful crescendo.
        </p>
      </div>
    </motion.div>
  );
};

export default WhyWeBuiltThis;
