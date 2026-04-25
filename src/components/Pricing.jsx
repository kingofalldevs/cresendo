import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Star } from 'lucide-react';

const PricingCard = ({ title, price, period, features, popular, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    style={{
      flex: 1,
      minWidth: '300px',
      maxWidth: '400px',
      background: popular ? 'white' : 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '32px',
      padding: '3rem 2.5rem',
      border: popular ? '2px solid #10b981' : '1px solid rgba(16, 185, 129, 0.1)',
      boxShadow: popular ? '0 25px 50px -12px rgba(16, 185, 129, 0.15)' : '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      textAlign: 'center'
    }}
  >
    {popular && (
      <div style={{
        position: 'absolute',
        top: '-14px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--emerald)',
        color: 'white',
        padding: '0.4rem 1.2rem',
        borderRadius: '20px',
        fontSize: '0.7rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
      }}>
        Most Popular
      </div>
    )}

    <div>
      <h4 style={{ 
        fontSize: '0.8rem', 
        fontWeight: 900, 
        color: popular ? '#10b981' : 'var(--text-dim)', 
        textTransform: 'uppercase', 
        letterSpacing: '0.2em',
        marginBottom: '1rem'
      }}>
        {title}
      </h4>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.25rem' }}>
        <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.04em' }}>
          ${price}
        </span>
        <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dim)' }}>
          /{period}
        </span>
      </div>
    </div>

    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
      {features.map((feature, i) => (
        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>
          <Check size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <motion.button
      whileHover={{ scale: 1.02, backgroundColor: popular ? '#059669' : '#0f172a' }}
      whileTap={{ scale: 0.98 }}
      style={{
        marginTop: 'auto',
        background: popular ? '#10b981' : 'var(--text-main)',
        color: 'white',
        border: 'none',
        borderRadius: '16px',
        padding: '1.25rem',
        fontSize: '0.9rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}
    >
      Initialize {title}
    </motion.button>
  </motion.div>
);

const Pricing = () => {
  const plans = [
    {
      title: "Supporter",
      price: "0",
      period: "free",
      features: [
        "Basic Resilience Tracking",
        "Community Support Access",
        "Daily Momentum Check-ins",
        "Secure Journaling"
      ],
      popular: false,
      delay: 0.1
    },
    {
      title: "Harmonizer",
      price: "12",
      period: "mo",
      features: [
        "All Supporter Features",
        "Advanced Trigger Mapping",
        "Priority Support Network",
        "AI Recovery Guide",
        "Detailed Momentum Analytics"
      ],
      popular: true,
      delay: 0.2
    }
  ];

  return (
    <section id="pricing" style={{ 
      padding: '8rem 2rem', 
      maxWidth: '1000px', 
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ 
          fontSize: '0.75rem', 
          fontWeight: 900, 
          color: '#10b981', 
          textTransform: 'uppercase', 
          letterSpacing: '0.3em',
          marginBottom: '1rem'
        }}>
          Investment in Self
        </h2>
        <h3 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 900, 
          color: 'var(--text-main)', 
          letterSpacing: '-0.04em',
          margin: 0
        }}>
          Secure Your <span style={{ color: '#10b981' }}>New Rhythm.</span>
        </h3>
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '2.5rem',
        width: '100%'
      }}>
        {plans.map((p, i) => (
          <PricingCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
