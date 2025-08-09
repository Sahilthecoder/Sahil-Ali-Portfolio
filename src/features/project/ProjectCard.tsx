import React from 'react';
import { cn } from '@/utils/cn';
import type { Project } from './types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, className }) => {
  const { title, subtitle, description, image, technologies = [], date } = project;

  return (
    <article 
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-border',
        'group h-full flex flex-col',
        className
      )}
      onClick={onClick}
    >
      <div 
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
          <picture>
            <source
              srcSet={`${image.src.replace(/\.(jpg|jpeg|png)$/, '.webp')} 1x,
                      ${image.src.replace(/\.(jpg|jpeg|png)$/, '@2x.webp')} 2x`}
              type="image/webp"
            />
            <source
              srcSet={`${image.src} 1x,
                      ${image.src.replace(/\.(jpg|jpeg|png)$/, '@2x$&')} 2x`}
              type={`image/${image.src.split('.').pop() === 'jpg' ? 'jpeg' : image.src.split('.').pop()}`}
            />
            <img
              src={image.src}
              alt={image.alt || `${title} preview`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width="400"
              height="300"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            />
          </picture>
        </div>
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-1.5">
            {title}
          </h3>
          {subtitle && (
            <p className="text-muted-foreground mb-2 sm:mb-3 text-xs sm:text-sm">
              {subtitle}
            </p>
          )}
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/10 text-primary-contrast/90 px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="bg-muted text-muted-foreground px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium">
                  +{technologies.length - 3}
                </span>
              )}
            </div>
          )}
          {date && (
            <time
              dateTime={date}
              className="text-xs text-muted-foreground"
            >
              {new Date(date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
              })}
            </time>
          )}
        </div>
      </div>
    </article>
  );
};

// ProjectList Component
export interface ProjectListProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  className?: string;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onProjectClick,
  className = '',
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {projects.map((project) => (
        <div key={project.id}>
          <ProjectCard
            project={project}
            onClick={() => onProjectClick(project)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;