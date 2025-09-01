import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHome, FiUser, FiBriefcase, FiCode, FiMail, FiChevronDown, FiFolder, FiStar, FiArrowRight } from 'react-icons/fi';
import Newsletter from '@/components/Newsletter';
import { projects } from '@/data/projects';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/', icon: <FiHome aria-hidden="true" className="w-6 h-6" /> },
  { label: 'About', path: '/about', icon: <FiUser aria-hidden="true" className="w-6 h-6" /> },
  { label: 'Experience', path: '/experience', icon: <FiBriefcase aria-hidden="true" className="w-6 h-6" /> },
  { label: 'Contact', path: '/contact', icon: <FiMail aria-hidden="true" className="w-6 h-6" /> },
];

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: { opacity: 0, y: -10 }
};

// Simple focus trap hook for trapping keyboard focus inside a container
function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input[type="text"]:not([disabled])',
      'input[type="email"]:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelectors.join(','));
    if (focusableElements.length === 0) return;

    // Focus the first element inside container
    focusableElements[0].focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive, containerRef]);
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [projectsExpanded, setProjectsExpanded] = useState(false);

  useFocusTrap(isOpen, menuRef);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus menu container on open for screen reader + keyboard users
      menuRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-modal="true"
          role="dialog"
          aria-label="Mobile menu"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Menu Container */}
          <div
            ref={menuRef}
            tabIndex={-1}
            className={`
              fixed inset-y-0 right-0 w-full max-w-sm overflow-y-auto focus:outline-none
              backdrop-blur-lg bg-white/98 dark:bg-gray-900/99
              border-l border-gray-200 dark:border-gray-800 shadow-2xl
            `}
            style={{
              '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0))',
              '--tw-gradient-from': 'hsl(var(--primary) / 0.1)'
            } as React.CSSProperties}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  aria-label="Close menu"
                >
                  <FiX className="w-7 h-7 text-gray-700 dark:text-gray-200" />
                </button>
              </div>

              {/* Navigation Links */}
              <motion.nav
                role="navigation"
                className="flex-1 px-6 py-4 space-y-1 overflow-y-auto"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navItems.map(({ label, path, icon }) => {
                  const isActive = location.pathname === path;

                  return (
                    <motion.div key={path} variants={itemVariants}>
                      <Link
                        to={path}
                        onClick={onClose}
                        className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-blue-600 text-white font-semibold dark:bg-blue-700 dark:text-white'
                            : 'text-gray-900 font-medium hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="mr-4 text-gray-700 dark:text-gray-100">{icon}</span>
                        {label}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Projects Section */}
                <motion.div variants={itemVariants}>
                  <div className="space-y-1">
                    {/* Projects Header */}
                    <button
                      onClick={() => setProjectsExpanded(!projectsExpanded)}
                      className={`w-full flex items-center justify-between px-6 py-3.5 rounded-lg text-base font-semibold transition-colors duration-200 ${
                        location.pathname.startsWith('/projects')
                          ? 'bg-blue-600/10 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300'
                          : 'text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white'
                      }`}
                      aria-expanded={projectsExpanded}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-600 dark:text-gray-300">
                          <FiCode aria-hidden="true" className="w-5 h-5" />
                        </span>
                        Projects
                      </div>
                      <motion.div
                        animate={{ rotate: projectsExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </motion.div>
                    </button>
                    
                    {/* Projects Dropdown */}
                    <AnimatePresence>
                      {projectsExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-8 pr-4 space-y-2 overflow-hidden"
                        >
                          {/* All Projects Link */}
                          <Link
                            to="/projects"
                            onClick={onClose}
                            className="flex items-center w-full px-6 py-3 text-base font-medium text-gray-800 transition-colors duration-150 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary/15 to-primary/25 rounded-lg flex items-center justify-center">
                                <FiFolder className="w-4 h-4 text-primary dark:text-primary-400" />
                              </div>
                              <div>
                                <div className="font-semibold group-hover:text-primary transition-colors text-gray-900 dark:text-gray-100">All Projects</div>
                                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{projects.length} projects</div>
                              </div>
                            </div>
                            <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                          </Link>
                          
                          {/* Featured Projects Header */}
                          <div className="px-4 py-3 -mx-2 my-2 bg-gray-50 dark:bg-gray-800/80 rounded-lg flex items-center space-x-2">
                            <FiStar className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                              Featured Projects
                            </span>
                          </div>
                          
                          {/* Featured Projects */}
                          {projects.filter(p => p.featured).slice(0, 3).map((project) => (
                            <Link
                              key={project.id}
                              to={`/projects/${project.id}`}
                              onClick={onClose}
                              className="block px-6 py-2.5 text-base font-medium text-gray-800 transition-colors duration-150 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-7 h-7 bg-gradient-to-br from-primary/15 to-primary/25 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FiCode className="w-3.5 h-3.5 text-primary dark:text-primary-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium group-hover:text-primary dark:group-hover:text-primary-300 transition-colors text-gray-900 dark:text-gray-100">
                                    <span className="truncate">{project.title}</span>
                                  </div>
                                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-0.5 truncate">
                                    {project.subtitle}
                                  </div>
                                  <div className="flex items-center mt-1 space-x-1">
                                    {project.technologies.slice(0, 2).map((tech) => (
                                      <span
                                        key={tech}
                                        className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded font-medium"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                    {project.technologies.length > 2 && (
                                      <span className="text-xs text-gray-400">
                                        +{project.technologies.length - 2}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <FiArrowRight className="w-3 h-3 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                              </div>
                            </Link>
                          ))}
                          
                          {/* View More Projects */}
                          {projects.length > projects.filter(p => p.featured).slice(0, 3).length && (
                            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                              <Link
                                to="/projects"
                                onClick={onClose}
                                className="flex items-center justify-center px-4 py-2.5 text-sm text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg transition-colors duration-200 group font-medium"
                              >
                                <span>View {projects.length - projects.filter(p => p.featured).slice(0, 3).length} more projects</span>
                                <FiArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.nav>

              {/* Newsletter Section */}
              <div className="border-t border-gray-200 dark:border-gray-800 overflow-hidden">
                <button
                  onClick={() => setIsNewsletterOpen(!isNewsletterOpen)}
                  className="w-full px-6 py-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                  aria-expanded={isNewsletterOpen}
                  aria-controls="newsletter-content"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <FiMail className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Stay Updated
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Get the latest updates and insights
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isNewsletterOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isNewsletterOpen && (
                    <motion.div
                      id="newsletter-content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { 
                          opacity: 1, 
                          height: 'auto',
                          transition: { 
                            opacity: { duration: 0.2 },
                            height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }
                          }
                        },
                        collapsed: { 
                          opacity: 0, 
                          height: 0,
                          transition: { 
                            opacity: { duration: 0.1 },
                            height: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }
                          }
                        }
                      }}
                      className="px-6 pb-4 -mt-2"
                    >
                      <div className="space-y-4 pt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Subscribe to my newsletter for the latest updates and insights.
                        </p>
                        <Newsletter className="w-full" compact />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
