import React from 'react';
import { useParams } from 'react-router-dom';

import type { Project } from '../../data/projects';
import { projects } from '../../data/projects';
import NotFound from '../NotFound';

// Define the props type for project components
type ProjectComponentProps = {
  project: Project;
  currentIndex: number;
  totalProjects: number;
};

// Map project IDs to their corresponding component file names (without .tsx)
const projectComponentMap: { [key: string]: string } = {
  'zomato-dashboard': 'ZomatoAnalysis',
  'bansal-dashboard': 'BansalSupermarket',
  'ekam-attendance': 'EkamAttendance',
  'powerbi-cashflow': 'RetailCashFlow',
  'gpt-automation': 'SmartAutomation', // Updated to match the actual file name
  'portfolio-creation': 'PortfolioCreation',
};

const ProjectDetails: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const [ProjectComponent, setProjectComponent] =
    React.useState<React.ComponentType<ProjectComponentProps> | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProject = async () => {
      if (!projectId) {
        setError(new Error('No project ID provided'));
        setIsLoading(false);
        return;
      }

      const project = projects.find((p) => p.id === projectId);
      if (!project) {
        setError(new Error('Project not found'));
        setIsLoading(false);
        return;
      }

      const componentName = projectComponentMap[projectId];
      if (!componentName) {
        setError(new Error('No valid component found for this project'));
        setIsLoading(false);
        return;
      }

      try {
        // Use a switch statement to explicitly import each component
        let ProjectComponentModule;

        switch (componentName) {
          case 'ZomatoAnalysis':
            ProjectComponentModule = await import('./ZomatoAnalysis');
            break;
          case 'BansalSupermarket':
            ProjectComponentModule = await import('./BansalSupermarket');
            break;
          case 'EkamAttendance':
            ProjectComponentModule = await import('./EkamAttendance');
            break;
          case 'RetailCashFlow':
            ProjectComponentModule = await import('./RetailCashFlow');
            break;
          case 'SmartAutomation':
            ProjectComponentModule = await import('./SmartAutomation');
            break;
          case 'PortfolioCreation':
            ProjectComponentModule = await import('./PortfolioCreation');
            break;
          default:
            throw new Error(`No component found for ${componentName}`);
        }

        // Check if the module has a default export
        if (!ProjectComponentModule?.default) {
          throw new Error(`Component ${componentName} has no default export`);
        }

        // Set the component if all checks pass
        setProjectComponent(() => ProjectComponentModule.default);
      } catch (err) {
        console.error(`Failed to load project component: ${componentName}`, err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-foreground/10 dark:bg-dark-foreground/10 mb-4"></div>
          <p className="text-foreground/80 dark:text-dark-text-secondary">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <NotFound />;
  }

  if (!ProjectComponent) {
    return <NotFound />;
  }

  const project = projects.find((p) => p.id === projectId);
  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const totalProjects = projects.length;

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-foreground dark:text-dark-foreground">
      <ProjectComponent
        project={project}
        currentIndex={currentIndex}
        totalProjects={totalProjects}
      />
    </div>
  );
};

export default ProjectDetails;
