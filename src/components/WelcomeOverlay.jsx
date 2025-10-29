import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeOverlay = () => {
  // ========================================
  // CONFIGURATION - Change these for testing
  // ========================================
  
  // Show overlay on every page load (true) or once per session (false)
  const SHOW_ON_EVERY_LOAD = false; // 👈 Change to false for production
  
  // Enable/Disable Features:
  const ENABLE_CLICK_BUTTON = true;        // 👈 true = Show button, false = Skip button
  const ENABLE_ANIMATED_OVERLAY = false;    // 👈 true = Show "Welcome to Future of Business", false = Skip
  const ENABLE_VOICE = false;              // 👈 true = Play voice, false = Silent
  
  // Timing Controls (in milliseconds):
  const OVERLAY_DURATION = 1500;           // 👈 How long to show overlay (if voice disabled). Default: 3000ms (3 seconds)
  const DELAY_AFTER_VOICE = 500;           // 👈 Delay after voice ends before closing. Default: 500ms (0.5 seconds)

  // ========================================
  // VOICE TIMING CONTROLS
  // ========================================
  // Adjust timing and pacing of the speech playback
  const VOICE_START_DELAY = 500;  // Delay before speech starts after click
  const VOICE_RATE = 0.9;         // Speed: 0.1 (slow) to 10 (fast)
  const VOICE_PITCH = 1.0;        // Pitch: 0 (low) to 2 (high)
  const VOICE_VOLUME = 0.3;       // Volume: 0 (mute) to 1 (max)
  // ========================================
  // ========================================

  // Check session storage immediately to prevent flash
  const shouldShow = SHOW_ON_EVERY_LOAD || !sessionStorage.getItem('welcomeOverlayShown');
  const [isVisible, setIsVisible] = useState(shouldShow);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showButton, setShowButton] = useState(true); // Show button first for user interaction

  useEffect(() => {
    // If shouldn't show, exit immediately
    if (!shouldShow) {
      setIsVisible(false);
      return;
    }

    // ========================================
    // TEXT-TO-SPEECH CONTROLS
    // ========================================
    // Play text-to-speech only if enabled and after user clicks button
    if (ENABLE_VOICE && !hasPlayed && !showButton && 'speechSynthesis' in window) {
      // Wait for voices to load
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('🔊 Available voices:', voices.length);
        
        const utterance = new SpeechSynthesisUtterance('Welcome to the Future of Business');
        
        // ===== VOICE SETTINGS - CUSTOMIZE HERE =====
        utterance.rate = VOICE_RATE;
        utterance.pitch = VOICE_PITCH;
        utterance.volume = VOICE_VOLUME;
        // ===========================================
        
        // Try to use a better voice if available
        if (voices.length > 0) {
          // Prefer English voices
          const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
          if (englishVoice) {
            utterance.voice = englishVoice;
            console.log('🎤 Using voice:', englishVoice.name);
          }
        }
        
        // Error handling
        utterance.onerror = (event) => {
          console.error('❌ Speech error:', event.error);
        };
        
        utterance.onstart = () => {
          console.log('🔊 Speech started');
        };
        
        utterance.onend = () => {
          console.log('✅ Speech ended');
          // Hide overlay after speech completes (only if animated overlay is enabled)
          if (ENABLE_ANIMATED_OVERLAY) {
            setTimeout(() => {
              setIsVisible(false);
              if (!SHOW_ON_EVERY_LOAD) {
                sessionStorage.setItem('welcomeOverlayShown', 'true');
              }
            }, DELAY_AFTER_VOICE); // Configurable delay after speech ends
          }
        };
        
        // Wait a moment before speaking
        setTimeout(() => {
          try {
            window.speechSynthesis.speak(utterance);
          } catch (error) {
            console.error('❌ Failed to speak:', error);
          }
        }, VOICE_START_DELAY);
      };

      // Load voices (some browsers need this)
      if (window.speechSynthesis.getVoices().length > 0) {
        loadVoices();
      } else {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      setHasPlayed(true);
    } else if (ENABLE_VOICE && !('speechSynthesis' in window)) {
      console.warn('⚠️ Text-to-speech not supported in this browser');
    } else if (!ENABLE_VOICE && !showButton && ENABLE_ANIMATED_OVERLAY) {
      // If voice is disabled but overlay is enabled, auto-close after animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (!SHOW_ON_EVERY_LOAD) {
          sessionStorage.setItem('welcomeOverlayShown', 'true');
        }
      }, OVERLAY_DURATION); // Configurable duration to see the animation
      
      return () => clearTimeout(timer);
    }

    // Cleanup function
    return () => {
      // Cancel any ongoing speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [hasPlayed, shouldShow, showButton, ENABLE_VOICE, ENABLE_ANIMATED_OVERLAY, SHOW_ON_EVERY_LOAD]);

  const handleEnter = () => {
    if (ENABLE_CLICK_BUTTON) {
      setShowButton(false);
      setHasPlayed(false); // Reset to trigger voice
    }
  };

  // Auto-skip button if disabled
  useEffect(() => {
    if (!ENABLE_CLICK_BUTTON && showButton) {
      setShowButton(false);
    }
  }, [ENABLE_CLICK_BUTTON, showButton]);

  // Auto-close overlay if animated overlay is disabled
  useEffect(() => {
    if (!ENABLE_ANIMATED_OVERLAY && !showButton) {
      // Close immediately when button is clicked and overlay is disabled
      setIsVisible(false);
      if (!SHOW_ON_EVERY_LOAD) {
        sessionStorage.setItem('welcomeOverlayShown', 'true');
      }
    }
  }, [ENABLE_ANIMATED_OVERLAY, showButton, SHOW_ON_EVERY_LOAD]);

  // Also prevent rendering the animated overlay content if disabled
  const shouldShowAnimatedContent = ENABLE_ANIMATED_OVERLAY && !showButton;

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
            {showButton && ENABLE_CLICK_BUTTON ? (
              /* Click to Enter Button */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center gap-6">
                  {/* Animated text above button */}
                  <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
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
                        repeat: Infinity,
                      }}
                    >
                      Step into the future of your business
                    </motion.span>
                  </motion.h2>

                  {/* Button */}
                  <motion.button
                    onClick={handleEnter}
                    className="group relative px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-white font-bold text-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Jump
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            ) : shouldShowAnimatedContent ? (
              /* Original Animated Content */
              <>
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
              </>
            ) : null}
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
