'use client';

import { motion, Variants } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '../../components/ui/Button';
import { useEffect, useState } from 'react';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};
const itemVariants: Variants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
const roles = [
  "AI Generalist",
  "Inventory Specialist",
  "Data Analyst"
];

const SocialIcons = () => {
  const socialLinks = [
    {
      icon: <FiGithub />,
      href: 'https://github.com/sahilthecoder',
      label: 'GitHub',
      color: 'hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-white',
      mobileLabel: 'GitHub Profile',
      bg: 'bg-white/80 dark:bg-gray-800/60',
      iconColor: 'text-gray-700 dark:text-gray-200',
      border: 'border-gray-200/80 dark:border-gray-700/50'
    },
    {
      icon: <FiLinkedin />,
      href: 'https://www.linkedin.com/in/sahil-ali-714867242',
      label: 'LinkedIn',
      color: 'hover:bg-blue-100/80 dark:hover:bg-blue-900/60 hover:text-blue-600 dark:hover:text-blue-300',
      mobileLabel: 'LinkedIn Profile',
      bg: 'bg-white/80 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200/80 dark:border-blue-800/50'
    },
    {
      icon: <FiMail />,
      href: 'mailto:sahilkhan36985@gmail.com',
      label: 'Email',
      color: 'hover:bg-red-100/80 dark:hover:bg-red-900/60 hover:text-red-600 dark:hover:text-red-300',
      mobileLabel: 'Send Email',
      bg: 'bg-white/80 dark:bg-red-900/40',
      iconColor: 'text-red-600 dark:text-red-400',
      border: 'border-red-200/80 dark:border-red-800/50'
    },
    {
      icon: <FaWhatsapp />,
      href: 'https://wa.me/919875771550',
      label: 'WhatsApp',
      color: 'hover:bg-green-100/80 dark:hover:bg-green-900/60 hover:text-green-600 dark:hover:text-green-300',
      mobileLabel: 'Message on WhatsApp',
      bg: 'bg-white/80 dark:bg-green-900/40',
      iconColor: 'text-green-600 dark:text-green-400',
      border: 'border-green-200/80 dark:border-green-800/50'
    }
  ];
  return (
    <motion.div
      className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-5 mt-6 sm:mt-8 w-full"
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
          className={`group relative text-xl sm:text-2xl ${item.bg} backdrop-blur-sm p-3 sm:p-4 rounded-xl border ${item.border} ${item.color} transition-all duration-300 hover:shadow-lg active:scale-95 overflow-hidden ${item.iconColor} hover:scale-105`}
          aria-label={item.label}
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3 + index * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 15
          }}
        >
          <span className="sr-only">{item.label}</span>
          <div className="relative z-10">{item.icon}</div>
          <motion.span
            className="hidden sm:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 0, y: 0 }}
            whileHover={{ opacity: 1, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {item.mobileLabel}
          </motion.span>
        </motion.a>
      ))}
    </motion.div>
  );
};
const HomeHeroSection = () => {
  // Cycling roles with animated typewriter
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing && currentText.length < roles[roleIndex].length) {
      timeout = setTimeout(() => {
        setCurrentText(roles[roleIndex].slice(0, currentText.length + 1));
      }, 60);
    } else if (typing && currentText.length === roles[roleIndex].length) {
      timeout = setTimeout(() => setTyping(false), 1200);
    } else if (!typing && currentText.length > 0) {
      timeout = setTimeout(() => {
        setCurrentText(roles[roleIndex].slice(0, currentText.length - 1));
      }, 24);
    } else if (!typing && currentText.length === 0) {
      timeout = setTimeout(() => {
        setRoleIndex((roleIndex + 1) % roles.length);
        setTyping(true);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [currentText, typing, roleIndex]);

  return (
    <section
      className="
        relative min-h-[calc(100vh-80px)] flex items-center pt-16 pb-8 sm:pt-20 px-4 sm:px-6
        bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50
        dark:from-slate-900 dark:via-gray-900 dark:to-indigo-900/30
        text-gray-900 dark:text-white font-['Inter',_'Space_Grotesk',_sans-serif]
        overflow-hidden transition-colors duration-500
      "
    >
      {/* Animated blurred blobs for depth */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        {/* Light mode blobs */}
        <div className="absolute -left-32 top-0 w-96 h-96 bg-blue-300 opacity-20 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen blur-[100px] pointer-events-none rounded-full transition-opacity duration-500" />
        <div className="absolute right-0 top-1/2 w-96 h-96 transform translate-y-[-60%] bg-purple-300 opacity-15 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen blur-[110px] pointer-events-none rounded-full transition-opacity duration-500" />
        <div className="absolute left-1/3 bottom-0 w-80 h-48 bg-indigo-300 opacity-15 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen blur-[80px] pointer-events-none rounded-full transition-opacity duration-500" />
        
        {/* Dark mode accent blobs */}
        <div className="hidden dark:block absolute -right-20 -top-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="hidden dark:block absolute -left-20 bottom-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.02)_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_0%,rgba(0,0,0,0.1)_70%)]" />
      </div>
      <div className="container mx-auto max-w-7xl relative px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 sm:gap-10 lg:gap-12">
          {/* Text Content */}
          <motion.div
            className="w-full lg:w-1/2 text-center md:text-left max-w-2xl mx-auto lg:mx-0"
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
                className="inline-block px-4 py-1.5 mb-4 text-xs sm:text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-300 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-full shadow shadow-cyan-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to my portfolio
              </motion.div>

              <motion.div className="mb-6 sm:mb-8 text-balance overflow-hidden" variants={itemVariants}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white drop-shadow-lg">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-cyan-600 via-blue-600 to-fuchsia-600 dark:from-cyan-300 dark:via-blue-300 dark:to-fuchsia-400">
                    {currentText}
                    <motion.span
                      className="inline-block w-0.5 h-8 sm:h-10 bg-gradient-to-b from-cyan-400 via-blue-400 to-fuchsia-400 ml-0.5 -mb-1 rounded"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut"
                      }}
                    />
                  </span>
                </h1>
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 mt-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
                />
              </motion.div>
              <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
                <p className="text-lg sm:text-2xl text-gray-700 dark:text-cyan-100 font-medium leading-relaxed">
                  Sahil Ali | AI-Powered Solutions, Inventory Ops, Data Mastery.
                  <br />
                  <span className="text-[1.1em] font-semibold text-fuchsia-700 dark:text-fuchsia-300/90 tracking-wide">
                    I make businesses smarter, leaner, and future-ready.
                  </span>
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.045 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto group relative overflow-hidden shadow-lg shadow-cyan-500/20"
                    aria-label="Contact Sahil Ali"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Let&apos;s Collaborate
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/60 to-fuchsia-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.045 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto group relative overflow-hidden border-gray-400 dark:border-gray-600 hover:border-cyan-300"
                    aria-label="View Sahil Ali's projects"
                    onClick={() => {
                      const projectsSection = document.getElementById('projects');
                      if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="relative z-10">
                      View My Work
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-cyan-100/20 dark:bg-cyan-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-blue-900/90 dark:text-cyan-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
                  Available for opportunities
                </span>
                <span className="hidden sm:inline text-sm">•</span>
                <span className="tracking-wide font-medium">4+ Years Experience</span>
              </motion.div>
              <div className="mt-8"><SocialIcons /></div>
            </motion.div>
          </motion.div>
          {/* Profile Image */}
          <motion.div
            className="hidden lg:flex w-full lg:w-1/2 relative mt-10 sm:mt-16 lg:mt-0 px-4 sm:px-6 lg:px-0 justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div className="relative max-w-xs w-full">
              <motion.div
                className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-4 border-cyan-200/30 dark:border-fuchsia-300/20 shadow-xl bg-gradient-to-br from-cyan-800/10 to-fuchsia-800/10 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-lg"
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                whileHover={{
                  scale: 1.04,
                  rotate: [0, -2, 2, -2, 2, 0],
                  transition: { duration: 0.8 }
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                  scale: { duration: 0.3 }
                }}
              >
                <img
                  src="/Sahil-Ali-Portfolio/images/profile/profile-600w.webp"
                  alt="Sahil Ali - Professional Profile Photo"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              {/* Floating blobs */}
              <motion.div
                className="absolute -z-10 -top-8 -right-8 w-36 h-36 bg-cyan-400/10 rounded-full filter blur-xl"
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
                className="absolute -z-10 -bottom-8 -left-8 w-44 h-44 bg-fuchsia-500/10 rounded-full filter blur-xl"
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
