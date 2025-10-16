import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-panel/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo + Coming Soon - Left */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <motion.a
              href="#home"
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="assets/logo.png"
                alt="Conversy AI"
                className="h-8 sm:h-10 w-auto"
              />
            </motion.a>
            <span className="hidden md:inline-block px-3 py-1.5 bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/30 rounded-full text-xs text-white font-medium whitespace-nowrap">
              Coming soon • Q4
            </span>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-white hover:text-brand-primary transition-colors duration-200 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA - Right */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <motion.a
              href="#waitlist"
              className="px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-white font-bold hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-200 text-sm whitespace-nowrap"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 20px rgba(110, 231, 255, 0.3)',
                  '0 0 30px rgba(110, 231, 255, 0.5)',
                  '0 0 20px rgba(110, 231, 255, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Join waitlist
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:text-brand-primary hover:bg-brand-panel/50 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        className="md:hidden overflow-hidden bg-brand-panel/95 backdrop-blur-lg"
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-4 py-3 rounded-lg text-white hover:text-brand-primary hover:bg-brand-bg/50 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#waitlist"
            className="block px-4 py-3 mt-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg text-white font-bold text-center animate-pulse-slow"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join waitlist
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
