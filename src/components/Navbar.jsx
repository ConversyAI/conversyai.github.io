import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', type: 'hash' },
    { name: 'About Us', href: '#about', type: 'hash' },
    { name: 'Services', href: '#services', type: 'hash' },
    { name: 'Team', href: '#team', type: 'hash' },
    { name: 'Testimonials', href: '#testimonials', type: 'hash' },
    { name: 'Privacy Policy', href: '/privacy', type: 'route' },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (item.type === 'route') {
      // Navigate to different route
      navigate(item.href);
    } else {
      // Handle hash navigation
      // Add delay for mobile menu to close first
      setTimeout(() => {
        if (location.pathname !== '/') {
          // If not on homepage, navigate to homepage first
          navigate('/');
          // Wait for navigation, then scroll
          setTimeout(() => {
            const element = document.querySelector(item.href);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        } else {
          // Already on homepage, just scroll
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 300);
    }
  };

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
          {/* Coming Soon - Left */}
          <div className="flex items-center flex-shrink-0">
            <span className="px-3 py-1.5 bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/30 rounded-full text-xs text-white font-medium whitespace-nowrap">
              Coming soon 2026
            </span>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={(e) => handleNavClick(e, item)}
                className="px-3 py-2 rounded-lg text-white hover:text-brand-primary transition-colors duration-200 font-medium text-base bg-transparent border-none cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA - Right */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <motion.button
              onClick={(e) => handleNavClick(e, { href: '#waitlist', type: 'hash' })}
              className="px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-white font-bold hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-200 text-base whitespace-nowrap border-none cursor-pointer"
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
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-brand-primary hover:bg-brand-panel/50 transition-colors"
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
            <button
              key={item.name}
              onClick={(e) => handleNavClick(e, item)}
              className="block w-full text-left px-4 py-3 rounded-lg text-white hover:text-brand-primary hover:bg-brand-bg/50 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={(e) => handleNavClick(e, { href: '#waitlist', type: 'hash' })}
            className="block w-full px-4 py-3 mt-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg text-white font-bold text-center animate-pulse-slow border-none cursor-pointer"
          >
            Join waitlist
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
