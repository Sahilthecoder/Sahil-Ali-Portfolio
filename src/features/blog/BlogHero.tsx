import React from 'react';
import Hero from '@/components/common/Hero';
import { Button } from '@/components/ui/Button';
import { FiArrowRight } from 'react-icons/fi';

interface BlogHeroProps {
  postCount?: number;
}

const BlogHero: React.FC<BlogHeroProps> = ({ postCount = 0 }) => {
  const title = 'Blog & Articles';
  
  const subtitle = `Thoughts, tutorials, and insights${postCount > 0 ? ` (${postCount} articles)` : ''}`;

  const ctaContent = (
    <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto">
      <Button
        variant="primary"
        size="lg"
        className="w-full xs:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
        onClick={() => {
          const target = document.getElementById('blog-posts');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        Read Articles
        <FiArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Button>
    </div>
  );

  return (
    <div className="relative">
      <Hero
        title={title}
        subtitle={subtitle}
        ctaText=""
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

export default BlogHero;
