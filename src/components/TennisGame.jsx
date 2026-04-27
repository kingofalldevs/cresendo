import React, { useRef, useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

const INSPIRATIONS = [
  "You are not alone.",
  "God loves you.",
  "Keep moving forward.",
  "Stay focused.",
  "Breathe.",
  "Peace is within you.",
  "One step at a time.",
  "You are capable.",
  "Grace under pressure.",
  "Find your rhythm."
];

const TennisGame = ({ user, openAuth, isFighterMode }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('READY'); // READY, PLAYING, GAME_OVER
  const [scoreMessage, setScoreMessage] = useState('');
  const [dimensions, setDimensions] = useState({ width: 300, height: 400 });
  
  // Steering Wheel State
  const [wheelRotation, setWheelRotation] = useState(0);
  const wheelRef = useRef(null);
  const isDraggingWheel = useRef(false);
  const lastTouchX = useRef(0);
  const paddleOffset = useRef(0);

  // Update dimensions based on container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const paddleWidth = Math.min(canvas.width * 0.25, 100);
    const paddleHeight = 12;
    // We'll use a ref-like variable for paddleX within the loop
    let currentPaddleX = (canvas.width - paddleWidth) / 2;

    const ballRadius = 8;
    let x = canvas.width / 2;
    let y = canvas.height - 50;
    let dx = (Math.random() - 0.5) * 6;
    let dy = -5;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply steering wheel offset
      currentPaddleX += paddleOffset.current;
      paddleOffset.current = 0; // Reset offset after applying

      if (currentPaddleX < 0) currentPaddleX = 0;
      if (currentPaddleX > canvas.width - paddleWidth) currentPaddleX = canvas.width - paddleWidth;

      // Draw Field Lines (Aesthetic)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Draw Paddle
      ctx.beginPath();
      ctx.roundRect(currentPaddleX, canvas.height - paddleHeight - 20, paddleWidth, paddleHeight, 6);
      ctx.fillStyle = '#10b981';
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.5)';
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.closePath();

      // Draw Ball
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.closePath();

      // Wall collisions
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius - 32) {
        // Paddle collision
        if (x > currentPaddleX - ballRadius && x < currentPaddleX + paddleWidth + ballRadius) {
          dy = -dy;
          const speedUp = 1.05;
          dy *= speedUp;
          dx *= speedUp;
          
          const hitPos = (x - (currentPaddleX + paddleWidth / 2)) / (paddleWidth / 2);
          dx += hitPos * 2;

          setScore(s => s + 1);
          setScoreMessage(INSPIRATIONS[Math.floor(Math.random() * INSPIRATIONS.length)]);
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
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, dimensions]);

  const handleWheelStart = (e) => {
    isDraggingWheel.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastTouchX.current = clientX;
    
    // Add global listeners for smoother dragging
    window.addEventListener('mousemove', handleWheelMove);
    window.addEventListener('touchmove', handleWheelMove, { passive: false });
    window.addEventListener('mouseup', handleWheelEnd);
    window.addEventListener('touchend', handleWheelEnd);
  };

  const handleWheelMove = (e) => {
    if (!isDraggingWheel.current) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - lastTouchX.current;
    
    // Increased sensitivity and smoother tracking
    const sensitivity = 2.0; 
    paddleOffset.current = deltaX * sensitivity;
    setWheelRotation(prev => prev + deltaX * 2.5);
    
    lastTouchX.current = currentX;
    if (e.touches) e.preventDefault(); // Prevent scrolling while playing
  };

  const handleWheelEnd = () => {
    isDraggingWheel.current = false;
    window.removeEventListener('mousemove', handleWheelMove);
    window.removeEventListener('touchmove', handleWheelMove);
    window.removeEventListener('mouseup', handleWheelEnd);
    window.removeEventListener('touchend', handleWheelEnd);
  };

  return (
    <div style={{
      height: '100%',
      padding: '0.5rem', // Reduced padding to maximize space
      background: 'white',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem', // Reduced gap
      border: 'none', // Removed border
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>
        {`
          @keyframes floatUpFade {
            0% { opacity: 0; transform: translate(-50%, -30%); }
            20% { opacity: 1; transform: translate(-50%, -50%); }
            80% { opacity: 1; transform: translate(-50%, -60%); }
            100% { opacity: 0; transform: translate(-50%, -80%); }
          }
          .tennis-canvas {
            touch-action: none;
          }
          .steering-wheel {
            width: 100px;
            height: 100px;
            background: white;
            border: 4px solid var(--primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
            cursor: grab;
            touch-action: none;
            position: absolute;
            bottom: 10px;
            right: 10px;
            z-index: 100;
            transition: transform 0.05s linear;
          }
          .steering-wheel:active {
            cursor: grabbing;
          }
          .steering-wheel-inner {
            width: 80%;
            height: 80%;
            border: 1px dashed rgba(16, 185, 129, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
      
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, padding: '0.25rem 0.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {isFighterMode ? 'Relapse Fighter' : 'Zen Tennis'}
          </h2>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600, margin: 0 }}>
            {isFighterMode ? 'Protect your future.' : 'Stay focused.'}
          </p>
        </div>
        <div style={{ 
          background: 'rgba(16, 185, 129, 0.1)',
          padding: '0.4rem 0.8rem',
          borderRadius: '10px',
          fontSize: '0.9rem', 
          fontWeight: 900, 
          color: 'var(--primary)',
        }}>
          {score}
        </div>
      </div>

      <div 
        ref={containerRef}
        style={{ 
          position: 'relative', 
          width: '100%', 
          flexGrow: 1, 
          background: '#f8fafc', 
          borderRadius: '16px',
          overflow: 'hidden',
          border: 'none' // Removed inner border
        }}
      >
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="tennis-canvas"
          style={{ width: '100%', height: '100%' }}
        />

        {scoreMessage && gameState === 'PLAYING' && (
          <div key={score} style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'var(--primary)',
            fontWeight: 900,
            fontSize: '1.25rem',
            textAlign: 'center',
            pointerEvents: 'none',
            animation: 'floatUpFade 1.5s ease-out forwards',
            textShadow: '0 2px 10px rgba(255,255,255,0.8)',
            whiteSpace: 'nowrap',
            zIndex: 5
          }}>
            {scoreMessage}
          </div>
        )}

        {/* STEERING WHEEL */}
        {gameState === 'PLAYING' && (
          <div 
            ref={wheelRef}
            className="steering-wheel"
            onMouseDown={handleWheelStart}
            onTouchStart={handleWheelStart}
            style={{
              transform: `rotate(${wheelRotation}deg) ${isDraggingWheel.current ? 'scale(1.1)' : 'scale(1)'}`
            }}
          >
            <div className="steering-wheel-inner">
              <Compass size={56} color="var(--primary)" strokeWidth={1.5} />
            </div>
            <div style={{ position: 'absolute', width: '100%', height: '4px', background: 'var(--primary)', opacity: 0.1 }} />
            <div style={{ position: 'absolute', width: '4px', height: '100%', background: 'var(--primary)', opacity: 0.1 }} />
          </div>
        )}

        {gameState !== 'PLAYING' && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.85)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            backdropFilter: 'blur(8px)',
            padding: '2rem',
            textAlign: 'center',
            zIndex: 20
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '3rem' }}>{gameState === 'READY' ? '🎾' : '😂'}</span>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', maxWidth: '280px', lineHeight: 1.3 }}>
              {gameState === 'READY' ? 'can we play tennis?' : 'ha i won can we play again it was fun'}
            </h3>
            
            <p style={{ color: 'var(--text-dim)', fontWeight: 500, maxWidth: '240px' }}>
              {gameState === 'READY' 
                ? "Engage your mind to stay focused and break the cycle." 
                : `Score: ${score} points. Practice makes perfect.`}
            </p>

            <button
              onClick={() => {
                if (!user && !isFighterMode) {
                  openAuth();
                } else {
                  setScore(0);
                  setScoreMessage('');
                  setGameState('PLAYING');
                  setWheelRotation(0);
                }
              }}
              style={{
                padding: '1rem 2.5rem',
                borderRadius: '16px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-emerald)',
                transition: 'transform 0.2s active'
              }}
            >
              {gameState === 'READY' ? 'Begin Focus' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TennisGame;

