import type { Project } from '../types';

/**
 * Finds a project by its slug
 */
export const getProjectBySlug = (projects: Project[], slug: string): Project | undefined => {
  return projects.find(project => project.id === slug);
};

/**
 * Formats a date string into a more readable format
 */
export const formatProjectDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

/**
 * Filters projects by a specific skill
 */
export function filterProjectsBySkill(projects: Project[], skill: string): Project[] {
  if (!skill) return projects;

  return projects.filter((project) =>
    project.technologies.some((tech) => tech.toLowerCase().includes(skill.toLowerCase()))
  );
}

/**
 * Sorts projects by date (newest first by default)
 */
export function sortProjectsByDate(projects: Project[], order: 'newest' | 'oldest' = 'newest'): Project[] {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'newest' ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Filters projects by search query
 */
export function filterProjectsByQuery(projects: Project[], query: string): Project[] {
  if (!query.trim()) return projects;
  
  const searchTerm = query.toLowerCase().trim();
  
  return projects.filter((project) => {
    return (
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
    );
  });
}

/**
 * Gets all unique tags from projects
 */
export function getAllTags(projects: Project[]): string[] {
  const tags = new Set<string>();
  
  projects.forEach(project => {
    project.technologies.forEach(tag => {
      if (tag) {
        tags.add(tag);
      }
    });
  });
  
  return Array.from(tags).sort();
}
