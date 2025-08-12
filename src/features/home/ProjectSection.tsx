'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import projects from '../../data/projects';
import { Project } from '../../data/projects';
import { SectionHeader } from '@/components/ui/AnimatedSection';

// Base URL for GitHub Pages deployment
const baseUrl = process.env.NODE_ENV === 'production' ? '/Sahil_Ali-Portfolio' : '';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm sm:shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-border h-full flex flex-col">
      <a
        href={`${baseUrl}/#/projects/${project.id}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={`View details of project ${project.title}`}
      >
          <img
            src={project.image.src}
            alt={project.image.alt}
            className="w-full h-40 sm:h-48 object-cover"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
          <div className="p-5 sm:p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">{project.subtitle}</p>
            <p className="text-base text-gray-800 dark:text-gray-200 mb-4 line-clamp-3 flex-grow leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/15 text-primary dark:bg-primary/20 dark:text-primary-light px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>
            <time
              dateTime={project.date}
              className="text-sm text-gray-600 dark:text-gray-400"
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
  // Show only top 3 featured projects on homepage
  const featuredProjects = projects
    .filter((p) => p.featured)
    .slice(0, 3); // Limit to 3 projects

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-16"
    >
      <div className="w-full mb-12 sm:mb-16 lg:mb-20">
        <SectionHeader
          title="Featured Projects"
          subtitle="Showcasing my best work and technical capabilities"
          className="text-left"
        />
      </div>

      <div className="md:hidden">
        <Swiper
          modules={[Pagination, A11y]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index, className) {
              return `<span class="${className}" role="button" aria-label="Go to project ${index + 1}" tabindex="0"></span>`;
            }
          }}
          className="pb-16 px-1"
          style={{
            '--swiper-pagination-bullet-size': '12px',
            '--swiper-pagination-bullet-horizontal-gap': '8px',
            '--swiper-pagination-bullet-inactive-color': '#9CA3AF',
            '--swiper-pagination-bullet-inactive-opacity': '0.8',
            '--swiper-pagination-color': '#3B82F6',
            '--swiper-pagination-bullet-width': '24px',
            '--swiper-pagination-bullet-height': '6px',
            '--swiper-pagination-bullet-border-radius': '3px'
          } as React.CSSProperties}
        >
          {featuredProjects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="h-full px-2 py-1">
                <ProjectCard project={project} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <div className="hidden md:grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
