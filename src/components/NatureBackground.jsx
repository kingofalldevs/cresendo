import React, { useEffect, useRef } from 'react';

const NatureBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Leaves and Drops
    const leaves = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 5 + Math.random() * 15,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: 0.2 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      color: Math.random() > 0.5 ? '#10b981' : '#059669'
    }));

    const drops = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2,
      speedY: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.2
    }));

    const drawLeaf = (ctx, leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.angle);
      ctx.beginPath();
      ctx.moveTo(0, -leaf.size);
      ctx.quadraticCurveTo(leaf.size / 2, 0, 0, leaf.size);
      ctx.quadraticCurveTo(-leaf.size / 2, 0, 0, -leaf.size);
      ctx.fillStyle = leaf.color;
      ctx.fill();
      ctx.restore();
    };

    const drawDrop = (ctx, drop) => {
      ctx.beginPath();
      ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity})`;
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw drops
      drops.forEach(drop => {
        drop.y += drop.speedY;
        if (drop.y > height) {
          drop.y = -10;
          drop.x = Math.random() * width;
        }
        drawDrop(ctx, drop);
      });

      // Update and draw leaves
      leaves.forEach(leaf => {
        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX;
        leaf.angle += leaf.spin;

        if (leaf.y > height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * width;
        }
        if (leaf.x > width + 20) leaf.x = -20;
        if (leaf.x < -20) leaf.x = width + 20;

        drawLeaf(ctx, leaf);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.4
      }}
    />
  );
};

export default NatureBackground;
