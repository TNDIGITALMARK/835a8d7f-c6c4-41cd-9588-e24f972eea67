export interface User {
  id: string;
  name: string;
  university: string;
  major: string;
  year: number;
  avatar: string;
  contributionCount: number;
  studyHours: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  uploadDate: Date;
  views: number;
  likes: number;
  subject: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  author: User;
  university: string;
  course: string;
  videoUrl: string;
  bookmarked?: boolean;
}

export interface StudyNote {
  id: string;
  videoId: string;
  userId: string;
  timestamp: number; // in seconds
  content: string;
  createdAt: Date;
  isPublic: boolean;
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  user: User;
  content: string;
  timestamp?: number; // optional timestamp for video-specific comments
  createdAt: Date;
  replies: Comment[];
  likes: number;
}

export interface StudySession {
  id: string;
  videoId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  progress: number; // percentage watched
  notes: StudyNote[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface FilterOptions {
  subject?: string;
  difficulty?: string;
  university?: string;
  duration?: 'short' | 'medium' | 'long'; // <10min, 10-30min, >30min
  sortBy?: 'recent' | 'popular' | 'trending';
}

export interface UploadVideo {
  title: string;
  description: string;
  subject: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  course: string;
  isPublic: boolean;
  file: File;
  thumbnail?: File;
}