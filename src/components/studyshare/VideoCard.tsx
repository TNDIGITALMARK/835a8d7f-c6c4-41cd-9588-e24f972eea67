'use client';

import { Video } from '@/types/studyshare';
import { formatDuration, formatTimeAgo } from '@/lib/utils';
import {
  Play,
  Bookmark,
  BookmarkCheck,
  Eye,
  Heart,
  Clock,
  User,
  GraduationCap
} from 'lucide-react';
import { useState } from 'react';

interface VideoCardProps {
  video: Video;
  onPlay?: (video: Video) => void;
  onBookmark?: (videoId: string) => void;
  className?: string;
}

export function VideoCard({ video, onPlay, onBookmark, className = '' }: VideoCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(video.bookmarked || false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark?.(video.id);
  };

  const handlePlay = () => {
    onPlay?.(video);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-50';
      case 'Intermediate': return 'text-orange-600 bg-orange-50';
      case 'Advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className={`video-card group cursor-pointer overflow-hidden ${className}`} onClick={handlePlay}>
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient background with play icon
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/90 rounded-full p-3">
            <Play className="h-8 w-8 text-blue-600 fill-current" />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </div>

        {/* Bookmark */}
        <button
          onClick={handleBookmark}
          className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-200"
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-4 w-4 text-orange-500" />
          ) : (
            <Bookmark className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 bg-white">
        {/* Subject & Difficulty */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {video.subject}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(video.difficulty)}`}>
            {video.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="academic-title text-lg mb-2 line-clamp-2 text-gray-900">
          {video.title}
        </h3>

        {/* Meta info */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <User className="h-4 w-4 mr-1" />
          <span className="font-medium">{video.author.name}</span>
          <span className="mx-2">•</span>
          <GraduationCap className="h-4 w-4 mr-1" />
          <span>{video.author.university}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span>{video.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              <span>{video.likes.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTimeAgo(video.uploadDate)}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {video.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
          {video.tags.length > 3 && (
            <span className="text-xs text-gray-400">+{video.tags.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  );
}