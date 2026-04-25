import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  const [birthDate, setBirthDate] = useState('2007-10-10');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateStats = async () => {
    if (!birthDate) return;
    setLoading(true);
    try {
      const response = await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate })
      });
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (birthDate) calculateStats();
  }, [birthDate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Navbar />
      <div style={{ flexGrow: 1, padding: '3rem 2rem' }}>
        <Hero stats={stats} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
