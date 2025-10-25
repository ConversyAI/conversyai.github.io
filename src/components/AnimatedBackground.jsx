import { useEffect } from 'react';

const AnimatedBackground = () => {
  useEffect(() => {
    const spotlight = document.querySelector('.spotlight-layer');
    if (!spotlight) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const updateSpotlight = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      spotlight.style.setProperty('--mx', currentX + 'px');
      spotlight.style.setProperty('--my', currentY + 'px');
      requestAnimationFrame(updateSpotlight);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches?.[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    updateSpotlight();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <>
      <div className="bg-layer" />
      <div className="particles-layer" />
      <div className="cosmic-ring" />
      <div className="cosmic-orbs" />
      <div className="noise-layer" />
      <div className="spotlight-layer" />
    </>
  );
};

export default AnimatedBackground;
