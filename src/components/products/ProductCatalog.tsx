import React, { useState, useMemo } from 'react';
import { Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product, Category } from '@/types/database';
import { ProductGrid } from './ProductGrid';
import { ProductSearch, SearchSuggestion } from './ProductSearch';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';

export interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  onAddToCart: (product: Product, options: any) => void;
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products (only search)
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

    // Simple sorting by popularity
    filtered.sort((a, b) => {
      const aValue = a.orders_count || 0;
      const bValue = b.orders_count || 0;
      return bValue - aValue; // desc order
    });

    return filtered;
  }, [products, searchQuery]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  // Reset search
  const handleResetSearch = () => {
    setSearchQuery('');
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

      {/* Controls */}
      <Container>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
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
                  <span className="text-4xl">🔍</span>
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
      </Container>
    </div>
  );
};

export default ProductCatalog;