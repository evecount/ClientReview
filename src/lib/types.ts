
export type AssetType = 'image' | 'video';
export type AssetStatus = 'Pending Review' | 'Approved';

export interface FeedbackLog {
  id: string;
  author: string;
  comment: string;
  timestamp: string;
  x?: number; // percentage for image
  y?: number; // percentage for image
  videoTime?: number; // seconds for video
}

export interface Asset {
  id: string;
  type: AssetType;
  url: string;
  name: string;
  status: AssetStatus;
  feedback: FeedbackLog[];
}

export interface Project {
  id: string;
  name: string;
  studioId: string;
  password?: string;
  assets: Asset[];
  createdAt: string;
}

export interface Studio {
  id: string;
  name: string;
  logo?: string;
  projects: Project[];
}
