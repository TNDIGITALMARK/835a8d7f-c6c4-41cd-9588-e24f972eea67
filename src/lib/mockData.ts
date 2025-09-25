import { User, Video, Badge, Category, StudyNote, Comment } from '@/types/studyshare';

// Mock Users with exact personas specified
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    university: 'Stanford University',
    major: 'Computer Science',
    year: 3,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b02e0e5e?w=150&h=150&fit=crop&crop=face',
    contributionCount: 23,
    studyHours: 245,
    badges: [
      {
        id: 'badge-1',
        name: 'Star Contributor',
        description: 'Contributed 20+ educational videos',
        icon: '⭐',
        earnedAt: new Date('2024-01-15')
      },
      {
        id: 'badge-2',
        name: 'Top Educator',
        description: 'Videos have 10k+ total views',
        icon: '🏆',
        earnedAt: new Date('2024-03-20')
      }
    ]
  },
  {
    id: 'user-2',
    name: 'Marcus Johnson',
    university: 'MIT',
    major: 'Mechanical Engineering',
    year: 4,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    contributionCount: 18,
    studyHours: 189,
    badges: [
      {
        id: 'badge-3',
        name: 'Rising Star',
        description: 'Rapid growth in contribution quality',
        icon: '🌟',
        earnedAt: new Date('2024-02-10')
      }
    ]
  },
  {
    id: 'user-3',
    name: 'Priya Patel',
    university: 'UC Berkeley',
    major: 'Mathematics',
    year: 2,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    contributionCount: 31,
    studyHours: 312,
    badges: [
      {
        id: 'badge-4',
        name: 'Star Contributor',
        description: 'Contributed 20+ educational videos',
        icon: '⭐',
        earnedAt: new Date('2024-01-08')
      },
      {
        id: 'badge-5',
        name: 'Math Wizard',
        description: 'Expert in mathematical concepts',
        icon: '🧮',
        earnedAt: new Date('2024-04-15')
      }
    ]
  },
  {
    id: 'user-4',
    name: 'Alex Rivera',
    university: 'Harvard University',
    major: 'Physics',
    year: 3,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    contributionCount: 15,
    studyHours: 178,
    badges: [
      {
        id: 'badge-6',
        name: 'Physics Pro',
        description: 'Advanced physics content creator',
        icon: '⚛️',
        earnedAt: new Date('2024-03-05')
      }
    ]
  },
  {
    id: 'user-5',
    name: 'Emma Thompson',
    university: 'Yale University',
    major: 'Chemistry',
    year: 4,
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    contributionCount: 22,
    studyHours: 267,
    badges: [
      {
        id: 'badge-7',
        name: 'Chemistry Champion',
        description: 'Excellence in chemistry education',
        icon: '🧪',
        earnedAt: new Date('2024-02-28')
      }
    ]
  }
];

// Mock Categories based on design reference
export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Mathematics', icon: '📐', color: '#3B82F6', count: 156 },
  { id: 'cat-2', name: 'Physics', icon: '⚛️', color: '#8B5CF6', count: 89 },
  { id: 'cat-3', name: 'Chemistry', icon: '🧪', color: '#10B981', count: 74 },
  { id: 'cat-4', name: 'Biology', icon: '🧬', color: '#F59E0B', count: 92 },
  { id: 'cat-5', name: 'Computer Science', icon: '💻', color: '#EF4444', count: 203 },
  { id: 'cat-6', name: 'Engineering', icon: '⚙️', color: '#6B7280', count: 127 },
  { id: 'cat-7', name: 'Economics', icon: '📊', color: '#14B8A6', count: 45 },
  { id: 'cat-8', name: 'Psychology', icon: '🧠', color: '#F97316', count: 38 }
];

// Mock Videos with academic content
export const mockVideos: Video[] = [
  {
    id: 'video-1',
    title: 'Calculus Integration Explained',
    description: 'Understanding the fundamentals of calculus integration with step-by-step examples. Perfect for beginners who want to grasp the core concepts.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=225&fit=crop',
    duration: 1247, // 20:47
    uploadDate: new Date('2024-09-20'),
    views: 15420,
    likes: 892,
    subject: 'Mathematics',
    topic: 'Calculus Integration',
    difficulty: 'Intermediate',
    tags: ['calculus', 'integration', 'math', 'fundamentals'],
    author: mockUsers[2], // Priya Patel
    university: 'UC Berkeley',
    course: 'MATH 1B',
    videoUrl: 'https://example.com/video1.mp4',
    bookmarked: false
  },
  {
    id: 'video-2',
    title: 'Chemistry Lab Techniques',
    description: 'Essential laboratory techniques every chemistry student should master. Covers safety protocols, measurement precision, and common procedures.',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=225&fit=crop',
    duration: 934, // 15:34
    uploadDate: new Date('2024-09-18'),
    views: 8934,
    likes: 567,
    subject: 'Chemistry',
    topic: 'Lab Techniques',
    difficulty: 'Beginner',
    tags: ['chemistry', 'lab', 'techniques', 'safety'],
    author: mockUsers[4], // Emma Thompson
    university: 'Yale University',
    course: 'CHEM 101',
    videoUrl: 'https://example.com/video2.mp4',
    bookmarked: true
  },
  {
    id: 'video-3',
    title: 'History Essay Writing Tips',
    description: 'Master the art of writing compelling history essays. Learn structure, argumentation, and source analysis techniques from a senior history major.',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop',
    duration: 1156, // 19:16
    uploadDate: new Date('2024-09-15'),
    views: 12056,
    likes: 743,
    subject: 'History',
    topic: 'Essay Writing',
    difficulty: 'Intermediate',
    tags: ['history', 'writing', 'essays', 'research'],
    author: mockUsers[0], // Sarah Chen (cross-subject expertise)
    university: 'Stanford University',
    course: 'HIST 103',
    videoUrl: 'https://example.com/video3.mp4',
    bookmarked: false
  },
  {
    id: 'video-4',
    title: 'Physics: Quantum Mechanics',
    description: 'An introduction to quantum mechanics principles. Explore wave-particle duality, uncertainty principle, and quantum states with clear explanations.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=225&fit=crop',
    duration: 1823, // 30:23
    uploadDate: new Date('2024-09-12'),
    views: 23145,
    likes: 1456,
    subject: 'Physics',
    topic: 'Quantum Mechanics',
    difficulty: 'Advanced',
    tags: ['physics', 'quantum', 'mechanics', 'theory'],
    author: mockUsers[3], // Alex Rivera
    university: 'Harvard University',
    course: 'PHYS 143a',
    videoUrl: 'https://example.com/video4.mp4',
    bookmarked: true
  },
  {
    id: 'video-5',
    title: 'Microeconomics Principles',
    description: 'Core microeconomics concepts including supply and demand, market equilibrium, and consumer behavior. Perfect for economics beginners.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop',
    duration: 1456, // 24:16
    uploadDate: new Date('2024-09-10'),
    views: 9876,
    likes: 634,
    subject: 'Economics',
    topic: 'Microeconomics',
    difficulty: 'Beginner',
    tags: ['economics', 'microeconomics', 'supply', 'demand'],
    author: mockUsers[1], // Marcus Johnson (demonstrating cross-disciplinary knowledge)
    university: 'MIT',
    course: 'ECON 101',
    videoUrl: 'https://example.com/video5.mp4',
    bookmarked: false
  },
  {
    id: 'video-6',
    title: 'Creative Writing Foundations',
    description: 'Develop your creative writing skills with exercises in character development, plot structure, and narrative techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=225&fit=crop',
    duration: 987, // 16:27
    uploadDate: new Date('2024-09-08'),
    views: 6543,
    likes: 421,
    subject: 'Literature',
    topic: 'Creative Writing',
    difficulty: 'Intermediate',
    tags: ['writing', 'creative', 'literature', 'storytelling'],
    author: mockUsers[0], // Sarah Chen
    university: 'Stanford University',
    course: 'ENG 90',
    videoUrl: 'https://example.com/video6.mp4',
    bookmarked: false
  }
];

// Mock Study Notes
export const mockStudyNotes: StudyNote[] = [
  {
    id: 'note-1',
    videoId: 'video-1',
    userId: 'current-user',
    timestamp: 456,
    content: 'Key concept: Integration is the reverse process of differentiation. Remember to add the constant C!',
    createdAt: new Date('2024-09-21'),
    isPublic: false
  },
  {
    id: 'note-2',
    videoId: 'video-1',
    userId: 'current-user',
    timestamp: 789,
    content: 'Integration by parts formula: ∫u dv = uv - ∫v du. Practice with polynomial examples.',
    createdAt: new Date('2024-09-21'),
    isPublic: false
  },
  {
    id: 'note-3',
    videoId: 'video-4',
    userId: 'current-user',
    timestamp: 234,
    content: 'Wave-particle duality: Light behaves as both a wave and particle depending on the experiment.',
    createdAt: new Date('2024-09-13'),
    isPublic: true
  }
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    videoId: 'video-1',
    userId: 'user-2',
    user: mockUsers[1], // Marcus Johnson
    content: 'This explanation of integration really helped me understand the concept! The step-by-step approach is perfect.',
    createdAt: new Date('2024-09-21'),
    replies: [],
    likes: 12
  },
  {
    id: 'comment-2',
    videoId: 'video-1',
    userId: 'user-4',
    user: mockUsers[3], // Alex Rivera
    content: 'Great video! Could you do a follow-up on integration by substitution?',
    timestamp: 1100,
    createdAt: new Date('2024-09-20'),
    replies: [
      {
        id: 'reply-1',
        videoId: 'video-1',
        userId: 'user-3',
        user: mockUsers[2], // Priya Patel (author)
        content: 'Thanks for the suggestion! I\'ll definitely consider that for my next video.',
        createdAt: new Date('2024-09-21'),
        replies: [],
        likes: 5
      }
    ],
    likes: 8
  },
  {
    id: 'comment-3',
    videoId: 'video-4',
    userId: 'user-1',
    user: mockUsers[0], // Sarah Chen
    content: 'The quantum mechanics explanation is incredibly clear. This helped me prepare for my physics exam!',
    createdAt: new Date('2024-09-14'),
    replies: [],
    likes: 23
  }
];

// Current user mock data
export const currentUser: User = {
  id: 'current-user',
  name: 'Jordan Smith',
  university: 'University of California',
  major: 'Biology',
  year: 2,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  contributionCount: 5,
  studyHours: 67,
  badges: [
    {
      id: 'badge-8',
      name: 'New Scholar',
      description: 'Welcome to StudyShare!',
      icon: '🎓',
      earnedAt: new Date('2024-08-15')
    }
  ]
};

// Helper function to get videos by filter
export function getFilteredVideos(videos: Video[], filters: any = {}) {
  let filtered = [...videos];

  if (filters.subject) {
    filtered = filtered.filter(video => video.subject === filters.subject);
  }

  if (filters.difficulty) {
    filtered = filtered.filter(video => video.difficulty === filters.difficulty);
  }

  if (filters.university) {
    filtered = filtered.filter(video => video.author.university === filters.university);
  }

  if (filters.duration) {
    switch (filters.duration) {
      case 'short':
        filtered = filtered.filter(video => video.duration < 600); // < 10 min
        break;
      case 'medium':
        filtered = filtered.filter(video => video.duration >= 600 && video.duration <= 1800); // 10-30 min
        break;
      case 'long':
        filtered = filtered.filter(video => video.duration > 1800); // > 30 min
        break;
    }
  }

  // Sort
  switch (filters.sortBy) {
    case 'recent':
      filtered.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime());
      break;
    case 'popular':
      filtered.sort((a, b) => b.views - a.views);
      break;
    case 'trending':
      filtered.sort((a, b) => b.likes - a.likes);
      break;
    default:
      filtered.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime());
  }

  return filtered;
}