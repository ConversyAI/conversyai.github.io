import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '../utils/scrollAnimations';

const FeatureCards = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: 'Uploads',
      subtitle: 'Upload what you have',
      description: 'Business documents, brochures, catalogs, price lists, website links, spreadsheets, or write manual details.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Train Your Agent',
      subtitle: 'Teach your AI in minutes',
      description: 'It understands your content and workflows to deliver accurate, personalized responses like a team member who knows your business inside out.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: 'Integrate Apps',
      subtitle: 'Connect your essential tools',
      description: 'Calendars, location, WhatsApp, payment gateways, and much more. Everything works together automatically for a seamless experience.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Shareable Chatbot',
      subtitle: 'Launch your agent anywhere',
      description: 'Share your unique chat link on Instagram, WhatsApp, or your website. Customers can book, pay, and chat instantly, all powered by you.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Intelligent Dashboard',
      subtitle: 'Make smarter decisions',
      description: 'Track conversations, payments, bookings, and insights in real time. Capture leads, understand clients, and get growth strategies all in one place.'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          whileInView="animate"
          viewport={defaultViewport}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3 flex-wrap">
            <span>What you can do with</span>
            <img
              src="assets/ai.svg"
              alt="Conversy AI"
              className="h-14 sm:h-16 md:h-20 w-auto inline-block"
            />
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          {...staggerContainer}
          whileInView="animate"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <div key={index} className="relative h-full">
              {/* Hanging gradient line - always visible */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary z-30"></div>

              {/* Card that drops down from the line */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true, margin: "-100px", amount: 0.1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ willChange: 'transform, opacity' }}
                className="relative h-full bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-2xl p-6 hover:border-brand-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 overflow-hidden group flex flex-col"
              >
                {/* Gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary"></div>

                {/* Shimmer effect that runs continuously */}
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.3
                  }}
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), transparent)',
                    backgroundSize: '200% 100%'
                  }}
                />

                <div className="flex items-center gap-2 mb-3">
                  <div className="text-brand-primary flex-shrink-0">{feature.icon}</div>
                  <h3 className="text-sm font-extrabold text-white whitespace-nowrap">{feature.title}</h3>
                </div>
                <p className="text-xs sm:text-sm font-medium mb-2 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent leading-tight">{feature.subtitle}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
