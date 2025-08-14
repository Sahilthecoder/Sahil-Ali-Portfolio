import React from 'react';
import { FiBarChart2, FiCalendar, FiCode, FiExternalLink, FiImage, FiTag, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/LazyImage';

import type { Project } from '../../data/projects';
import { projects } from '../../data/projects';

// Define formatDate function directly in the file
const formatDate = (
  dateString: string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

interface ProjectTemplateProps {
  project: Project;
  currentIndex: number;
  totalProjects: number;
  customContent?: {
    overview?: React.ReactNode;
    sections?: Array<{
      title: string;
      content: React.ReactNode;
    }>;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
  };
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({
  project,
  currentIndex,
  totalProjects,
  customContent,
}) => {
  // Project ID is available in the project prop

  const getNextProject = () => {
    const nextIndex = (currentIndex + 1) % totalProjects;
    return projects[nextIndex];
  };

  const getPrevProject = () => {
    const prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    return projects[prevIndex];
  };

  // Image gallery state
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number | null>(null);
  
  const openImage = (index: number) => setSelectedImageIndex(index);
  const closeImage = () => setSelectedImageIndex(null);
  
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    const totalImages = customContent?.images?.length || 0;
    if (totalImages === 0) return;
    
    setSelectedImageIndex(prev => {
      if (prev === null) return null;
      if (direction === 'prev') return (prev - 1 + totalImages) % totalImages;
      return (prev + 1) % totalImages;
    });
  };
  
  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImage();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
  

     {/* Hero Section */}
<section className="relative py-16">
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto relative overflow-hidden group rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-2xl transition-all duration-500 hover:shadow-primary/30 hover:shadow-3xl">

      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Decorative floating shapes */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent/10 blur-3xl rounded-full animate-pulse delay-150" />

      {/* Top + side gradient lines */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-accent to-transparent animate-gradient" />
      <div className="absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-primary via-accent to-transparent animate-gradient" />

      <div className="relative z-10 text-center p-8 md:p-14">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-text">
          {project.title}
        </h1>

        {/* Accent underline */}
        <div className="w-28 h-[3px] mx-auto mb-6 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-pulse" />

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          {project.subtitle}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-muted-foreground">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-primary" />
            {formatDate(project.date, 'en-US', { year: 'numeric', month: 'long' })}
          </div>
          <div className="flex items-center gap-2">
            <FiTag className="text-accent" />
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Project image */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border/40 shadow-xl group/image">
          <LazyImage
            src={project.image.src}
            alt={project.image.alt || project.title}
            className="w-full h-auto max-h-[70vh] object-contain transition-transform duration-700 group-hover/image:scale-105"
          />
          {/* Spotlight glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Project Content */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Overview Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Project Overview
              </h2>
              {customContent?.overview || (
                <div className="prose max-w-none">
                  <p className="text-lg text-foreground/90 mb-6">
                    {project.description}
                  </p>

                  {project.highlights && project.highlights.length > 0 && (
                    <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r mb-8">
                      <h3 className="font-semibold text-primary mb-2">
                        Key Highlights
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="text-foreground/90">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Problem & Solution */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-center mb-4">
                  <div className="bg-destructive/10 p-2 rounded-full mr-3">
                    <FiBarChart2 className="text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold">The Challenge</h3>
                </div>
                <p className="text-foreground/90">
                  {project.challenge ||
                    'Add challenge details here. What problem were you trying to solve?'}
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FiCode className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">The Solution</h3>
                </div>
                <p className="text-foreground/90">
                  {project.solution ||
                    'Describe your solution approach and implementation details here.'}
                </p>
              </div>
            </div>

            {/* Custom Sections */}
            {customContent?.sections?.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="prose max-w-none">{section.content}</div>
              </div>
            ))}

            {/* Image Gallery */}
            {customContent?.images && customContent.images.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customContent.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="group cursor-pointer"
                      onClick={() => openImage(index)}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-md transition-transform duration-300 group-hover:shadow-xl">
                        <img
                          src={image.src}
                          alt={image.alt || `Screenshot of ${project.title} project`}
                          className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          width="800"
                          height="600"
                          decoding="async"
                          aria-describedby={image.caption ? `caption-${index}` : undefined}
                        />
                        {image.caption && (
                          <div id={`caption-${index}`} className="sr-only">
                            {image.caption}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-card-foreground">
                            <div className="flex items-center text-sm mb-1">
                              <FiImage className="mr-1" />
                              <span>Click to enlarge</span>
                            </div>
                            {image.caption && (
                              <p className="text-sm text-card-foreground/90">{image.caption}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Image Modal */}
                {selectedImageIndex !== null && customContent?.images && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                    <button 
                      onClick={closeImage}
                      className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                      aria-label="Close"
                    >
                      <FiX size={28} />
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage('prev');
                      }}
                      className="absolute left-4 md:left-8 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                      aria-label="Previous image"
                    >
                      <FiChevronLeft size={32} />
                    </button>
                    
                    <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
                      <img
                        src={customContent.images[selectedImageIndex].src}
                        alt={customContent.images[selectedImageIndex].alt}
                        className="max-w-full max-h-[80vh] object-contain rounded-lg"
                      />
                      {customContent.images[selectedImageIndex].caption && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm max-w-[90%] text-center">
                          {customContent.images[selectedImageIndex].caption}
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage('next');
                      }}
                      className="absolute right-4 md:right-8 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                      aria-label="Next image"
                    >
                      <FiChevronRight size={32} />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                      {selectedImageIndex + 1} / {customContent.images.length}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Project Links */}
            {project.links && project.links.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Project Links
                </h3>
                <div className="flex flex-wrap gap-4">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    >
                      {link.label}
                      <FiExternalLink className="ml-2" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {currentIndex > 0 &&
                (() => {
                  const prevProject = getPrevProject();
                  return prevProject ? (
                    <Link
                      to={`/projects/${prevProject.id}`}
                      className="group flex-1 p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-border"
                    >
                      <div className="text-sm text-muted-foreground mb-1">
                        Previous Project
                      </div>
                      <div className="font-medium text-primary group-hover:text-primary/80 transition-colors">
                        {prevProject.title}
                      </div>
                    </Link>
                  ) : null;
                })()}
              {currentIndex < totalProjects - 1 &&
                (() => {
                  const nextProject = getNextProject();
                  return nextProject ? (
                    <Link
                      to={`/projects/${nextProject.id}`}
                      className="group flex-1 p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-border text-right"
                    >
                      <div className="text-sm text-muted-foreground mb-1">
                        Next Project
                      </div>
                      <div className="font-medium text-primary group-hover:text-primary/80 transition-colors">
                        {nextProject.title}
                      </div>
                    </Link>
                  ) : null;
                })()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectTemplate;
