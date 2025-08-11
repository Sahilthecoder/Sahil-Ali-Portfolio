import React from 'react';
import Hero from '@/components/common/Hero';
import { Button } from '@/components/ui/Button';
import { FiArrowRight } from 'react-icons/fi';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

// Collection of high-quality project-related images from Unsplash, Pexels, and Kaboompics
const PROJECT_IMAGES = [
  // Unsplash
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Code on screen
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Laptop with code
  // Pexels
  'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Web development
  'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Code closeup
  // Kaboompics
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Workspace
  'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'  // Mobile development
];

interface ProjectHeroProps {
  metrics?: {
    total: number;
    featured: number;
  };
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ metrics }) => {
  useSmoothScroll();

  const title = (
    <span className="bg-gradient-to-r from-white via-primary-foreground to-accent-foreground bg-clip-text text-transparent">
      My <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Projects</span>
    </span>
  );
  
  const subtitle = metrics ? `A collection of my work and contributions. Showing ${metrics.total} projects.` : 'A collection of my work and contributions.';

  const ctaContent = (
    <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto">
      <Button
        variant="primary"
        size="lg"
        className="w-full xs:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
        onClick={() => {
          const target = document.getElementById('projects-grid');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        View Projects
        <FiArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Button>
    </div>
  );

  return (
    <div className="relative bg-white dark:bg-gray-900">
      <Hero
        title={title}
        subtitle={subtitle}
        backgroundImages={PROJECT_IMAGES}
        ctaText=""
        className="min-h-[40vh] sm:min-h-[50vh] dark:brightness-100"
      >
        {ctaContent}
      </Hero>
    </div>
  );
};

export default ProjectHero;
