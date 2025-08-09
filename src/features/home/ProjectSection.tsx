'use client';

import React from 'react';
import projects from '../../data/projects';
import { Project } from '../../data/projects';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/AnimatedSection';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-border">
      <a
        href={project.links[0]?.url ?? '#'}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={`View details of project ${project.title}`}
        target="_blank"
        rel="noopener noreferrer"
      >
          <img
            src={project.image.src}
            alt={project.image.alt}
            className="w-full h-48 object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="p-5">
            <h3 className="text-xl font-semibold text-foreground mb-1">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-3 text-sm">{project.subtitle}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/10 text-primary-contrast px-2 py-1 rounded text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <time
              dateTime={project.date}
              className="text-xs text-muted-foreground"
            >
              {new Date(project.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
              })}
            </time>
          </div>
        </a>
    </article>
  );
};

const ProjectSection: React.FC = () => {
  // Show only featured projects on homepage
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 px-4 max-w-7xl mx-auto scroll-mt-16"
    >
      <div className="w-full mb-16 lg:mb-20">
        <SectionHeader
          title="Featured Projects"
          subtitle="Showcasing my best work and technical capabilities"
          className="text-left"
        />
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
