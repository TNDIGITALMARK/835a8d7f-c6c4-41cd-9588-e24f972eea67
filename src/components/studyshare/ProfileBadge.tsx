'use client';

import { User, Badge } from '@/types/studyshare';
import { formatNumber } from '@/lib/utils';
import {
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  Star,
  TrendingUp
} from 'lucide-react';

interface ProfileBadgeProps {
  user: User;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProfileBadge({ user, showDetails = false, size = 'md', className = '' }: ProfileBadgeProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const getBadgeIcon = (badgeName: string) => {
    switch (badgeName.toLowerCase()) {
      case 'star contributor': return <Star className="h-3 w-3" />;
      case 'top educator': return <Award className="h-3 w-3" />;
      case 'rising star': return <TrendingUp className="h-3 w-3" />;
      default: return <Award className="h-3 w-3" />;
    }
  };

  const getBadgeColor = (badgeName: string) => {
    switch (badgeName.toLowerCase()) {
      case 'star contributor': return 'bg-yellow-100 text-yellow-800';
      case 'top educator': return 'bg-purple-100 text-purple-800';
      case 'rising star': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {/* Avatar */}
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.name}
          className={`${sizeClasses[size]} rounded-full border-2 border-white shadow-sm`}
        />
        <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white rounded-full p-1">
          <GraduationCap className="h-3 w-3" />
        </div>
      </div>

      {/* User Info */}
      <div className="flex-1">
        <h3 className={`font-semibold academic-title ${textSizes[size]}`}>
          {user.name}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mt-1">
          <GraduationCap className="h-4 w-4 mr-1" />
          <span>{user.university}</span>
          <span className="mx-2">•</span>
          <span>{user.major}</span>
        </div>

        {showDetails && (
          <>
            {/* Stats */}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{formatNumber(user.contributionCount)} videos</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatNumber(user.studyHours)} study hours</span>
              </div>
            </div>

            {/* Badges */}
            {user.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {user.badges.slice(0, 3).map((badge) => (
                  <span
                    key={badge.id}
                    className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getBadgeColor(badge.name)}`}
                    title={badge.description}
                  >
                    {getBadgeIcon(badge.name)}
                    <span className="ml-1">{badge.name}</span>
                  </span>
                ))}
                {user.badges.length > 3 && (
                  <span className="text-xs text-gray-400 px-2 py-1">
                    +{user.badges.length - 3} more
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}