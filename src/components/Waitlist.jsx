import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { addToWaitlist } from '../firebase';
import siteConfig from '../config/siteConfig.json';

const Waitlist = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // First save to Firebase to update the count
      const result = await addToWaitlist(formData.email, formData.name);

      if (result.success) {
        // Show success message briefly
        setStatus({
          type: 'success',
          message: '🎉 Saving your information...',
        });

        // Redirect to Google Form after a short delay
        setTimeout(() => {
          // Open Google Form in a new tab
          window.open(siteConfig.forms.waitlist, '_blank');

          // Reset form and show final message
          setFormData({ name: '', email: '' });
          setStatus({
            type: 'success',
            message: '✅ Information saved! Please complete the detailed form in the new tab.',
          });
          setIsSubmitting(false);
        }, 1500);
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.',
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Unable to join waitlist. Please try again later.',
      });
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="waitlist" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-secondary/5 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            Join the Waitlist
          </h2>
          <p className="text-brand-muted text-base max-w-2xl mx-auto">
            Be among the first to experience the future of AI-powered business automation. Get early access and exclusive benefits.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-2xl p-8 sm:p-12 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-brand-text font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-brand-text font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            {/* Benefits */}
            <div className="bg-brand-bg/50 rounded-lg p-4 space-y-2">
              <p className="text-brand-text font-medium mb-3">Early Access Benefits:</p>
              <div className="space-y-2">
                {[
                  'Priority access to beta features',
                  'Exclusive onboarding support',
                  'Lifetime discount on premium plans',
                  'Direct line to our product team',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-brand-muted text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Message */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  status.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}
              >
                {status.message}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-brand-bg font-bold text-base hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                  Processing...
                </span>
              ) : (
                'Join Waitlist Now'
              )}
            </button>

            {/* Note about Google Form */}
            <p className="text-brand-muted text-xs text-center mt-2">
              You'll be redirected to complete additional details after submission
            </p>
          </form>

          {/* Privacy Note */}
          <p className="text-brand-muted text-xs text-center mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-brand-muted text-sm">
            Join <span className="text-brand-primary font-bold">5+</span> businesses already on the waitlist
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Waitlist;
