import { useEffect } from 'react';
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
import { trackVisitor } from './utils/analytics';

function App() {
  useEffect(() => {
    // Track unique visitor (only counts first-time visitors)
    // and page views properly
    trackVisitor();
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Testimonials />
        <Team />
        <Waitlist />
      </main>

      <Footer />
    </div>
  );
}

export default App;
