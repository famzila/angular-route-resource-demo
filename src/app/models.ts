export interface Project {
  id: string;
  user: string;
  status: 'in_review' | 'done' | 'failed';
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  type: string;
  name: string;
}

export interface LoaderOptions {
  signal?: AbortSignal;
}

export interface CategoryResult {
  category: string;
  items: string[];
}

export interface SortResult {
  sort: string;
  items: string[];
}
