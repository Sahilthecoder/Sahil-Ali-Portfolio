import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiArrowRight, FiFolder, FiCode, FiStar } from 'react-icons/fi';
import { projects } from '@/data/projects';

interface ProjectsDropdownProps {
  className?: string;
}

const ProjectsDropdown: React.FC<ProjectsDropdownProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Featured projects (limit to 3 for clean layout)
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);
  const totalProjects = projects.length;

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -8, 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -8 }
  };

  return (
    <div 
      className={`relative ${className}`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        className="flex items-center space-x-1 font-medium text-foreground/80 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Projects</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <FiChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-80 bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-2xl backdrop-blur-lg overflow-hidden z-50"
            style={{ 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Header - View All Projects */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <Link
                to="/projects"
                onClick={handleLinkClick}
                className="group flex items-center justify-between w-full text-left hover:text-primary transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                    <FiFolder className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      All Projects
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {totalProjects} projects
                    </div>
                  </div>
                </div>
                <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            {/* Featured Projects */}
            <div className="p-2">
              <div className="px-4 py-2 flex items-center space-x-2">
                <FiStar className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Featured Projects
                </span>
              </div>
              
              <div className="space-y-1">
                {featuredProjects.map((project, index) => (
                  <motion.div 
                    key={project.id} 
                    variants={itemVariants}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/projects/${project.id}`}
                      onClick={handleLinkClick}
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <FiCode className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors text-sm truncate">
                            {project.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                            {project.subtitle}
                          </div>
                          <div className="flex items-center mt-1.5 space-x-1">
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
                        <FiArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer - View More */}
            {totalProjects > featuredProjects.length && (
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800">
                <Link
                  to="/projects"
                  onClick={handleLinkClick}
                  className="text-sm text-primary hover:text-primary/80 font-medium flex items-center justify-center space-x-1 transition-colors group"
                >
                  <span>View {totalProjects - featuredProjects.length} more projects</span>
                  <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsDropdown;
