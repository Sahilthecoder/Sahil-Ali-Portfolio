'use client';

import React, { useEffect, useState } from 'react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project?.image) setCurrentImageIndex(0);
  }, [project]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-5"
          style={{ perspective: '1200px' }}
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl sm:max-w-5xl max-h-[90vh] bg-background/95 backdrop-blur-lg rounded-lg sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-background/90 hover:bg-background/70 transition-colors shadow-md z-20"
              aria-label="Close modal"
            >
              <FiX className="h-6 w-6" />
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
              <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {/* Title & Subtitle */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold leading-snug">{project.title}</h2>
                  {project.subtitle && (
                    <p className="text-sm sm:text-base text-muted-foreground mt-1">
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
                  <h3 className="font-semibold text-base">Project Overview</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </section>

                {/* Highlights */}
                {project.highlights?.length > 0 && (
                  <section>
                    <h3 className="font-semibold text-base">Key Highlights</h3>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm sm:text-base">
                          <FaRegLightbulb className="mt-1 h-4 w-4 text-yellow-400 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Explore Button */}
                <div className="mt-auto">
                  <Link to={`/projects/${projectId}`}>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto hover:scale-105 transition-transform gap-2"
                    >
                      <FiExternalLink className="h-4 w-4" />
                      Explore Complete Project
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
