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
        'backdrop-blur-md bg-white/10 dark:bg-gray-900/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden',
        'border border-white/30 dark:border-gray-600/70 hover:border-primary/70 group h-full flex flex-col',
        'transform hover:-translate-y-0.5 hover:scale-[1.01] transition-transform duration-200',
        className
      )}
      onClick={onClick}
    >
      <div 
        className="block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        role="button"
        tabIndex={0}
        aria-label={`View details for ${title} project`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
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
              alt={image.alt || `Screenshot of ${title} project`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width="400"
              height="300"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              aria-hidden={!image.alt}
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
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/15 text-primary dark:bg-primary/20 dark:text-primary-light px-2.5 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="bg-muted text-muted-foreground px-2.5 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium">
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
  id?: string;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onProjectClick,
  className = '',
  id,
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div id={id} className={cn('grid gap-6', className)}>
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