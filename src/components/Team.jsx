import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Team = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const teamMembers = [
    {
      name: 'Jermiah Jerome',
      role: 'CEO & Co-Founder',
      image: '/assets/Jermiah.jpeg',
      bio: 'Former Assistant Product Manager  at HSBC. NIT Trichy and Emlyon Business School graduate.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Ajay Pradeep',
      role: 'CTO & Co-Founder',
      image: '/assets/Ajay.jpeg',
      bio: 'Built scalable systems at Amazon and Meta.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Cyril Rayan',
      role: 'CMO & Co-Founder',
      image: '/assets/cyril.png',
      bio: 'Product leader from Stripe. Y Combinator alumni.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Thamimul Ansari',
      role: 'Founding Engineer - Full Stack',
      image: '/assets/Thamimul.jpeg',
      bio: 'Award-winning designer. Previously at Airbnb.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Abubakar Aliyu',
      role: 'Founding Engineer - AI',
      image: '/assets/Abubakar.jpeg',
      bio: 'Full-stack developer with a passion for AI.',
      linkedin: '#',
      twitter: '#'}
  ];

  const advisors = [
    {
      name: 'Zack',
      role: 'Legal Advisor',
      company: 'CEO at GoodLegal.fr',
      image: '/assets/Zack.jpeg',
    },
    {
      name: 'Sruthi',
      role: 'AI Advisor',
      company: 'AI Engineer at itemis',
      image: '/assets/Sruthi.jpeg',
    },
    {
      name: 'Marc',
      role: 'AI Advisor',
      company: 'CEO at TryBlend.ai',
      image: '/assets/Marc.jpeg',
    },
    {
      name: 'Neelesh',
      role: 'Marketing Advisor',
      company: 'Marketing Manager at Nucleon Security',
      image: '/assets/Neelesh.jpeg',
    },
  ];

  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Team Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <p className="text-brand-muted text-base max-w-2xl mx-auto">
            Passionate builders committed to transforming business automation
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-2xl p-6 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10">
                {/* Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-brand-text mb-1">{member.name}</h3>
                <p className="text-brand-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-brand-muted text-sm mb-4">{member.bio}</p>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href={member.linkedin}
                    className="text-brand-muted hover:text-brand-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a
                    href={member.twitter}
                    className="text-brand-muted hover:text-brand-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advisory Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 text-brand-text">
            Advisory Panel
          </h3>
          <p className="text-brand-muted text-base max-w-2xl mx-auto">
            Guided by industry leaders and innovators
          </p>
        </motion.div>

        {/* Advisors Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate advisors for seamless loop */}
            {[...advisors, ...advisors, ...advisors].map((advisor, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-xl p-6 hover:border-brand-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-20 h-20 rounded-full border-2 border-brand-primary/30"
                  />
                  <div>
                    <h4 className="text-brand-text font-bold text-lg mb-1">
                      {advisor.name}
                    </h4>
                    <p className="text-brand-primary text-sm font-medium mb-1">
                      {advisor.role}
                    </p>
                    <p className="text-brand-muted text-xs">{advisor.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Team;
