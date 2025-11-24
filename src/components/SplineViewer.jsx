import { useEffect, useRef } from 'react';

export default function SplineViewer() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Only proceed if container exists
    if (!containerRef.current) return;

    // Check if script is already loaded
    if (!window.customElements.get('spline-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.11.5/build/spline-viewer.js';
      script.async = true;

      // Wait for script to load before creating element
      script.onload = () => {
        createSplineViewer();
      };

      script.onerror = () => {
        console.error('Failed to load Spline viewer script');
      };

      document.head.appendChild(script);
    } else {
      // Script already loaded, create element immediately
      createSplineViewer();
    }

    function createSplineViewer() {
      if (!containerRef.current) return;

      // Clear any existing content
      containerRef.current.innerHTML = '';

      // Create and append spline-viewer element
      const splineViewer = document.createElement('spline-viewer');
      splineViewer.setAttribute('url', 'https://prod.spline.design/n89TKzqw2i9FSxph/scene.splinecode');
      splineViewer.style.width = '100%';
      splineViewer.style.height = '100%';
      splineViewer.style.display = 'block';

      containerRef.current.appendChild(splineViewer);
    }

    return () => {
      // Cleanup on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    />
  );
}
