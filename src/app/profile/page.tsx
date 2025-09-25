'use client';

import { useState } from 'react';
import { VideoCard, ProfileBadge, UploadModal } from '@/components/studyshare';
import { mockVideos, currentUser } from '@/lib/mockData';
import { UploadVideo } from '@/types/studyshare';
import {
  Upload,
  BookOpen,
  Clock,
  Heart,
  Eye,
  Award,
  TrendingUp,
  Calendar,
  Settings,
  Edit3,
  Plus,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function ProfileContributionCenter() {
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'analytics'>('overview');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Mock user's videos (in a real app, this would be filtered by user ID)
  const userVideos = mockVideos.filter(video => video.author.id === currentUser.id);
  const totalViews = userVideos.reduce((sum, video) => sum + video.views, 0);
  const totalLikes = userVideos.reduce((sum, video) => sum + video.likes, 0);

  const handleUploadVideo = async (videoData: UploadVideo) => {
    // In a real app, this would upload the video and create a new video record
    console.log('Uploading video:', videoData);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload
  };

  const handleVideoPlay = (video: any) => {
    // Navigate to video player
    window.location.href = `/video/${video.id}`;
  };

  const handleBookmark = (videoId: string) => {
    console.log('Toggling bookmark for video:', videoId);
  };

  const stats = [
    {
      label: 'Videos Uploaded',
      value: userVideos.length,
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: 'text-green-600 bg-green-50'
    },
    {
      label: 'Total Likes',
      value: totalLikes.toLocaleString(),
      icon: Heart,
      color: 'text-red-600 bg-red-50'
    },
    {
      label: 'Study Hours',
      value: currentUser.studyHours,
      icon: Clock,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="bg-orange-500 rounded-lg p-2 mr-3">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold academic-title text-gray-900">Profile & Contributions</h1>
                <p className="text-sm text-gray-500">Manage your academic content and progress</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload Video
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between">
            <ProfileBadge
              user={currentUser}
              showDetails={true}
              size="lg"
              className="flex-1"
            />
            <div className="flex items-center space-x-3">
              <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 flex items-center">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.color} mb-2`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Achievement */}
          <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <h3 className="font-medium text-orange-900">Latest Achievement</h3>
                <p className="text-sm text-orange-700">
                  Earned "New Scholar" badge for joining StudyShare
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'videos'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Videos ({userVideos.length})
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold academic-title mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="bg-green-100 p-2 rounded-full mr-4">
                        <Upload className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Joined StudyShare</p>
                        <p className="text-sm text-gray-500">2 months ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Progress */}
                <div>
                  <h3 className="text-lg font-semibold academic-title mb-4">Learning Progress</h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">Study Hours This Month</span>
                      <span className="text-sm text-blue-600">23 / 40 hours</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '57.5%' }} />
                    </div>
                    <p className="text-xs text-blue-600 mt-2">You're on track to reach your monthly goal!</p>
                  </div>
                </div>

                {/* Bookmarked Videos */}
                <div>
                  <h3 className="text-lg font-semibold academic-title mb-4">Bookmarked Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockVideos.filter(v => v.bookmarked).slice(0, 3).map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onPlay={handleVideoPlay}
                        onBookmark={handleBookmark}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div>
                {userVideos.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold academic-title">Your Uploaded Videos</h3>
                      <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Upload New Video
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userVideos.map((video) => (
                        <VideoCard
                          key={video.id}
                          video={video}
                          onPlay={handleVideoPlay}
                          onBookmark={handleBookmark}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <Upload className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No videos uploaded yet</h3>
                    <p className="text-gray-500 mb-6">
                      Share your knowledge with the StudyShare community by uploading your first educational video.
                    </p>
                    <button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 flex items-center mx-auto"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Upload Your First Video
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                {/* Performance Overview */}
                <div>
                  <h3 className="text-lg font-semibold academic-title mb-4">Performance Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 text-sm font-medium">Total Views</p>
                          <p className="text-2xl font-bold text-blue-900">{totalViews.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-xs text-blue-600 mt-2">↑ 12% from last month</p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 text-sm font-medium">Engagement Rate</p>
                          <p className="text-2xl font-bold text-green-900">8.2%</p>
                        </div>
                        <Heart className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-xs text-green-600 mt-2">↑ 3% from last month</p>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-600 text-sm font-medium">Study Hours Generated</p>
                          <p className="text-2xl font-bold text-orange-900">{(totalViews * 0.2).toFixed(0)}</p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-600" />
                      </div>
                      <p className="text-xs text-orange-600 mt-2">Estimated student hours</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Timeline */}
                <div>
                  <h3 className="text-lg font-semibold academic-title mb-4">Activity Timeline</h3>
                  <div className="space-y-4">
                    {[
                      { date: '2024-09-20', action: 'Video received 50 new views', type: 'view' },
                      { date: '2024-09-18', action: 'New comment on "Calculus Integration"', type: 'comment' },
                      { date: '2024-09-15', action: 'Video reached 1K views milestone', type: 'milestone' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-full mr-4 ${
                          activity.type === 'view' ? 'bg-blue-100' :
                          activity.type === 'comment' ? 'bg-green-100' :
                          'bg-orange-100'
                        }`}>
                          {activity.type === 'view' && <Eye className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'comment' && <BookOpen className="h-4 w-4 text-green-600" />}
                          {activity.type === 'milestone' && <Award className="h-4 w-4 text-orange-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadVideo}
      />
    </div>
  );
}