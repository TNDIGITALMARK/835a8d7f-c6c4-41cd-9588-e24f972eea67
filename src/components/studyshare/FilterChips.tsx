'use client';

import { Category, FilterOptions } from '@/types/studyshare';
import { cn } from '@/lib/utils';

interface FilterChipsProps {
  categories: Category[];
  activeFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

export function FilterChips({ categories, activeFilters, onFilterChange, className = '' }: FilterChipsProps) {
  const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];
  const durationOptions = [
    { key: 'short', label: '< 10 min' },
    { key: 'medium', label: '10-30 min' },
    { key: 'long', label: '> 30 min' }
  ];

  const sortOptions = [
    { key: 'recent', label: 'Recent' },
    { key: 'popular', label: 'Popular' },
    { key: 'trending', label: 'Trending' }
  ];

  const handleCategoryFilter = (category: string) => {
    onFilterChange({
      ...activeFilters,
      subject: activeFilters.subject === category ? undefined : category
    });
  };

  const handleDifficultyFilter = (difficulty: string) => {
    onFilterChange({
      ...activeFilters,
      difficulty: activeFilters.difficulty === difficulty ? undefined : difficulty
    });
  };

  const handleDurationFilter = (duration: string) => {
    onFilterChange({
      ...activeFilters,
      duration: activeFilters.duration === duration ? undefined : duration as any
    });
  };

  const handleSortFilter = (sortBy: string) => {
    onFilterChange({
      ...activeFilters,
      sortBy: sortBy as any
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(activeFilters).some(value => value !== undefined);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Categories */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Subjects</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryFilter(category.name)}
              className={cn(
                'category-chip',
                activeFilters.subject === category.name && 'active'
              )}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
              <span className="ml-1 text-xs opacity-70">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          {difficultyOptions.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => handleDifficultyFilter(difficulty)}
              className={cn(
                'category-chip',
                activeFilters.difficulty === difficulty && 'active'
              )}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Duration</h3>
        <div className="flex flex-wrap gap-2">
          {durationOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => handleDurationFilter(option.key)}
              className={cn(
                'category-chip',
                activeFilters.duration === option.key && 'active'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Sort By</h3>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => handleSortFilter(option.key)}
              className={cn(
                'category-chip',
                activeFilters.sortBy === option.key && 'active'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-gray-200">
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}