import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageSquare, MousePointer2 } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '2rem',
    padding: '2rem 1.5rem',
    width: '100%'
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: 'rgba(16, 185, 129, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--primary)',
      flexShrink: 0,
      marginTop: '0.25rem'
    }}>
      <Icon size={24} />
    </div>
    <div style={{ maxWidth: '450px', textAlign: 'left' }}>
      <h4 style={{
        fontSize: '1.15rem',
        fontWeight: 900,
        color: 'var(--text-main)',
        marginBottom: '0.5rem',
        letterSpacing: '-0.02em'
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-dim)',
        lineHeight: 1.6,
        fontWeight: 500
      }}>
        {description}
      </p>
    </div>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Eye,
      title: "Resilience Tracking",
      description: "Visualize your recovery momentum with a dynamic engine that tracks your growth and rewards consistent progress."
    },
    {
      icon: MessageSquare,
      title: "Support Harmony",
      description: "Access context-aware support and personalized check-ins designed to keep you aligned with your long-term peace."
    },
    {
      icon: MousePointer2,
      title: "Trigger Mapping",
      description: "Identify high-risk patterns and proactively map out a healthier rhythm to navigate your daily challenges."
    }
  ];

  return (
    <section id="features" style={{
      padding: '8rem 2rem 10rem',
      maxWidth: '100%',
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'var(--bg-color)',
      borderTop: '1px solid rgba(16, 185, 129, 0.1)',
      borderTopLeftRadius: '120px',
      borderBottomRightRadius: '120px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{
          width: '100%',
          background: 'transparent',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: '32px',
          border: '1px solid rgba(16, 185, 129, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.04)',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            color: 'var(--text-main)',
            letterSpacing: '-0.04em',
            margin: 0
          }}>
            Why Use <span style={{ color: 'var(--primary)' }}>Crescendo?</span>
          </h3>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {features.map((f, i) => (
            <FeatureItem key={i} {...f} />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: '#059669' }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: '3rem',
            background: 'var(--primary)', // Solid, high-contrast Emerald
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            padding: '1.25rem 3rem',
            fontSize: '1rem',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.2), 0 10px 10px -5px rgba(16, 185, 129, 0.1)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Start Your Journey
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Features;
