'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegLightbulb } from 'react-icons/fa';
import { FiExternalLink, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { TechnologyBadge } from './TechnologyBadge';
import type { Project } from './types';

interface ProjectModalProps {
  isOpen: boolean;
  project: Project;
  onClose: () => void;
  projectId: string;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 16 }
  },
  exit: { opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.25 } }
};

export default function ProjectModal({
  isOpen,
  project,
  onClose,
  projectId
}: ProjectModalProps) {
  // Commenting out unused state for future image gallery functionality
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // useEffect(() => {
  //   if (project?.image) setCurrentImageIndex(0);
  // }, [project]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] bg-white/10 dark:bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20 dark:border-gray-700/50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/30 dark:bg-gray-800/80 dark:hover:bg-gray-700/80 transition-colors shadow-lg z-20 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <FiX className="h-5 w-5" />
            </button>

            {/* Content Layout */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 h-full overflow-y-auto">
              {/* Left - Image */}
              <div className="relative w-full h-56 sm:h-72 lg:h-full">
                <motion.img
                  key={project.image.src}
                  src={project.image.src}
                  alt={project.image.alt || project.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Right - Details */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                <div className="space-y-6">
                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                      {project.title}
                    </h2>
                    {project.subtitle && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        {project.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Technologies */}
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <TechnologyBadge key={tech} name={tech} />
                      ))}
                    </div>
                  )}

                  {/* Overview */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Project Overview
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </section>

                  {/* Highlights */}
                  {project.highlights?.length > 0 && (
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Key Highlights
                      </h3>
                      <ul className="space-y-3">
                        {project.highlights.map((highlight, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm"
                          >
                            <FaRegLightbulb className="mt-0.5 h-4 w-4 text-yellow-400 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Explore Button */}
                  <div className="pt-4">
                    <Link to={`/projects/${projectId}`}>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto hover:scale-105 transition-transform gap-2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 border-white/20 dark:border-gray-700/50"
                      >
                        <FiExternalLink className="h-4 w-4" />
                        Explore Complete Project
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
