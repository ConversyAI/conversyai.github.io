import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeOverlay = () => {
  // ========================================
  // CONFIGURATION - Change this for testing
  // ========================================
  // Set to true for development (shows on every refresh)
  // Set to false for production (shows once per session)
  const SHOW_ON_EVERY_LOAD = true; // 👈 Change this to false for production
  // ========================================

  const [isVisible, setIsVisible] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    // Check if overlay has already been shown in this session
    const overlayShown = sessionStorage.getItem('welcomeOverlayShown');
    
    // Skip check if SHOW_ON_EVERY_LOAD is true (for testing)
    if (!SHOW_ON_EVERY_LOAD && overlayShown) {
      setIsVisible(false);
      return;
    }

    // Play text-to-speech
    if (!hasPlayed && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Welcome to the Future of Business');
      utterance.rate = 0.9; // Slightly slower for premium feel
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      // Wait a moment before speaking
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 500);
      
      setHasPlayed(true);
    }

    // Hide overlay after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Only set session storage if not in "show every time" mode
      if (!SHOW_ON_EVERY_LOAD) {
        sessionStorage.setItem('welcomeOverlayShown', 'true');
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      // Cancel any ongoing speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [hasPlayed]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-bg"
          style={{ 
            background: 'linear-gradient(135deg, #0a0e27 0%, #16213e 50%, #0a0e27 100%)'
          }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-primary/30 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  repeat: 0,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center px-4">
            {/* Glowing orb effect behind text */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(94, 129, 244, 0.3) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: 0,
              }}
            />

            {/* Animated text */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Text with gradient and glow */}
              <span
                className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% auto',
                  animation: 'gradient-shift 3s ease infinite',
                }}
              >
                Welcome to the
              </span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% auto',
                  animation: 'gradient-shift 3s ease infinite',
                  textShadow: '0 0 40px rgba(94, 129, 244, 0.5)',
                }}
                animate={{
                  textShadow: [
                    '0 0 20px rgba(94, 129, 244, 0.5)',
                    '0 0 40px rgba(94, 129, 244, 0.8)',
                    '0 0 20px rgba(94, 129, 244, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: 0,
                }}
              >
                Future of Business
              </motion.span>
            </motion.h1>

            {/* Subtle loading indicator */}
            <motion.div
              className="mt-8 flex justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-brand-primary rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: 1,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
