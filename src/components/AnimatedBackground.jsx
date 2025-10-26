import { useEffect, useRef, useState } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('AnimatedBackground component mounted');

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas element not found!');
      return;
    }

    console.log('Starting cosmic waves animation');
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawWave = (offset, color, amplitude, frequency) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x += 2) {
        const y =
          canvas.height / 2 +
          Math.sin((x * frequency + offset) * 0.01) * amplitude +
          Math.sin((x * frequency * 2 + offset * 1.5) * 0.01) * (amplitude / 2) +
          Math.sin((x * frequency * 0.5 + offset * 0.8) * 0.01) * (amplitude * 1.5);

        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawStars = () => {
      const starCount = 100;
      for (let i = 0; i < starCount; i++) {
        const x = (i * 1234) % canvas.width;
        const y = (i * 5678) % canvas.height;
        const twinkle = Math.sin(time * 0.002 + i) * 0.5 + 0.5;
        const size = Math.random() * 2;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 231, 255, ${twinkle * 0.3})`;
        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0f1a');
      gradient.addColorStop(1, '#0d1220');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      drawStars();

      // Draw multiple wave layers
      drawWave(time * 0.5, 'rgba(67, 56, 202, 0.15)', 60, 1);
      drawWave(time * 0.7, 'rgba(59, 130, 246, 0.12)', 80, 0.8);
      drawWave(time, 'rgba(110, 231, 255, 0.1)', 100, 0.6);

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Canvas for cosmic waves */}
      <canvas
        ref={canvasRef}
        className="cosmic-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -10
        }}
      />

      {/* Mouse spotlight effect */}
      <div
        className="mouse-spotlight"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.25), rgba(37, 99, 235, 0.12) 40%, transparent 70%)`
        }}
      />

      {/* Dot pattern overlay */}
      <div
        className="dot-pattern-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(110, 231, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
    </>
  );
};

export default AnimatedBackground;
