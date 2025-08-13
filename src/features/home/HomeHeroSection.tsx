'use client';

import { motion, Variants } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '../../components/ui/Button';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const SocialIcons = () => {
  const socialLinks = [
    { 
      icon: <FiGithub />, 
      href: 'https://github.com/sahilthecoder',
      label: 'GitHub',
      color: 'hover:text-gray-800 dark:hover:text-gray-200',
      mobileLabel: 'GitHub Profile'
    },
    { 
      icon: <FiLinkedin />, 
      href: 'https://www.linkedin.com/in/sahil-ali-714867242',
      label: 'LinkedIn',
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
      mobileLabel: 'LinkedIn Profile'
    },
    { 
      icon: <FiMail />, 
      href: 'mailto:sahilkhan36985@gmail.com',
      label: 'Email',
      color: 'hover:text-red-500 dark:hover:text-red-400',
      mobileLabel: 'Send Email'
    },
    { 
      icon: <FaWhatsapp />, 
      href: 'https://wa.me/919875771550',
      label: 'WhatsApp',
      color: 'hover:text-green-500 dark:hover:text-green-400',
      mobileLabel: 'Message on WhatsApp'
    }
  ];

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-6 sm:mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, staggerChildren: 0.1 }}
    >
      {socialLinks.map((item, index) => (
        <motion.a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xl sm:text-2xl bg-white/10 backdrop-blur-sm p-2.5 sm:p-3 rounded-full border border-white/10 ${item.color} transition-all duration-300 hover:bg-white/20 hover:shadow-lg active:scale-95`}
          aria-label={item.label}
          whileHover={{ y: -4, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <span className="sr-only">{item.label}</span>
          {item.icon}
          <span className="sm:hidden text-xs absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            {item.mobileLabel}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
};

const HomeHeroSection = () => {
  return (
    <section className="relative py-10 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950 text-foreground overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/3 -left-1/4 w-2/3 h-full bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-full filter blur-3xl" />
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full sm:w-3/4 h-1/2 bg-gradient-to-t from-slate-100 to-transparent dark:from-gray-950/80 dark:to-transparent" />
      </div>

      <div className="container mx-auto max-w-7xl relative px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-14 lg:gap-16">
          {/* Text content */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            >
              <motion.div
                className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-5 text-xs sm:text-sm font-medium text-primary bg-primary/10 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to my portfolio
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white mb-6"
              >
                Transforming Data into <span className="text-primary">Business Intelligence</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8"
              >
                I&apos;m <strong className="text-primary">Sahil Ali</strong>, delivering AI-powered insights that drive growth and efficiency.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto hover:scale-105 transition-transform duration-300"
                  aria-label="Contact Sahil Ali"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Let&apos;s Work Together
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  aria-label="View Sahil Ali's projects"
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View My Work
                </Button>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  Available for opportunities
                </span>
                <span className="hidden sm:inline">•</span>
                <span>4+ Years Experience</span>
              </motion.div>

              <div className="mt-10">
                <SocialIcons />
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="hidden lg:flex w-full lg:w-1/2 relative mt-14 sm:mt-20 lg:mt-0 px-4 sm:px-8 lg:px-0 justify-center lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative max-w-md w-full">
              <motion.div
                className="relative mx-auto w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-4 border-white/30 dark:border-white/20 shadow-lg bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-primary/30 hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <img
                  src="/Sahil-Ali-Portfolio/images/profile/profile-600w.webp"
                  alt="Sahil Ali - Professional Profile Photo"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              {/* Subtle floating blobs */}
              <motion.div
                className="absolute -z-10 -top-8 -right-8 w-36 h-36 bg-blue-500/10 rounded-full filter blur-xl"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                className="absolute -z-10 -bottom-8 -left-8 w-44 h-44 bg-purple-500/10 rounded-full filter blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
