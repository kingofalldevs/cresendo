import React, { useRef, useEffect, useState } from 'react';

const TennisGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('READY'); // READY, PLAYING, GAME_OVER

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const paddleWidth = 80;
    const paddleHeight = 10;
    let paddleX = (canvas.width - paddleWidth) / 2;

    const ballRadius = 6;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 3;
    let dy = -3;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const root = document.documentElement;
      const mouseX = e.clientX - rect.left - root.scrollLeft;
      paddleX = mouseX - paddleWidth / 2;
      
      // Keep paddle in bounds
      if (paddleX < 0) paddleX = 0;
      if (paddleX > canvas.width - paddleWidth) paddleX = canvas.width - paddleWidth;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Paddle
      ctx.beginPath();
      ctx.roundRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight, 5);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.closePath();

      // Draw Ball
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.closePath();

      // Wall collisions
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius - 15) {
        // Paddle collision
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
          dy *= 1.05; // Speed up
          dx *= 1.05;
          setScore(s => s + 1);
        } else {
          setGameState('GAME_OVER');
          return;
        }
      }

      x += dx;
      y += dy;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]);

  return (
    <div style={{
      height: '100%',
      padding: '2rem',
      background: 'white',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      border: '1px solid var(--glass-border)',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Zen Tennis</h2>
        <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--primary)' }}>SCORE: {score}</div>
      </div>

      <div style={{ 
        position: 'relative', 
        width: '100%', 
        flexGrow: 1, 
        background: 'var(--bg-color)', 
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'none'
      }}>
        <canvas
          ref={canvasRef}
          width={300}
          height={400}
          style={{ width: '100%', height: '100%' }}
        />

        {gameState !== 'PLAYING' && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            backdropFilter: 'blur(4px)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }}>
              {gameState === 'READY' ? 'Ready for Rhythm?' : 'Focus Lost'}
            </h3>
            {gameState === 'GAME_OVER' && <p style={{ fontWeight: 600 }}>Final Score: {score}</p>}
            <button
              onClick={() => {
                setScore(0);
                setGameState('PLAYING');
              }}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '12px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {gameState === 'READY' ? 'Start Game' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
      
      <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>
        Control the rhythm. Maintain the focus.
      </p>
    </div>
  );
};

export default TennisGame;
