import React, { useMemo } from 'react';
import Hero from '@/components/common/Hero';
import { Button } from '@/components/ui/Button';

// Collection of high-quality contact-related images from Unsplash, Pexels, and Kaboompics
const CONTACT_IMAGES = [
  // Unsplash
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Email on laptop
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Business meeting
  // Pexels
  'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Handshake
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Team discussion
  // Kaboompics
  'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Office workspace
  'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'  // Team meeting
];

const ContactHero: React.FC = () => {
  // Randomly select 2 different images from the collection
  const randomImages = useMemo(() => {
    const shuffled = [...CONTACT_IMAGES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  const scrollToContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      // Calculate the position to scroll to (accounting for fixed header)
      const headerOffset = window.innerWidth < 640 ? 70 : 80; // Smaller offset on mobile
      const elementPosition = contactForm.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative dark:bg-gray-900">
      <Hero
        title=""
        subtitle=""
        backgroundImages={randomImages}
        className="min-h-[50vh] sm:min-h-[60vh] dark:brightness-100"
      />
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 dark:from-black/70 dark:via-black/50 dark:to-black/70">
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
          <div className="text-center w-full max-w-5xl mx-auto">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white dark:text-white mb-3 sm:mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white via-primary-foreground to-accent-foreground bg-clip-text text-transparent">
                Get In <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Touch</span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 dark:text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities
            </p>
            <div className="flex justify-center">
              <Button
                onClick={scrollToContactForm}
                variant="primary"
                size="lg"
                icon="mail"
                iconPosition="right"
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-medium w-full sm:w-auto transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
