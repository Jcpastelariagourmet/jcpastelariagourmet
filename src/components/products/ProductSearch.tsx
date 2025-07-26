import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { cn, debounce } from '@/lib/utils';
import { Product, Category } from '@/types/database';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export interface SearchSuggestion {
  id: string;
  type: 'product' | 'category' | 'recent' | 'trending';
  title: string;
  subtitle?: string;
  image?: string;
  category?: string;
}

export interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  trendingSearches?: string[];
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  value,
  onChange,
  onSearch,
  suggestions = [],
  recentSearches = [],
  trendingSearches = [],
  loading = false,
  placeholder = 'Buscar produtos...',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 300),
    [onSearch]
  );

  // Handle input change
  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
    debouncedSearch(newValue);
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.title);
    onSearch(suggestion.title);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Handle recent/trending search click
  const handleQuickSearchClick = (query: string) => {
    onChange(query);
    onSearch(query);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const totalItems = suggestions.length + recentSearches.length + trendingSearches.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < totalItems - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : totalItems - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          if (highlightedIndex < suggestions.length) {
            handleSuggestionClick(suggestions[highlightedIndex]);
          } else if (highlightedIndex < suggestions.length + recentSearches.length) {
            const recentIndex = highlightedIndex - suggestions.length;
            handleQuickSearchClick(recentSearches[recentIndex]);
          } else {
            const trendingIndex = highlightedIndex - suggestions.length - recentSearches.length;
            handleQuickSearchClick(trendingSearches[trendingIndex]);
          }
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear search
  const handleClear = () => {
    onChange('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'product':
        return '🍽️';
      case 'category':
        return '📂';
      case 'recent':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      default:
        return '🔍';
    }
  };

  const showDropdown = isOpen && (
    suggestions.length > 0 || 
    recentSearches.length > 0 || 
    trendingSearches.length > 0 ||
    (!value && (recentSearches.length > 0 || trendingSearches.length > 0))
  );

  return (
    <div className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className={cn(
              'w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg',
              'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
              'placeholder-gray-500 text-gray-900',
              'transition-all duration-200'
            )}
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Sugestões
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    'w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3',
                    highlightedIndex === index && 'bg-primary-50'
                  )}
                >
                  <span className="text-lg">
                    {getSuggestionIcon(suggestion.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {suggestion.title}
                    </div>
                    {suggestion.subtitle && (
                      <div className="text-sm text-gray-500 truncate">
                        {suggestion.subtitle}
                      </div>
                    )}
                  </div>
                  {suggestion.category && (
                    <Badge variant="secondary" size="sm">
                      {suggestion.category}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="py-2 border-t border-gray-100">
              <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Buscas Recentes
              </div>
              {recentSearches.slice(0, 5).map((search, index) => {
                const globalIndex = suggestions.length + index;
                return (
                  <button
                    key={search}
                    onClick={() => handleQuickSearchClick(search)}
                    className={cn(
                      'w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3',
                      highlightedIndex === globalIndex && 'bg-primary-50'
                    )}
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{search}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Trending Searches */}
          {trendingSearches.length > 0 && (
            <div className="py-2 border-t border-gray-100">
              <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Buscas Populares
              </div>
              {trendingSearches.slice(0, 5).map((search, index) => {
                const globalIndex = suggestions.length + recentSearches.length + index;
                return (
                  <button
                    key={search}
                    onClick={() => handleQuickSearchClick(search)}
                    className={cn(
                      'w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3',
                      highlightedIndex === globalIndex && 'bg-primary-50'
                    )}
                  >
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">{search}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="px-3 py-4 text-center text-gray-500">
              <div className="inline-flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
                Buscando...
              </div>
            </div>
          )}

          {/* No results */}
          {!loading && value && suggestions.length === 0 && (
            <div className="px-3 py-4 text-center text-gray-500">
              <div className="text-sm">
                Nenhum resultado encontrado para "{value}"
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;