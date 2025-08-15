'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegLightbulb } from 'react-icons/fa';
import { FiExternalLink, FiX } from 'react-icons/fi';
// Using standard img tag instead of Next.js Image
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface ProjectImage {
  src: string;
  alt?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    image: ProjectImage;
    liveUrl?: string;
    githubUrl?: string;
  };
  projectId: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ 
  isOpen, 
  onClose, 
  project 
}) => {
  const navigate = useNavigate();
  // No need for baseUrl with HashRouter
  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Mobile: Full screen modal */}
        <div className="md:hidden h-full w-full overflow-y-auto">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="min-h-full w-full bg-white dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Close Button */}
            <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-md"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>
              <div className="pt-4 pb-3 px-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white pr-12 leading-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Mobile Content */}
            <div className="pb-6">
              {/* Project Image */}
              <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                {project.image && (
                  <img
                    src={project.image.src}
                    alt={project.image.alt || `${project.title} screenshot`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </div>

              {/* Mobile Project Content */}
              <div className="p-4 space-y-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Technologies */}
                <div>
                  <h3 className="text-base font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                    <FaRegLightbulb className="mr-2 text-primary" /> Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 text-blue-700 dark:text-blue-200 text-xs rounded-full font-medium border border-blue-200/50 dark:border-blue-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile Action Buttons */}
                <div className="space-y-3 pt-4">
                  {project.liveUrl && (
                    <Button
                      variant="primary"
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-300 text-white font-medium text-sm shadow-lg active:scale-95"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Live Demo <FiExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      className="w-full py-3 px-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 font-medium text-sm active:scale-95"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        View Code <FiExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full py-3 px-6 rounded-lg border-2 border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60 hover:text-primary/90 transition-all duration-300 group relative overflow-hidden font-medium text-sm active:scale-95"
                    onClick={() => {
                      onClose();
                      navigate(`/projects/${project.id}`);
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Complete Project
                      <motion.span
                        className="inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        →
                      </motion.span>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop: Centered modal */}
        <div className="hidden md:flex items-start justify-center min-h-full p-4 pt-16 pb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 z-20 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-600/50"
            aria-label="Close modal"
          >
            <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-full">
            {/* Project Image */}
            <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex-shrink-0">
              {project.image && (
                <img
                  src={project.image.src}
                  alt={project.image.alt || `${project.title} screenshot`}
                  width={800}
                  height={450}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              )}
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            </div>

            {/* Project Content */}
            <div className="p-4 sm:p-6 md:p-8 flex-grow">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">
                {project.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                  <FaRegLightbulb className="mr-2 text-primary" /> Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 text-blue-700 dark:text-blue-200 text-xs sm:text-sm rounded-full font-medium border border-blue-200/50 dark:border-blue-700/50 hover:scale-105 transition-transform duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8 [&_button:focus-visible]:outline [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-primary [&_button:focus-visible]:outline-offset-2">
                {project.liveUrl && (
                  <Button
                    variant="primary"
                    className="w-full sm:flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-300 text-white font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Live Demo <FiExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    className="w-full sm:flex-1 py-3 px-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 font-medium text-sm sm:text-base transform hover:-translate-y-0.5"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      View Code <FiExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full sm:flex-1 py-3 px-6 rounded-lg border-2 border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60 hover:text-primary/90 transition-all duration-300 group relative overflow-hidden font-medium text-sm sm:text-base transform hover:-translate-y-0.5"
                  onClick={() => {
                    onClose();
                    navigate(`/projects/${project.id}`);
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Complete Project
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      →
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export { ProjectModal };
export default ProjectModal;
