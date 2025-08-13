'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegLightbulb } from 'react-icons/fa';
import { FiExternalLink, FiX, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { usePasswordProtection } from '@/contexts/PasswordProtectionContext';
import { Button } from '@/components/ui/Button';
import { PasswordModal } from '@/components/ui/PasswordModal';
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
  const { isAuthenticated, verifyPassword } = usePasswordProtection();
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);
  // Debug logging
  React.useEffect(() => {
    console.log('ProjectModal - Project ID:', projectId);
    console.log('ProjectModal - Project Title:', project?.title);
    console.log('ProjectModal - isAuthenticated:', isAuthenticated);
  }, [projectId, project, isAuthenticated]);

  // Check if the project is the portfolio project (case-insensitive and handles different formats)
  const [isPortfolioProject] = React.useState(
    projectId?.toLowerCase().includes('portfolio') || 
    project?.title?.toLowerCase().includes('portfolio')
  );
  const shouldLock = isPortfolioProject && !isAuthenticated;
  
  // Log the lock state
  React.useEffect(() => {
    console.log('ProjectModal - isPortfolioProject:', isPortfolioProject);
    console.log('ProjectModal - shouldLock:', shouldLock);
  }, [isPortfolioProject, shouldLock]);

  // Detect RTL mode
  const isRTL = typeof document !== 'undefined' && document?.dir === 'rtl';

  const handleExploreClick = (e: React.MouseEvent) => {
    if (shouldLock) {
      e.preventDefault();
      // Store the target URL in session storage before showing the password modal
      sessionStorage.setItem('redirectAfterAuth', `/projects/${projectId}`);
      setShowPasswordModal(true);
    } else {
      // If not locked, navigate directly
      window.location.href = `/#/projects/${projectId}`;
    }
  };

  const handlePasswordVerify = (password: string) => {
    const isVerified = verifyPassword(password);
    if (isVerified) {
      setShowPasswordModal(false);
      // Force a full page reload to ensure the authentication state is properly set
      // and the project loads with the correct permissions
      window.location.href = `/#/projects/${projectId}`;
      // Small delay to ensure the hash is set after the page starts reloading
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
    return isVerified;
  };

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/50 dark:bg-black/80 backdrop-blur-lg"
          onClick={onClose}
        >
          <motion.div
            className="relative w-[98vw] max-w-7xl max-h-[95vh] bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border-2 border-white/40 dark:border-gray-700/50"
            style={{
              direction: isRTL ? 'rtl' : 'ltr',
              width: '98vw',
              maxWidth: 'min(95vw, 2000px)',
              margin: '1vh auto'
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2.5 rounded-full bg-white/60 hover:bg-white/80 dark:bg-gray-800/90 dark:hover:bg-gray-700/90 transition-all duration-200 shadow-lg z-20 backdrop-blur-md border border-white/30 dark:border-gray-600/50 hover:scale-110`}
              aria-label="Close modal"
            >
              <FiX className="h-5 w-5" />
            </button>

            {/* Content Layout */}
            <div className={`flex flex-col ${isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'} h-full overflow-y-auto`}>
              
              {/* Image Section */}
              <div className="relative w-full lg:w-1/2 overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-0">
                <motion.img
                  key={project.image.src}
                  src={project.image.src}
                  alt={project.image.alt || project.title}
                  className="w-full h-full max-h-[90vh] object-cover"
                  style={{
                    objectPosition: isRTL ? 'right center' : 'left center',
                    width: '100%',
                    height: '100%',
                    minHeight: '300px',
                    maxHeight: '90vh',
                    objectFit: 'cover'
                  }}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
              </div>

              {/* Details Section */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto min-w-0">
                <div className="space-y-6">
                  
                  {/* Title */}
                  <div>
                    <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
                      {project.title}
                    </h2>
                    {project.subtitle && (
                      <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
                        {project.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Technologies */}
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 -mx-1 px-1">
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
                    <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
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
                            className="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-base"
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
                    <Link 
                      to={!shouldLock ? `/projects/${projectId}` : '#'}
                      onClick={handleExploreClick}
                      className={`inline-block w-full sm:w-auto ${shouldLock ? 'opacity-70' : ''}`}
                    >
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto hover:scale-105 transition-transform gap-2 bg-white/70 hover:bg-white/90 text-gray-900 dark:bg-gray-800/80 dark:hover:bg-gray-700/90 dark:text-white border border-gray-300/50 dark:border-gray-600/50 shadow-md hover:shadow-lg relative"
                      >
                        {shouldLock && (
                          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 text-white rounded-md">
                            <FiLock className="h-4 w-4" />
                            <span>Locked</span>
                          </div> 
                        )}
                        <FiExternalLink className="h-4 w-4" />
                        {!shouldLock ? 'Explore Complete Project' : 'Project Locked'}
                      </Button>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onVerify={handlePasswordVerify}
      />
    </AnimatePresence>
  );
}
