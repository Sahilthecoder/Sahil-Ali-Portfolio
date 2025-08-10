import React, { useMemo } from 'react';
import Hero from '@/components/common/Hero';
import { Button } from '@/components/ui/Button';
import { FiArrowRight } from 'react-icons/fi';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

// Collection of high-quality about-related images from Unsplash, Pexels, and Kaboompics
const ABOUT_IMAGES = [
  // Unsplash
  'https://images.unsplash.com/photo-1543269664-7e6d8a8352ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Workspace
  'https://images.unsplash.com/photo-1516321318423-f06a85f50459?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Desk setup
  // Pexels
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Team meeting
  'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Office space
  // Kaboompics
  'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Code closeup
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'  // Creative workspace
];

const AboutHero: React.FC = () => {
  useSmoothScroll();

  // Randomly select 2 different images from the collection
  const randomImages = useMemo(() => {
    const shuffled = [...ABOUT_IMAGES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);
 
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
              Crafting Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Experiences</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 dark:text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating elegant solutions to complex problems through code and design.
            </p>
            <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full xs:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
                onClick={() => {
                  const target = document.getElementById('about-content');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Learn More
                <FiArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon="download"
                iconPosition="left"
                onClick={() => window.open('/Sahil-Ali-Portfolio/assets/Sahil_Ali_Cv.pdf', '_blank')}
                className="w-full xs:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg border-white text-white hover:bg-white hover:text-gray-900 dark:border-gray-300 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              >
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
