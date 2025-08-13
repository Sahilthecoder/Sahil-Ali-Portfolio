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

export interface ProjectImageItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface MetricItem {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: ProjectImage;
  tags: string[];
  links: ProjectLink[];
  technologies: string[];
  date: string;
  role?: string;
  solution?: string;
  challenge?: string;
  gallery?: ProjectImageItem[];
  metrics?: MetricItem[];
  featured?: boolean;
}
