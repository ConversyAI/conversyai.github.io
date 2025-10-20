import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getInterviews } from '../firebase';

const Testimonials = () => {
  // Use empty array initially, will be populated from Firebase or config
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching testimonials from Firebase...');

        // Fetch from Firebase - this is the primary source
        const interviews = await getInterviews(10);

        if (interviews.length > 0) {
          console.log(`Loaded ${interviews.length} testimonials from Firebase`);
          setTestimonials(interviews);
        } else {
          // Only show a message if no data exists
          console.log('No Firebase testimonials found yet');
          setTestimonials([
            {
              id: 'placeholder-1',
              name: 'Join Our Early Adopters',
              role: 'Be Part of the Journey',
              Company: 'Your Business',
              content: 'We\'re actively conducting interviews with businesses to understand their needs and shape Conversy AI together. Share your story with us!',
              rating: 5,
              website: ''
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
        // Show error state
        setTestimonials([
          {
            id: 'error-1',
            name: 'Loading Error',
            role: 'Please Refresh',
            content: 'Unable to load testimonials. Please refresh the page or try again later.',
            rating: 5,
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    // Only start carousel if we have testimonials
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            What Early Adopters Are Saying
          </h2>
          <p className="text-brand-muted text-base max-w-2xl mx-auto">
            Real voices from businesses joining us to uncover challenges, share stories, 
  and shape the next generation of intelligent customer engagement — 
  as we build Conversy AI together.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-[400px]">
              <div className="text-brand-primary">
                <svg className="animate-spin h-12 w-12" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Testimonial Cards Carousel */}
          {!isLoading && testimonials.length > 0 && (
          <div className="relative h-[400px] sm:h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-2xl p-8 sm:p-12 h-full flex flex-col justify-between hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10">
                  {/* Quote Icon */}
                  <div className="text-brand-primary/30 mb-4">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <p className="text-brand-text text-base sm:text-lg mb-6 flex-grow">
                    "{testimonials[currentIndex].content}"
                  </p>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {renderStars(testimonials[currentIndex].rating || 5)}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[currentIndex].image || `https://i.pravatar.cc/150?img=${currentIndex + 1}`}
                      alt={testimonials[currentIndex].name}
                      className="w-14 h-14 rounded-full border-2 border-brand-primary/30"
                    />
                    <div>
                      <h4 className="text-brand-text font-bold text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-brand-muted text-sm">
                        {testimonials[currentIndex].role}
                        {testimonials[currentIndex].Company && (
                          <span> • {testimonials[currentIndex].Company}</span>
                        )}
                      </p>
                      {testimonials[currentIndex].website && (
                        <a
                          href={testimonials[currentIndex].website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-primary text-xs hover:text-brand-secondary transition-colors inline-flex items-center gap-1 mt-1"
                        >
                          Visit Website
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          )}

          {/* Navigation Dots - Only show if we have multiple testimonials */}
          {!isLoading && testimonials.length > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-brand-primary'
                    : 'w-2 bg-brand-muted/30 hover:bg-brand-muted/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
