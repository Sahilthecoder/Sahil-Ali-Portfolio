import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

import { type ContactFormState, useContactForm } from '@/features/contact/hooks/UseContactForm';

const ContactForm: React.FC = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    touched,  
    formError,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm();

  const formRef = useRef<HTMLFormElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = formRef.current?.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData.message]);

  const inputClasses = (field: keyof ContactFormState) =>
    `w-full px-4 py-2.5 rounded-lg border bg-background transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-opacity-50 text-foreground ${
      errors[field] && touched[field]
        ? 'border-destructive/80 focus:ring-destructive/20 focus:border-destructive/80'
        : 'border-border/60 hover:border-primary/60 focus:ring-primary/30 focus:border-primary/80 dark:border-gray-700/60 dark:hover:border-primary/60'
    }`;

  const labelClasses = (field: keyof ContactFormState) =>
    `block text-sm font-medium mb-1.5 transition-colors ${
      errors[field] && touched[field] 
        ? 'text-destructive' 
        : 'text-foreground/80 hover:text-foreground dark:text-gray-300/90 dark:hover:text-white'
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Get In Touch
          </h2>
          <p className="mt-1 text-muted-foreground">
            Have a question or want to work together? Send me a message!
          </p>
        </div>

        <AnimatePresence>
          {formError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
            >
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <p>{formError}</p>
              </div>
            </motion.div>
          )}
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 text-sm rounded-lg bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300"
            >
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <p>Your message has been sent successfully! I&apos;ll get back to you soon.</p>
              </div>
            </motion.div>
          )}

          {errors.name ||
            errors.email ||
            errors.subject ||
            (errors.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 text-sm rounded-lg bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300"
              >
                <div className="flex items-start">
                  <AlertCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                  <p>{errors.name}</p>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="name" className={labelClasses('name')}>
              Name {errors.name && touched.name && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange('name')}
                onBlur={() => handleBlur('name')}
                className={`${inputClasses('name')} peer placeholder-transparent focus:placeholder-muted-foreground/40`}
                placeholder="John Doe"
                disabled={isSubmitting}
              />
              {errors.name && touched.name && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>
            {errors.name && touched.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className={labelClasses('email')}>
              Email {errors.email && touched.email && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                onBlur={() => handleBlur('email')}
                className={`${inputClasses('email')} peer placeholder-transparent focus:placeholder-muted-foreground/40`}
                placeholder="john@example.com"
                disabled={isSubmitting}
              />
              {errors.email && touched.email && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>
            {errors.email && touched.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="md:col-span-2 space-y-1">
            <label htmlFor="subject" className={labelClasses('subject')}>
              Subject {errors.subject && touched.subject && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange('subject')}
                onBlur={() => handleBlur('subject')}
                className={`${inputClasses('subject')} peer placeholder-transparent focus:placeholder-muted-foreground/40`}
                placeholder="How can we help?"
                disabled={isSubmitting}
              />
              {errors.subject && touched.subject && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>
            {errors.subject && touched.subject && (
              <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
            )}
          </div>

          <div className="md:col-span-2 space-y-1">
            <label htmlFor="message" className={labelClasses('message')}>
              Message {errors.message && touched.message && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange('message')}
                onBlur={() => handleBlur('message')}
                className={`${inputClasses('message')} min-h-[140px] resize-none placeholder-transparent focus:placeholder-muted-foreground/40`}
                placeholder="Your message here..."
                disabled={isSubmitting}
              />
              {errors.message && touched.message && (
                <div className="absolute right-3 top-3">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>
            {errors.message && touched.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message}</p>
            )}
          </div>

          <div className="md:col-span-2 pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full md:w-auto"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  Sending...
                </div>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
