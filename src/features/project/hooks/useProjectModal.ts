import { useCallback, useState } from 'react';

import type { Project } from '../types';

export const useProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    // Small delay to allow the modal close animation to complete
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  return {
    isOpen,
    selectedProject,
    openModal,
    closeModal,
  };
};
