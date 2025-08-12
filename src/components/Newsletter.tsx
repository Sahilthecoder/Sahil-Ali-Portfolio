import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';

interface NewsletterProps {
  className?: string;
  compact?: boolean;
}

const Newsletter: React.FC<NewsletterProps> = ({ className = '', compact = false }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const config = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    adminTemplateId: import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    adminEmail: import.meta.env.VITE_EMAILJS_ADMIN_EMAIL
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      if (Object.values(config).some((v) => !v)) {
        throw new Error('Missing EmailJS environment variables.');
      }

      // 1. Welcome mail to subscriber
      const subscriberData = {
        to_email: email,
        from_email: config.adminEmail,
        subject: 'Welcome to My Newsletter',
        message: `Hi there! Thanks for subscribing to my newsletter. Stay tuned for updates.`
      };
      await emailjs.send(config.serviceId, config.templateId, subscriberData, config.publicKey);

      // 2. Notification mail to admin
      const adminData = {
        to_email: config.adminEmail,
        from_email: email,
        subject: 'New Newsletter Subscription',
        message: `New subscription from: ${email}`
      };
      await emailjs.send(config.serviceId, config.adminTemplateId, adminData, config.publicKey);

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={`relative w-full ${compact ? '' : 'max-w-md mx-auto'} ${className}`}
    >
      <motion.div
        className={`${compact ? 'bg-transparent p-0' : 'p-6 sm:p-8 bg-background/60 backdrop-blur-sm rounded-xl border border-border shadow-lg'}`}
        whileHover={compact ? {} : { scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 150 }}
      >
        {!compact && (
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to my newsletter for updates and insights.
            </p>
          </div>
        )}

        {!compact && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% 200%' }}
          />
        )}

        <AnimatePresence>
          {status !== 'success' ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-4 relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="space-y-3 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary/30 text-foreground placeholder-muted-foreground transition-all"
                  required
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-white py-3 px-5 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-70 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {status === 'loading' ? (
                    <>
                      <FiLoader className="animate-spin h-4 w-4" />
                      Sending...
                    </>
                  ) : (
                    'Subscribe to Newsletter'
                  )}
                </button>
              </div>

              {status === 'error' && (
                <motion.p
                  key="error"
                  role="alert"
                  aria-live="assertive"
                  className="text-sm text-red-500 flex items-center gap-2 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FiXCircle /> Please enter a valid email or try again later.
                </motion.p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="success-message"
              className="flex items-center gap-2 text-green-500 text-sm font-medium relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FiCheckCircle className="inline mr-1" /> Thank you for subscribing!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Newsletter;
