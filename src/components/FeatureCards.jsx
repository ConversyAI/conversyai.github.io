import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '../utils/scrollAnimations';

const FeatureCards = () => {
  const features = [
    {
      title: 'Uploads',
      description: 'Upload what you have — Business documents, brochures, catalogs, price lists, website link, spreadsheets or write manual details.'
    },
    {
      title: 'Train Your Agent',
      description: 'Teach your AI in minutes. It understands your content and workflows to deliver accurate, personalized responses — like a team member who knows your business inside out.'
    },
    {
      title: 'Integrate Apps',
      description: 'Connect your essential tools — calendars, location, WhatsApp, payment gateways, and much more. Everything works together automatically for a seamless experience.'
    },
    {
      title: 'Shareable Chatbot',
      description: 'Launch your agent anywhere — share your unique chat link on Instagram, WhatsApp, or your website. Customers can book, pay, and chat instantly — all powered by you.'
    },
    {
      title: 'Intelligent Dashboard',
      description: 'Make smarter decisions, effortlessly — Track conversations, payments, bookings, and insights in real time. Capture leads, understand clients, and get growth strategies - all in one place.'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-2xl p-6 hover:border-brand-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-brand-muted leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
