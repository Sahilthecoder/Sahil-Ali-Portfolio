import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiFilter, FiX, FiCheck, FiShuffle } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface IProjectFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
  className?: string;
}

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'featured', label: 'Featured' },
  { value: 'a-z', label: 'A-Z' },
  { value: 'z-a', label: 'Z-A' },
];

const ProjectFilters: React.FC<IProjectFiltersProps> = ({
  search,
  onSearchChange,
  tags,
  selectedTags,
  onTagToggle,
  sort,
  onSortChange,
  onClearFilters,
  className = '',
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [tagSearch, setTagSearch] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);

  const selectedSortLabel =
    sortOptions.find((opt) => opt.value === sort)?.label || 'Sort';

  // Remove duplicate tags
  const uniqueTags = Array.from(new Set(tags));

  // Filter tags by search
  const filteredTags = uniqueTags.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
        setShowSortMenu(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowFilters(false);
        setShowSortMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative',
        className
      )}
      ref={filterRef}
    >
      {/* Search Bar */}
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground"
        />
      </div>

      {/* Filter Button */}
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1.5 min-w-[110px]"
        onClick={() => {
          setShowFilters((prev) => !prev);
          setShowSortMenu(false);
        }}
        aria-expanded={showFilters}
        aria-haspopup="true"
      >
        Filter
        <FiFilter className="w-4 h-4" />
      </Button>

      {/* Sort By Button */}
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1.5 min-w-[110px]"
        onClick={() => {
          setShowSortMenu((prev) => !prev);
          setShowFilters(false);
        }}
        aria-expanded={showSortMenu}
        aria-haspopup="true"
      >
        {selectedSortLabel}
        <FiShuffle className="w-4 h-4" />
      </Button>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-background rounded-xl border border-border shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="p-4 space-y-6">
            {/* Clear Filters at the Top */}
            {(selectedTags.length > 0 || tagSearch) && (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-destructive hover:bg-destructive/10"
                onClick={() => {
                  onClearFilters();
                  setTagSearch('');
                }}
              >
                <FiX className="w-4 h-4 mr-1" />
                Clear Filters
              </Button>
            )}

            {/* Tag Search */}
            <div>
              <input
                type="text"
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                placeholder="Search tags..."
                className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
                Filter by Technology
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {filteredTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'secondary' : 'outline'}
                    size="sm"
                    className="justify-center text-sm font-medium"
                    onClick={() => onTagToggle(tag)}
                  >
                    {tag}
                  </Button>
                ))}
                {filteredTags.length === 0 && (
                  <p className="text-sm text-muted-foreground col-span-2 text-center">
                    No matching tags
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sort Dropdown */}
      {showSortMenu && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-background rounded-xl border border-border shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="p-3 space-y-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setShowSortMenu(false);
                }}
                className={cn(
                  'w-full px-3 py-2 rounded-lg flex items-center justify-between transition-colors',
                  sort === option.value
                    ? 'bg-primary text-white'
                    : 'hover:bg-primary/10 hover:text-primary'
                )}
              >
                <span>{option.label}</span>
                {sort === option.value && <FiCheck className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;
