import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/AnimatedSection';
import { toast } from 'react-hot-toast';
import { FiSend, FiLoader, FiCheckCircle } from 'react-icons/fi';

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (formData: FormData) => {
    const errors: { [key: string]: string } = {};
    if (!formData.get('name')?.toString().trim()) errors.name = 'Name is required';
    if (!formData.get('email')?.toString().trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get('email') as string)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.get('message')?.toString().trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix the highlighted fields');
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xpwrjjqj', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success('Message sent successfully!');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-10 sm:py-14 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full mb-12 sm:mb-16 lg:mb-20">
          <SectionHeader
            title="Get in Touch"
            subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 sm:px-6"
        >
          <AnimatePresence>
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex justify-center"
                >
                  <FiCheckCircle className="text-green-500 w-12 h-12" />
                </motion.div>
                <h3 className="text-xl font-semibold">Message Sent Successfully!</h3>
                <p className="text-muted-foreground">
                  Thank you for your message! I&apos;ll get back to you soon.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSuccess(false)}
                  className="bg-primary text-white py-2 px-6 rounded-lg shadow hover:bg-primary/90 transition-colors text-sm sm:text-base"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {['name', 'email', 'message'].map((field, i) => (
                  <motion.div key={field} custom={i} variants={fieldVariants}>
                    {field !== 'message' ? (
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                        className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                          formErrors[field] ? 'border-red-500' : 'border-border'
                        } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
                      />
                    ) : (
                      <textarea
                        name={field}
                        placeholder="Your Message"
                        rows={4}
                        className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                          formErrors[field] ? 'border-red-500' : 'border-border'
                        } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
                      />
                    )}
                    {formErrors[field] && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors[field]}</p>
                    )}
                  </motion.div>
                ))}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  className={`w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="flex items-center justify-center"
                    >
                      <FiLoader className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.span>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
