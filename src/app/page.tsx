'use client';

import { useState } from 'react';
import { VideoCard, FilterChips } from '@/components/studyshare';
import { mockVideos, mockCategories, getFilteredVideos } from '@/lib/mockData';
import { FilterOptions } from '@/types/studyshare';
import { Search, BookOpen, Users, TrendingUp, Filter } from 'lucide-react';

export const dynamic = 'force-dynamic'

export default function DiscoveryDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);

  // Filter videos based on search and filters
  const filteredVideos = getFilteredVideos(mockVideos, activeFilters).filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleVideoPlay = (video: any) => {
    // Navigate to video learning hub
    window.location.href = `/video/${video.id}`;
  };

  const handleBookmark = (videoId: string) => {
    // In a real app, this would toggle the bookmark status
    console.log('Toggling bookmark for video:', videoId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="academic-header shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-white rounded-lg p-2 mr-3">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mr-4">
                <h1 className="text-2xl font-bold academic-title text-white">ACADEMIA.TV</h1>
                <p className="text-blue-100 text-sm">Peer-to-Peer Learning Network</p>
              </div>
              <div className="hidden sm:block">
                <img
                  src="/currentImgContext/ChatGPT Image Aug 24, 2025, 03_04_13 PM.png"
                  alt="Academia.TV Mascot"
                  className="h-16 w-16 object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for videos, topics, or subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-transparent rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <div className="text-right text-white">
                <p className="text-sm opacity-90">Welcome back!</p>
                <p className="font-medium">Jordan Smith</p>
              </div>
              <a href="/profile" className="block">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-white hover:border-orange-300 transition-colors cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Categories */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold academic-title">Browse Categories</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden bg-blue-50 text-blue-600 p-2 rounded-lg"
                >
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{filteredVideos.length}</div>
                  <div className="text-xs text-blue-600">Videos</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{mockCategories.length}</div>
                  <div className="text-xs text-green-600">Subjects</div>
                </div>
              </div>

              {/* Filters */}
              <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
                <FilterChips
                  categories={mockCategories}
                  activeFilters={activeFilters}
                  onFilterChange={setActiveFilters}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold academic-title text-gray-900">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Videos'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>5 Universities</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>156K Total Views</span>
                </div>
              </div>
            </div>

            {/* Video Grid */}
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={handleVideoPlay}
                    onBookmark={handleBookmark}
                    className="bg-white"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or filters to find more content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}