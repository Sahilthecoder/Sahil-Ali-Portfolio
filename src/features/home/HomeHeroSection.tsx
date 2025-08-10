'use client';

import { motion, Variants } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMessageSquare } from 'react-icons/fi';
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

// RoleCard component is not currently used but kept for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RoleCard = ({
  icon: Icon,
  title,
  description,
  iconBg,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -8, scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="group relative p-4 sm:p-6 bg-card border border-border/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/40 overflow-hidden cursor-pointer active:scale-[0.98]"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-50 transition-opacity duration-300 pointer-events-none rounded-2xl" />

    <div
      className={`w-12 h-12 sm:w-16 sm:h-16 ${iconBg} rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto transition-transform duration-300 group-hover:scale-110 group-active:scale-105`}
    >
      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColor} transition-transform duration-300 group-hover:scale-110`} />
    </div>

    <div className="relative z-10 text-center">
      <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground/90 text-sm sm:text-base leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

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
      icon: <FiMessageSquare />, 
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
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950 text-foreground overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/3 -left-1/4 w-2/3 h-full bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-full filter blur-3xl" />
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full sm:w-3/4 h-1/2 bg-gradient-to-t from-slate-100 to-transparent dark:from-gray-950/80 dark:to-transparent" />
      </div>

      <div className="container mx-auto max-w-7xl relative px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-8">
          {/* Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              className="max-w-2xl mx-auto lg:mx-0"
            >
              <motion.div 
                className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-primary bg-primary/10 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to my portfolio
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6 px-2 sm:px-0"
              >
                Transforming Data into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Business Value</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl leading-relaxed"
              >
                I&apos;m <span className="font-semibold text-primary">Sahil Ali</span>, a results-driven professional specializing in AI, Data Analytics, and Business Intelligence solutions that drive growth and efficiency.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
Let&apos;s Work Together
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  View My Work
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Available for opportunities
                </span>
                <span className="hidden sm:inline">•</span>
                <span>4+ Years Experience</span>
              </motion.div>
              
              <div className="mt-8">
                <SocialIcons />
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center relative mt-8 sm:mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-white/5 backdrop-blur-sm">
                <img
                  src="/Sahil-Ali-Portfolio/images/profile/profile-600w.webp"
                  alt="Sahil Ali"
                  className="w-full h-full object-cover"
                  loading="eager"
                  srcSet="/Sahil-Ali-Portfolio/images/profile/profile-300w.webp 300w, /Sahil-Ali-Portfolio/images/profile/profile-600w.webp 600w"
                  sizes="(max-width: 640px) 300px, 600px"
                  width="600"
                  height="600"
                  decoding="async"
                />
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full filter blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute -bottom-6 -left-6 w-40 h-40 bg-purple-500/10 rounded-full filter blur-xl -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              {/* Tech stack badges */}
              <motion.div 
                className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1 sm:gap-2 px-1 sm:px-2 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {['AI/ML', 'Data Analytics', 'Business Intelligence'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] xs:text-xs sm:text-xs font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md border border-gray-100 dark:border-gray-700 whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trusted by section */}
        <motion.div 
          className="mt-16 sm:mt-20 md:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 uppercase tracking-wider">
            Trusted by innovative teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 opacity-70">
            {['Zomato', 'Ekam', 'Bansal'].map((company) => (
              <div 
                key={company} 
                className="text-base sm:text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300"
              >
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
