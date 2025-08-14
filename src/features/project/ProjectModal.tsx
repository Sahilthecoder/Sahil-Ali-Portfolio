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
  const baseUrl = process.env.NODE_ENV === 'production' ? '/Sahil-Ali-Portfolio' : '';
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Project Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-100 dark:bg-gray-800">
            {project.image && (
              <img
                src={project.image.src}
                alt={project.image.alt || `${project.title} screenshot`}
                width={800}
                height={450}
                className="rounded-lg object-cover w-full h-full"
                loading="lazy"
              />
            )}
          </div>

          {/* Project Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaRegLightbulb className="mr-2" /> Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 [&_button:focus-visible]:outline [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-primary [&_button:focus-visible]:outline-offset-2">
              {project.liveUrl && (
                <Button
                  variant="primary"
                  className="flex-1 sm:flex-none py-3 px-6 rounded-lg bg-primary hover:bg-primary/90 transition-colors duration-200 text-white font-medium text-lg"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Live Demo <FiExternalLink />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    View Code <FiExternalLink />
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                className="flex-1 sm:flex-none border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60 hover:text-primary/90 transition-colors duration-200 group relative overflow-hidden"
                onClick={() => {
                  onClose();
                  navigate(`${baseUrl}/#/projects/${project.id}`);
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Full Project
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export { ProjectModal };
export default ProjectModal;