import React from 'react';
import { motion } from 'framer-motion';
import InstagramWidget from '@/components/instagram/InstagramWidget';

interface BlogInstagramProps {
  id?: string;
  className?: string;
}

const BlogInstagram: React.FC<BlogInstagramProps> = ({
  id,
  className = '',
}) => {
  const title = 'Follow Me on Instagram';
  const subtitle = 'Check out my latest updates, behind-the-scenes, and more';
  const instagramUsername = 'hey___sahilll';
  const ctaText = `Follow @${instagramUsername}`;

  const handleInstagramClick = () => {
    window.open(`https://instagram.com/${instagramUsername}`, '_blank');
  };
  return (
    <section 
      id={id}
      className={`py-10 sm:py-14 bg-muted/30 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>

        {/* Instagram Widget */}
        <motion.div 
          className="mb-8 sm:mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <InstagramWidget />
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <button
            onClick={handleInstagramClick}
            className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200 hover:scale-[1.02] active:scale-95"
          >
            {ctaText}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogInstagram;
