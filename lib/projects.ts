import projectsData from '@/content/projects.json';

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  url?: string;
  github?: string;
  tags: string[];
  status?: 'active' | 'archived' | 'in-progress';
  highlight?: boolean;
}

export function getAllProjects(): Project[] {
  return (projectsData.projects ?? []) as Project[];
}
