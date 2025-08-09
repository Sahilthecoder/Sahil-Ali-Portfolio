export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectFilters {
  searchTerm: string;
  tags: string[];
  sortBy: 'newest' | 'oldest' | 'title';
}

import type { ReactNode } from 'react';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: ReactNode; // Can be string or ReactNode
  solution: string;
  challenge: string;
  highlights: string[];
  image: ProjectImage;
  links: ProjectLink[];
  technologies: string[];
  date: string;
  featured?: boolean;
  tags?: string[];
  gallery?: ProjectImage[];
  metrics?: { label: string; value: string }[];
}

export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  className?: string;
}
