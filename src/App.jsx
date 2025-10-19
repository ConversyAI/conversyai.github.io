import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import Admin from './pages/Admin';

// Analytics
import { trackVisitor } from './utils/analytics';

function App() {
  useEffect(() => {
    // Track visitor analytics - non-blocking
    const initAnalytics = async () => {
      try {
        await trackVisitor();
      } catch (error) {
        // Silently fail - analytics is non-critical
        console.log('Analytics tracking skipped:', error.message);
      }
    };

    // Delay analytics to not block initial render
    const timer = setTimeout(initAnalytics, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router basename="/">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0d1220',
            color: '#eaf2ff',
            border: '1px solid rgba(110, 231, 255, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#6ee7ff',
              secondary: '#0d1220',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#0d1220',
            },
          },
        }}
      />

      <Routes>
        {/* Admin Panel Route */}
        <Route path="/admin" element={<Admin />} />

        {/* Main Website Route */}
        <Route
          path="/"
          element={
            <div className="relative min-h-screen bg-brand-bg text-brand-text">
              {/* Animated Space Background */}
              <AnimatedBackground />

              {/* Navigation */}
              <Navbar />

              {/* Main Content */}
              <main className="relative z-10">
                <Hero />
                <Stats />
                <About />
                <Services />
                <Testimonials />
                <Team />
                <Waitlist />
              </main>

              {/* Footer */}
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
