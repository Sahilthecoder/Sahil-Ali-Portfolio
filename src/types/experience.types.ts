export interface Education {
  id: string;
  institution: string;
  institutionUrl?: string;
  period: string;
  fieldOfStudy: string;
  imageUrl: string;
  description: string[];
  degree?: string;
  location?: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  logo?: string;
  period: string;
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
  location?: string;
  description: string[];
  achievements?: string[];
  technologies: string[];
  imageUrl?: string;
  skills?: string[];
}

export interface Certification extends Omit<Education, 'degree'> {
  credentialUrl?: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon: string;
  iconClass?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl?: string;
  featured?: boolean;
}
