import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const phrases = [
    "backs builders who ship.",
    "turns conversations into conversions.",
    "automates bookings, payments, and reminders."
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && displayedText === currentPhrase) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? currentPhrase.substring(0, displayedText.length - 1)
          : currentPhrase.substring(0, displayedText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentPhraseIndex, phrases]);

  const integrationIcons = [
    { src: 'assets/stripe.svg', alt: 'Stripe' },
    { src: 'assets/razorpay.png', alt: 'Razorpay' },
    { src: 'assets/telegram-icon.svg', alt: 'Telegram' },
    { src: 'assets/wa-whatsapp-icon.svg', alt: 'WhatsApp' },
    { src: 'assets/google-calendar-icon.svg', alt: 'Google Calendar' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-8"
        >
          <span className="px-5 py-2.5 bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/30 rounded-full text-base text-white font-medium">
            We back your agentic future
          </span>
        </motion.div>

        {/* Center Logo - Animated Bot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center mb-6"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative group"
          >
            {/* Outer glow ring */}
            {/* <motion.div
              className="absolute inset-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 40px 10px rgba(110, 231, 255, 0.2), 0 0 80px 20px rgba(139, 92, 246, 0.1)',
                  '0 0 60px 15px rgba(110, 231, 255, 0.3), 0 0 100px 25px rgba(139, 92, 246, 0.2)',
                  '0 0 40px 10px rgba(110, 231, 255, 0.2), 0 0 80px 20px rgba(139, 92, 246, 0.1)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            /> */}

            {/* Rotating gradient ring */}
            {/* <motion.div
              className="absolute inset-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full opacity-30"
              style={{
                background: 'conic-gradient(from 0deg, rgba(110, 231, 255, 0.3), rgba(139, 92, 246, 0.3), rgba(110, 231, 255, 0.3))',
                filter: 'blur(20px)',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            /> */}

            {/* Main logo container */}
            <div className="">
              {/* Animated gradient background */}
              {/* <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(circle at center, rgba(110, 231, 255, 0.2), transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              /> */}

              {/* Logo */}
              <motion.img
                src="assets/Logo SVG.svg"
                alt="Conversy AI Bot"
                className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 object-contain"
                style={{ filter: 'drop-shadow(0 0 30px rgba(110, 231, 255, 0.4))' }}
                whileHover={{
                  scale: 1.05,
                  filter: 'drop-shadow(0 0 40px rgba(110, 231, 255, 0.6))',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Sparkle effect */}
              {/* <motion.div
                className="absolute top-6 right-8 w-2 h-2 bg-brand-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              /> */}
            </div>
          </motion.div>

          {/* Conversy AI text below logo */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]">
              Conversy AI
            </span>
          </motion.h1>
        </motion.div>

        {/* Typing Animation Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-6 h-16 sm:h-20 flex items-center justify-center"
        >
          <span className="font-bold">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-white max-w-4xl mx-auto mb-10 font-light"
        >
          AI Business Agent for service bookings & product sales from spreadsheet to live chatbot in minutes.
        </motion.p>

        {/* Integration Icons Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="relative overflow-hidden mb-12"
        >
          <p className="text-white text-sm mb-6 font-medium">Integrates with your favorite tools</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 mb-12">
            {integrationIcons.map((icon, index) => (
              <motion.img
                key={index}
                src={icon.src}
                alt={icon.alt}
                className="h-12 sm:h-14 md:h-16 w-auto"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
