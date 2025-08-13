import { useState, useMemo } from 'react';
import type { Project } from '../types';

export const useProjectFilters = (projects: Project[]) => {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<'newest' | 'oldest' | 'name'>('newest');

  // Get all unique technologies for filters
  const allTechnologies = useMemo(
    () => {
      const techs = projects.flatMap(project => project.technologies || []);
      return [...new Set(techs)].filter(Boolean).sort();
    },
    [projects]
  );

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          (project.technologies || []).some(tech =>
            tech.toLowerCase().includes(searchLower)
          )
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter((project) =>
        selectedTags.every(tag => (project.technologies || []).includes(tag))
      );
    }

    // Sort projects
    result.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [projects, search, selectedTags, sort]);

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setSort('newest');
  };

  return {
    search,
    setSearch,
    selectedTags,
    setSelectedTags,
    sort,
    setSort,
    allTechnologies,
    filteredProjects,
    clearFilters,
  };
};
