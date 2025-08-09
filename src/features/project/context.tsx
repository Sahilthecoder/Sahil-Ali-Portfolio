import React, { createContext, useContext, useState, useMemo } from 'react';
import { Project } from './types';

interface ProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: React.ReactNode;
  initialProjects: Project[];
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children, initialProjects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const value = {
    projects: initialProjects,
    selectedProject,
    setSelectedProject,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
