import React from 'react';
import Hero from '@/components/common/Hero';
import { Button } from '@/components/ui/Button';
import { FiArrowRight } from 'react-icons/fi';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const CONTACT_IMAGES = [
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
];

const ContactHero: React.FC = () => {
  useSmoothScroll();

  const title = 'Get In Touch';
  const subtitle = 'Have a question or want to work together? I\'d love to hear from you!';
  
  const ctaContent = (
    <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto">
      <Button
        variant="primary"
        size="lg"
        className="w-full xs:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
        onClick={() => {
          const target = document.getElementById('contact-form');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        Send a Message
        <FiArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Button>
    </div>
  );

  return (
    <div className="relative dark:bg-gray-900">
      <Hero
        title={title}
        subtitle={subtitle}
        ctaText=""
        backgroundImages={CONTACT_IMAGES}
        className="min-h-[40vh] sm:min-h-[50vh]"
        titleVariant="gradient"
        height="md"
        overlay="dark"
        align="center"
      >
        {ctaContent}
      </Hero>
    </div>
  );
};

export default ContactHero;
