import React, { useMemo } from 'react';
import Hero from '@/components/common/Hero';

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
  // Randomly select 2 different images from the collection
  const randomImages = useMemo(() => {
    const shuffled = [...PROJECT_IMAGES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('all-projects');
    if (projectsSection) {
      const headerOffset = window.innerWidth < 640 ? 80 : 100; // Smaller offset on mobile
      const elementPosition = projectsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-900">
      <Hero
        title=""
        subtitle=""
        backgroundImages={randomImages}
        className="min-h-[50vh] sm:min-h-[60vh]"
      />
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 dark:from-black/80 dark:via-black/60 dark:to-black/80">
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
          <div className="text-center w-full max-w-5xl mx-auto">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white dark:text-white mb-3 sm:mb-4 leading-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Projects</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 dark:text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              A collection of my latest work, experiments, and contributions to open-source projects.
              {metrics && (
                <span className="block mt-2 sm:mt-3 text-sm sm:text-base text-gray-300 dark:text-gray-400">
                  {metrics.total} total projects • {metrics.featured} featured
                </span>
              )}
            </p>
            <div className="flex justify-center">
              <a
                href="#all-projects"
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                aria-label="View all projects"
              >
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
