import React, { useMemo } from 'react';
import Hero from '@/components/common/Hero';
import { Button } from '@/components/ui/Button';

// Collection of high-quality blog-related images from Unsplash, Pexels, and Kaboompics
const BLOG_IMAGES = [
  // Unsplash
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Open book
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Writing notes
  // Pexels
  'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Typewriter
  'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Coffee and notebook
  // Kaboompics
  'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', // Laptop and notebook
  'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'  // Code editor
];

const BlogHero: React.FC = () => {
  // Randomly select 2 different images from the collection
  const randomImages = useMemo(() => {
    const shuffled = [...BLOG_IMAGES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  return (
    <div className="relative bg-white dark:bg-gray-900">
      <Hero
        title=""
        subtitle=""
        backgroundImages={randomImages}
        className="min-h-[40vh]"
      />
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 dark:from-black/80 dark:via-black/60 dark:to-black/80">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-4">
              Blog & Articles
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
              Sharing insights, tutorials, and thoughts on technology and beyond
            </p>
            <div className="flex justify-center">
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  const latestSection = document.getElementById('about');
                  if (latestSection) {
                    // Calculate the position to scroll to (accounting for fixed header)
                    const headerOffset = 80;
                    const elementPosition = latestSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="inline-flex items-center justify-center w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="lg"
                  icon="arrow-right"
                  iconPosition="right"
                  className="px-8 py-3 text-lg w-full sm:w-auto"
                >
                  Read Latest Post
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
