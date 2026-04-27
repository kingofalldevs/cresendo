import React from 'react';

const Blog = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-main)',
      padding: '4rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: 'var(--primary)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '12px',
          fontWeight: '800',
          marginBottom: '3rem',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
          transition: 'transform 0.2s ease',
        }}>
          Launch Crescendo App
        </a>

        <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '2rem', lineHeight: '1.2' }}>
          Crescendo: Reclaim Your Rhythm and Master Your Habits
        </h1>
        
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-dim)', marginBottom: '3rem' }}>
          Welcome to Crescendo, the ultimate Living OS designed for high-performance individuals seeking to reclaim their rhythm and master their daily habits. 
          Whether you're looking for a comprehensive <strong>habit gaining app</strong>, a powerful <strong>addiction recovery app</strong>, a spiritual companion with our integrated Bible reader, or a community of like-minded 
          guardians, Crescendo provides the tools you need to grow and heal.
        </p>

        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem', marginTop: '3rem' }}>The Best Habit Tracker & Addiction Recovery App</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-dim)', marginBottom: '2rem' }}>
          Our checklist tracker is optimized for consistency. By setting monthly goals and tracking your daily streaks, you build the momentum 
          necessary for long-term success. Unlike generic habit apps, Crescendo functions as a comprehensive addiction recovery app, focusing on the "crescendo" effect—building power through small, 
          consistent actions every single day.
        </p>

        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem', marginTop: '3rem' }}>Zen Tennis: Mindfulness through Interaction</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-dim)', marginBottom: '2rem' }}>
          Experience Zen Tennis, a unique mindfulness game designed to break the cycle of distraction. By focusing on the rhythm of the ball and 
          the precision of your movements, you train your brain to stay present. This is more than a game; it's a cognitive tool for focus.
        </p>

        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem', marginTop: '3rem' }}>Guardians Support: A Thriving Community</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-dim)', marginBottom: '2rem' }}>
          Join Guardians Support, our anonymous community where you can share thoughts, celebrate streaks, and find inspiration from others 
          on the same journey. Our community is built on mutual support and the shared goal of personal excellence.
        </p>

        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem', marginTop: '3rem' }}>Spiritual Nourishment with the Holy Bible</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-dim)', marginBottom: '2rem' }}>
          Integrating spirituality into your daily OS, our Bible reader allows you to stay grounded in the Word. Search through the King James Version (KJV) 
          and keep your spiritual growth at the heart of your daily routine.
        </p>

        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem', marginTop: '3rem' }}>Progressive Web App (PWA) for All Devices</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-dim)', marginBottom: '4rem' }}>
          Crescendo is a fully optimized PWA. Install it on your iPhone, Android (including Infinix, Samsung, and Huawei), or Mac to enjoy a 
          standalone experience. Reclaim your rhythm anywhere, anytime.
        </p>
      </div>
    </div>
  );
};

export default Blog;
