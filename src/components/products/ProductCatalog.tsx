import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product, Category, ProductOptions } from '@/types/database';
import { ProductGrid } from './ProductGrid';
import { ProductFilters, ProductFilters as ProductFiltersType } from './ProductFilters';
import { ProductSearch, SearchSuggestion } from './ProductSearch';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/layout/Container';

export interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  onAddToCart: (product: Product, options: ProductOptions) => void;
  onQuickView: (product: Product) => void;
  onFavoriteToggle?: (product: Product) => void;
  favoriteProductIds?: string[];
  onSearch?: (query: string) => void;
  searchSuggestions?: SearchSuggestion[];
  recentSearches?: string[];
  trendingSearches?: string[];
  className?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  categories,
  loading = false,
  onLoadMore,
  hasMore = false,
  onAddToCart,
  onQuickView,
  onFavoriteToggle,
  favoriteProductIds = [],
  onSearch,
  searchSuggestions = [],
  recentSearches = [],
  trendingSearches = [],
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFiltersType>({
    sortBy: 'popularity',
    sortOrder: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category?.name.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.categoryId) {
      filtered = filtered.filter(product => product.category_id === filters.categoryId);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(product => {
        const price = product.discountedPrice || product.price;
        return price >= min && price <= max;
      });
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => 
        product.rating && product.rating >= filters.rating!
      );
    }

    // Apply preparation time filter
    if (filters.preparationTime) {
      filtered = filtered.filter(product => 
        product.preparation_time && product.preparation_time <= filters.preparationTime!
      );
    }

    // Apply dietary filters
    if (filters.dietary && filters.dietary.length > 0) {
      filtered = filtered.filter(product => {
        // This would need to be implemented based on product dietary information
        // For now, we'll assume products have a dietary field or we check allergens
        return filters.dietary!.some(diet => 
          product.allergens?.includes(diet) === false
        );
      });
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (filters.sortBy) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'price':
            aValue = a.discountedPrice || a.price;
            bValue = b.discountedPrice || b.price;
            break;
          case 'rating':
            aValue = a.rating || 0;
            bValue = b.rating || 0;
            break;
          case 'popularity':
            aValue = a.orders_count || 0;
            bValue = b.orders_count || 0;
            break;
          case 'newest':
            aValue = new Date(a.created_at || 0).getTime();
            bValue = new Date(b.created_at || 0).getTime();
            break;
          default:
            return 0;
        }

        if (filters.sortOrder === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [products, searchQuery, filters]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: ProductFiltersType) => {
    setFilters(newFilters);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      sortBy: 'popularity',
      sortOrder: 'desc'
    });
    setSearchQuery('');
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categoryId) count++;
    if (filters.priceRange) count++;
    if (filters.rating) count++;
    if (filters.preparationTime) count++;
    if (filters.dietary && filters.dietary.length > 0) count++;
    if (searchQuery.trim()) count++;
    return count;
  };

  // Generate search suggestions based on products and categories
  const generateSuggestions = useMemo((): SearchSuggestion[] => {
    if (!searchQuery.trim()) return searchSuggestions;

    const query = searchQuery.toLowerCase();
    const suggestions: SearchSuggestion[] = [];

    // Add product suggestions
    products
      .filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
      .slice(0, 5)
      .forEach(product => {
        suggestions.push({
          id: product.id,
          type: 'product',
          title: product.name,
          subtitle: product.description,
          image: product.image_url || undefined,
          category: product.category?.name
        });
      });

    // Add category suggestions
    categories
      .filter(category => category.name.toLowerCase().includes(query))
      .slice(0, 3)
      .forEach(category => {
        suggestions.push({
          id: category.id,
          type: 'category',
          title: category.name,
          subtitle: `${category.productsCount || 0} produtos`
        });
      });

    return suggestions;
  }, [searchQuery, products, categories, searchSuggestions]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Search Bar */}
      <Container>
        <div className="max-w-2xl mx-auto">
          <ProductSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            suggestions={generateSuggestions}
            recentSearches={recentSearches}
            trendingSearches={trendingSearches}
            loading={loading}
          />
        </div>
      </Container>

      {/* Filters and Controls */}
      <Container>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={cn(
            'lg:w-80 lg:flex-shrink-0',
            showFilters ? 'block' : 'hidden lg:block'
          )}>
            <ProductFilters
              categories={categories}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleResetFilters}
              isOpen={showFilters}
              onToggle={() => setShowFilters(!showFilters)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                  {getActiveFiltersCount() > 0 && (
                    <Badge variant="primary" size="sm" className="ml-2">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  {loading ? (
                    'Carregando...'
                  ) : (
                    <>
                      {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
                      {searchQuery && ` para "${searchQuery}"`}
                    </>
                  )}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-600">Filtros ativos:</span>
                
                {searchQuery && (
                  <Badge variant="primary" className="flex items-center gap-1">
                    Busca: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-1 hover:bg-primary-600 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                )}

                {filters.categoryId && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {categories.find(c => c.id === filters.categoryId)?.name}
                    <button
                      onClick={() => handleFiltersChange({ ...filters, categoryId: undefined })}
                      className="ml-1 hover:bg-accent-600 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                )}

                {filters.priceRange && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
                    <button
                      onClick={() => handleFiltersChange({ ...filters, priceRange: undefined })}
                      className="ml-1 hover:bg-accent-600 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                )}

                {filters.rating && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {filters.rating}+ estrelas
                    <button
                      onClick={() => handleFiltersChange({ ...filters, rating: undefined })}
                      className="ml-1 hover:bg-accent-600 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Limpar todos
                </Button>
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              onLoadMore={onLoadMore}
              hasMore={hasMore}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onFavoriteToggle={onFavoriteToggle}
              favoriteProductIds={favoriteProductIds}
              emptyState={
                searchQuery ? (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Filter className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Nenhum produto encontrado
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Não encontramos produtos para "{searchQuery}".
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery('')}
                    >
                      Limpar busca
                    </Button>
                  </div>
                ) : undefined
              }
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductCatalog;