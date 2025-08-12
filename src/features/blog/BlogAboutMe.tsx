import { motion } from 'framer-motion';
import React from 'react';
import {
  FiArrowRight,
  FiLinkedin,
  FiGithub,
} from 'react-icons/fi';

/* ==============================
   Animation Config
   ============================== */
const springConfig = {
  type: 'spring',
  duration: 1.25,
  stiffness: 100,
};

const fadeIn = (
  direction: 'up' | 'down' | 'left' | 'right',
  delay: number
) => ({
  hidden: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: { ...springConfig, delay },
  },
});

const staggerContainer = (staggerChildren: number, delayChildren: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/* ==============================
   Data
   ============================== */
const aboutMeData = {
  title: 'About Me & My Journey',
  description: `I'm Sahil Ali — a Data Analyst, Inventory Specialist, and AI Generalist who thrives on blending technology with real-world problem solving. 
  Over the past 4+ years, I've worked across retail, warehousing, and analytics, mastering tools like Excel, Tableau, SQL, and AI automation to streamline operations and deliver measurable results.
  
  Beyond my professional roles, I use this blog to share insights on data analysis, AI tools, productivity, and career growth. My goal is simple — to turn complex concepts into practical, easy-to-apply knowledge that helps others improve their work and life.`,
  stats: [
    { label: 'Articles', value: '50+' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Happy Readers', value: '10K+' },
  ],
  ctaText: 'Read My Story',
  imageUrl: '/Sahil_Ali-Portfolio/images/profile/profile.webp',
  imageAlt: 'Sahil - AI Generalist'
};

/* ==============================
   Types
   ============================== */
interface Stat {
  label: string;
  value: string | number;
}

interface BlogAboutMeProps {
  id?: string;
  className?: string;
  title: string;
  description: string;
  stats: Stat[];
  ctaText?: string;
  onCtaClick?: () => void;
  imageUrl?: string;
  imageAlt?: string;
}

/* ==============================
   BlogAboutMe Component
   ============================== */
export const BlogAboutMe: React.FC<Partial<BlogAboutMeProps>> = ({
  id,
  className = '',
  title = aboutMeData.title,
  description = aboutMeData.description,
  stats = aboutMeData.stats,
  ctaText = aboutMeData.ctaText,
  onCtaClick,
  imageUrl = aboutMeData.imageUrl,
  imageAlt = aboutMeData.imageAlt,
}) => {
  return (
    <section id={id} className={`py-12 sm:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.08, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Image Section */}
          {imageUrl && (
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg max-w-[380px] mx-auto"
              variants={fadeIn('right', 0.2)}
            >
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-auto object-cover aspect-square scale-100 hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs">{imageAlt}</span>
              </div>
            </motion.div>
          )}

          {/* Content Section */}
          <motion.div variants={fadeIn('left', 0.4)}>
            <motion.h2
              className="text-3xl font-bold text-foreground mb-5"
              variants={fadeIn('up', 0.3)}
            >
              {title}
            </motion.h2>
            <motion.p
              className="prose dark:prose-invert max-w-2xl mx-auto lg:mx-0 text-muted-foreground mb-7 text-base leading-relaxed"
              variants={fadeIn('up', 0.4)}
            >
              {description}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 mb-7"
              variants={staggerContainer(0.1, 0.2)}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  variants={fadeIn('up', 0.3 + index * 0.1)}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            {onCtaClick && (
              <motion.button
                onClick={onCtaClick}
                aria-label={ctaText}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center"
                variants={fadeIn('up', 0.5)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {ctaText}
                <FiArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ==============================
   MiniBio Component
   ============================== */
const MiniBio: React.FC = () => (
  <div className="bg-card rounded-xl p-6 shadow-sm">
    <h2 className="text-2xl font-bold mb-4 text-foreground">
      Hi, I&apos;m Sahil Ali
    </h2>
    <p className="text-muted-foreground mb-4">
      Data Analyst & AI Specialist | Turning complex data into actionable
      insights | Helping professionals leverage AI and analytics to work
      smarter, not harder.
    </p>
    <div className="flex items-center space-x-4 text-sm">
      <span className="text-muted-foreground">Connect with me:</span>
      <a
        href="https://linkedin.com/in/sahil-ali-714867242/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-primary hover:text-primary/80 flex items-center"
      >
        <FiLinkedin className="mr-1" /> LinkedIn
      </a>
      <a
        href="https://github.com/sahilthecoder"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-foreground/80 hover:text-foreground flex items-center"
      >
        <FiGithub className="mr-1" /> GitHub
      </a>
    </div>
  </div>
);

export default BlogAboutMe;
export { MiniBio };
