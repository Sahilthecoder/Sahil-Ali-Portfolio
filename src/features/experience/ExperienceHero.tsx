import React, { useMemo } from 'react';
import Hero from '@/components/common/Hero';
import { Button } from '@/components/ui/Button';

// Collection of high-quality experience-related images from Unsplash, Pexels, and Kaboompics
const EXPERIENCE_IMAGES = [
  // Unsplash
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Business meeting
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Team collaboration
  // Pexels
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Office team
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Strategy meeting
  // Kaboompics
  'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Office workspace
  'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'  // Team discussion
];

const ExperienceHero: React.FC = () => {
  // Randomly select 2 different images from the collection
  const randomImages = useMemo(() => {
    const shuffled = [...EXPERIENCE_IMAGES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  return (
    <div className="relative dark:bg-gray-900">
      <Hero
        title=""
        subtitle=""
        backgroundImages={randomImages}
        className="min-h-[40vh] sm:min-h-[50vh] dark:brightness-100"
      />
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 dark:from-black/70 dark:via-black/50 dark:to-black/70">
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
          <div className="text-center w-full max-w-5xl mx-auto">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white dark:text-white mb-3 sm:mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white via-primary-foreground to-accent-foreground bg-clip-text text-transparent">
                Professional <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Journey</span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 dark:text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Exploring my career path, roles, and the impact I&apos;ve made along the way
            </p>
            <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <Button
                onClick={() => {
                  const experienceSection = document.getElementById('experience-timeline');
                  if (experienceSection) {
                    experienceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                variant="primary"
                size="lg"
                className="w-full xs:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
                icon="view"
                iconPosition="right"
              >
                View Experience
              </Button>
              <a
                href="/Sahil-Ali-Portfolio/assets/Sahil_Ali_Cv.pdf"
                download="Sahil_Ali_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full xs:w-auto inline-flex items-center justify-center"
              >
                <Button
                  variant="outline"
                  size="lg"
                  icon="download"
                  iconPosition="right"
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg border-white text-white hover:bg-white hover:text-gray-900 dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
                >
                  Download CV
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceHero;
