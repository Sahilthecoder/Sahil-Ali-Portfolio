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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  const content = {
    title: 'Stay Updated',
    description: 'Subscribe to my newsletter for the latest updates and insights.',
    welcomeSubject: 'Welcome to My Newsletter',
    welcomeMessage: 'Hi there! Thanks for subscribing to my newsletter. Stay tuned for updates.',
    subscribe: 'Subscribe to Newsletter',
    success: 'Thank you for subscribing!',
    duplicate: 'You have already subscribed with this email.',
    error: 'Please enter a valid email or try again later.',
    sending: 'Sending...',
    emailPlaceholder: 'Enter your email',
    newSubscription: 'New Newsletter Subscription',
    newSubscriptionMessage: 'New subscription from:'
  };

  const config = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    adminTemplateId: import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    adminEmail: import.meta.env.VITE_EMAILJS_ADMIN_EMAIL
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Check localStorage for subscribed emails
  const isAlreadySubscribed = (email: string) => {
    if (typeof window === 'undefined') return false; // SSR safety
    const subscribed = localStorage.getItem('subscribedEmails');
    if (!subscribed) return false;
    try {
      const emails: string[] = JSON.parse(subscribed);
      return emails.includes(email.toLowerCase());
    } catch {
      return false;
    }
  };

  const addSubscribedEmail = (email: string) => {
    if (typeof window === 'undefined') return;
    const subscribed = localStorage.getItem('subscribedEmails');
    let emails: string[] = [];
    if (subscribed) {
      try {
        emails = JSON.parse(subscribed);
      } catch {
        emails = [];
      }
    }
    emails.push(email.toLowerCase());
    localStorage.setItem('subscribedEmails', JSON.stringify(emails));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }

    if (isAlreadySubscribed(email)) {
      setStatus('duplicate');
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
        subject: content.welcomeSubject,
        message: content.welcomeMessage
      };
      await emailjs.send(config.serviceId, config.templateId, subscriberData, config.publicKey);

      // 2. Notification mail to admin
      const adminData = {
        to_email: config.adminEmail,
        from_email: email,
        subject: content.newSubscription,
        message: `${content.newSubscriptionMessage} ${email}`
      };
      await emailjs.send(config.serviceId, config.adminTemplateId, adminData, config.publicKey);

      addSubscribedEmail(email);

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
            <h3 className="text-xl font-bold text-foreground mb-2">{content.title}</h3>
            <p className="text-muted-foreground text-sm">{content.description}</p>
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
                  placeholder={content.emailPlaceholder}
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
                      {content.sending}
                    </>
                  ) : (
                    content.subscribe
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
                  <FiXCircle /> {content.error}
                </motion.p>
              )}

              {status === 'duplicate' && (
                <motion.p
                  key="duplicate"
                  role="alert"
                  aria-live="assertive"
                  className="text-sm text-yellow-500 flex items-center gap-2 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FiXCircle /> {content.duplicate}
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
              <FiCheckCircle className="inline mr-1" /> {content.success}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Newsletter;
