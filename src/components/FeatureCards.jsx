import { motion } from 'framer-motion';

const FeatureCards = () => {
  const features = [
    {
      icon: '💼',
      title: 'Uploads',
      description: 'Upload what you have — Business documents, brochures, catalogs, price lists, website link, spreadsheets or write manual details.'
    },
    {
      icon: '🤖',
      title: 'Train Your Agent',
      description: 'Teach your AI in minutes. It understands your content and workflows to deliver accurate, personalized responses — like a team member who knows your business inside out.'
    },
    {
      icon: '🔗',
      title: 'Integrate Apps',
      description: 'Connect your essential tools — calendars, location, WhatsApp, payment gateways, and much more. Everything works together automatically for a seamless experience.'
    },
    {
      icon: '💬',
      title: 'Shareable Chatbot',
      description: 'Launch your agent anywhere — share your unique chat link on Instagram, WhatsApp, or your website. Customers can book, pay, and chat instantly — all powered by you.'
    },
    {
      icon: '📊',
      title: 'Intelligent Dashboard',
      description: 'Make smarter decisions, effortlessly — Track conversations, payments, bookings, and insights in real time. Capture leads, understand clients, and get growth strategies - all in one place.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What you can do with{' '}
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
              Conversy AI
            </span>
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-2xl p-6 hover:border-brand-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10"
            >
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
