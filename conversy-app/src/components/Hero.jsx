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
    { src: '/assets/stripe-icon.svg', alt: 'Stripe' },
    { src: '/assets/razorpay-icon.svg', alt: 'Razorpay' },
    { src: '/assets/telegram-icon.svg', alt: 'Telegram' },
    { src: '/assets/wa-whatsapp-icon.svg', alt: 'WhatsApp' },
    { src: '/assets/google-calendar-icon.svg', alt: 'Google Calendar' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-2 bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/30 rounded-full text-sm text-brand-muted">
            Coming soon • Q4
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]">
            Conversy AI
          </span>
        </motion.h1>

        {/* Typing Animation Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl text-brand-text mb-4 h-20 sm:h-24 flex items-center justify-center"
        >
          <span className="font-light">
            {displayedText}
            <span className="inline-block w-1 h-8 sm:h-10 ml-1 bg-brand-primary animate-pulse"></span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl text-brand-muted max-w-3xl mx-auto mb-8"
        >
          AI Business agent for service bookings & product sales from spreadsheet to live chatbot in minutes
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#waitlist"
            className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-brand-bg font-bold text-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-200 w-full sm:w-auto"
          >
            Join Waitlist
          </a>
          <a
            href="#about"
            className="px-8 py-4 bg-transparent border-2 border-brand-primary/50 rounded-full text-brand-text font-bold text-lg hover:border-brand-primary hover:bg-brand-primary/10 transition-all duration-200 w-full sm:w-auto"
          >
            Learn More
          </a>
        </motion.div>

        {/* Integration Icons Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="relative overflow-hidden"
        >
          <p className="text-brand-muted text-sm mb-4">Integrates with your favorite tools</p>
          <div className="flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            {integrationIcons.map((icon, index) => (
              <motion.img
                key={index}
                src={icon.src}
                alt={icon.alt}
                className="h-10 sm:h-12 w-auto"
                whileHover={{ scale: 1.2, filter: 'grayscale(0%)' }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-brand-primary/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-brand-primary rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
