import React, { Suspense, lazy, useCallback } from 'react';
import { ProjectProvider } from '@/features/project/context';
import { projects as projectData } from '@/data/projects';
import { useProjectFilters } from '@/features/project/hooks/useProjectFilters';

// Base URL for GitHub Pages deployment
const baseUrl = process.env.NODE_ENV === 'production' ? '/Sahil-Ali-Portfolio' : '';

import { SectionHeader } from '@/components/ui/AnimatedSection';
import { ProjectList } from '@/features/project/ProjectCard';
import ProjectFilters from '@/features/project/ProjectFilters';

// Lazy load large components for better performance
const ProjectHero = lazy(() => import('@/features/project/ProjectHero'));

interface ProjectPageProps {
  className?: string;
}

export const Projects: React.FC<ProjectPageProps> = ({ className }) => {
  const {
    search,
    setSearch,
    selectedTags,
    setSelectedTags,
    sort,
    setSort,
    allTechnologies,
    filteredProjects,
    clearFilters,
  } = useProjectFilters(projectData);

  const handleSortChange = useCallback(
    (value: string) => setSort(value as 'newest' | 'oldest' | 'name'),
    [setSort]
  );

  return (
    <ProjectProvider initialProjects={projectData}>
      <div className={className}>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <ProjectHero />

          <main className="container mx-auto px-4 py-10 sm:py-14 space-y-10">
            {/* Header & Filters */}
            <div id="projects" className="scroll-mt-20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <SectionHeader
                  title="My Projects"
                  subtitle="A curated selection of my professional work, showcasing skills, creativity, and impact."
                  className="mb-0"
                />
                <ProjectFilters
                  tags={allTechnologies}
                  selectedTags={selectedTags}
                  onTagToggle={(tag) =>
                    setSelectedTags((prev) =>
                      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                    )
                  }
                  search={search}
                  onSearchChange={setSearch}
                  sort={sort}
                  onSortChange={handleSortChange}
                  onClearFilters={clearFilters}
                  className="w-full md:w-auto"
                />
              </div>

              {/* Project Grid */}
              <ProjectList
                id="projects-grid"
                projects={filteredProjects}
                onProjectClick={(project) => {
                  // Navigate to the project details page with base URL for GitHub Pages
                  window.location.href = `${baseUrl}/#/projects/${project.id}`;
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              />
            </div>
          </main>
        </Suspense>
      </div>
    </ProjectProvider>
  );
};

export default Projects;
