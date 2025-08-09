import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Divider from '@/components/ui/Divider';
import BlogHero from '@/features/blog/BlogHero';
import BlogAboutMe from '@/features/blog/BlogAboutMe';
import BlogInstagram from '@/features/blog/BlogInstagram';
import BlogYoutube from '@/features/blog/BlogYoutube';
import { BlogBioSection } from '@/features/blog/BlogBioSection';
import { BlogWhyIWriteSection } from '@/features/blog/BlogWhyIWriteSection';
import { BlogPortfolioSection } from '@/features/blog/BlogPortfolioSection';
import { BlogSocialProofSection } from '@/features/blog/BlogSocialProofSection';
import { useBlogAnimation } from '@/features/blog/hooks/useBlogAnimation';

const Blog = () => {
  const { fadeInUp, staggerContainer } = useBlogAnimation();
  const sectionRefs = {
    hero: useRef(null),
    bio: useRef(null),
    whyIWrite: useRef(null),
    about: useRef(null),
    videos: useRef(null),
    instagram: useRef(null),
    portfolio: useRef(null),
    testimonials: useRef(null)
  };

  // Check if sections are in view
  const isHeroInView = useInView(sectionRefs.hero, { once: true, amount: 0.3 });
  const isBioInView = useInView(sectionRefs.bio, { once: true, amount: 0.2 });
  const isWhyIWriteInView = useInView(sectionRefs.whyIWrite, { once: true, amount: 0.2 });
  const isAboutInView = useInView(sectionRefs.about, { once: true, amount: 0.2 });
  const isVideosInView = useInView(sectionRefs.videos, { once: true, amount: 0.2 });
  const isInstagramInView = useInView(sectionRefs.instagram, { once: true, amount: 0.2 });
  const isPortfolioInView = useInView(sectionRefs.portfolio, { once: true, amount: 0.2 });
  const isTestimonialsInView = useInView(sectionRefs.testimonials, { once: true, amount: 0.2 });

  return (
    <motion.main 
      className="w-full" 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        },
        exit: { opacity: 0 }
      }}
      aria-label="Blog page main content"
    >
      <motion.div
        ref={sectionRefs.hero}
        variants={fadeInUp}
      >
        <BlogHero />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHeroInView ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Divider />
      </motion.div>

      <motion.div
        ref={sectionRefs.bio}
        variants={staggerContainer}
        initial="hidden"
        animate={isBioInView ? "visible" : "hidden"}
      >
        <BlogBioSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isBioInView ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Divider />
      </motion.div>

      <motion.div
        ref={sectionRefs.whyIWrite}
        variants={staggerContainer}
        initial="hidden"
        animate={isWhyIWriteInView ? "visible" : "hidden"}
      >
        <BlogWhyIWriteSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isWhyIWriteInView ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Divider />
      </motion.div>

      <motion.div
        ref={sectionRefs.about}
        variants={staggerContainer}
        initial="hidden"
        animate={isAboutInView ? "visible" : "hidden"}
      >
        <BlogAboutMe id="about" className="py-12" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isAboutInView ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Divider />
      </motion.div>

      <motion.div
        ref={sectionRefs.videos}
        variants={staggerContainer}
        initial="hidden"
        animate={isVideosInView ? "visible" : "hidden"}
      >
        <BlogYoutube id="videos" className="py-12" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideosInView ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Divider />
      </motion.div>

      <motion.div
        ref={sectionRefs.instagram}
        variants={staggerContainer}
        initial="hidden"
        animate={isInstagramInView ? "visible" : "hidden"}
      >
        <BlogInstagram id="instagram" className="py-12" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInstagramInView ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Divider />
      </motion.div>

      <motion.div
        ref={sectionRefs.portfolio}
        variants={staggerContainer}
        initial="hidden"
        animate={isPortfolioInView ? "visible" : "hidden"}
      >
        <BlogPortfolioSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPortfolioInView ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Divider />
      </motion.div>

      <motion.div
        ref={sectionRefs.testimonials}
        variants={staggerContainer}
        initial="hidden"
        animate={isTestimonialsInView ? "visible" : "hidden"}
      >
        <BlogSocialProofSection />
      </motion.div>
    </motion.main>
  );
};

export default Blog;
