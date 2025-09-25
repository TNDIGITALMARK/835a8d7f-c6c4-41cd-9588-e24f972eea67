'use client';

import { useState, useEffect } from 'react';
import { StudyPanel, ProfileBadge } from '@/components/studyshare';
import { mockVideos, mockStudyNotes, mockComments, currentUser } from '@/lib/mockData';
import { Video, StudyNote, Comment } from '@/types/studyshare';
import { formatDuration, formatTimeAgo } from '@/lib/utils';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize,
  BookmarkPlus,
  Share2,
  Heart,
  Eye,
  GraduationCap,
  Clock
} from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

export default function VideoLearningHub({ params }: PageProps) {
  const [video, setVideo] = useState<Video | null>(null);
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    // Find video by ID
    const foundVideo = mockVideos.find(v => v.id === params.id);
    setVideo(foundVideo || null);

    // Load notes and comments for this video
    setNotes(mockStudyNotes.filter(note => note.videoId === params.id));
    setComments(mockComments.filter(comment => comment.videoId === params.id));
  }, [params.id]);

  const handleAddNote = (note: Omit<StudyNote, 'id' | 'createdAt'>) => {
    const newNote: StudyNote = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date()
    };
    setNotes(prev => [...prev, newNote]);
  };

  const handleAddComment = (comment: Omit<Comment, 'id' | 'createdAt' | 'replies' | 'likes' | 'user'>) => {
    const newComment: Comment = {
      ...comment,
      id: `comment-${Date.now()}`,
      user: currentUser,
      createdAt: new Date(),
      replies: [],
      likes: 0
    };
    setComments(prev => [...prev, newComment]);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Video not found</h2>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="bg-blue-600 rounded-lg p-2 mr-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold academic-title text-gray-900">ACADEMIA.TV</h1>
                <p className="text-sm text-gray-500">Video Learning Hub</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden shadow-lg mb-6">
              <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                {/* Mock Video Player */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />

                {/* Play/Pause Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-16 w-16 text-white" />
                    ) : (
                      <Play className="h-16 w-16 text-white fill-current" />
                    )}
                  </button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:bg-white/20 p-2 rounded"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </button>

                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4" />
                        <div className="w-20 h-1 bg-white/30 rounded">
                          <div
                            className="h-full bg-white rounded"
                            style={{ width: `${volume * 100}%` }}
                          />
                        </div>
                      </div>

                      <span className="text-sm">
                        {formatDuration(currentTime)} / {formatDuration(video.duration)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="hover:bg-white/20 p-2 rounded">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="hover:bg-white/20 p-2 rounded">
                        <Maximize className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-white/30 rounded mt-3">
                    <div
                      className="h-full bg-orange-500 rounded transition-all"
                      style={{ width: `${(currentTime / video.duration) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold academic-title text-gray-900 mb-2">
                    {video.title}
                  </h1>
                  <p className="text-gray-600 academic-body mb-4">
                    {video.description}
                  </p>

                  {/* Video Meta */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{video.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{video.likes.toLocaleString()} likes</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatTimeAgo(video.uploadDate)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 ml-6">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center">
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Bookmark
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>

              {/* Author Info */}
              <ProfileBadge
                user={video.author}
                showDetails={true}
                size="lg"
                className="pt-4 border-t border-gray-200"
              />
            </div>

            {/* Course Context */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    {video.course} • {video.subject}
                  </p>
                  <p className="text-xs text-blue-600">
                    {video.author.university} • {video.difficulty} Level
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Study Tools Panel */}
          <div className="lg:col-span-1">
            <StudyPanel
              videoId={video.id}
              notes={notes}
              comments={comments}
              onAddNote={handleAddNote}
              onAddComment={handleAddComment}
              onDeleteNote={handleDeleteNote}
              className="sticky top-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}