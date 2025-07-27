'use client';

import React, { useState } from 'react';
import { ProductCatalog } from '@/components/products/ProductCatalog';
import { useProducts, useProductSearch } from '@/hooks/useProducts';
import { Product } from '@/types/database';
import { ProductOptions } from '@/types/components';
import { PageContainer } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function CatalogDemoPage() {
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>(['2', '5']);
  
  // Use the products hook with all features
  const {
    products,
    categories,
    loading,
    hasMore,
    totalCount,
    filters,
    searchQuery,
    setFilters,
    setSearchQuery,
    loadMore,
    refresh,
    resetFilters
  } = useProducts({
    pageSize: 12,
    enableInfiniteScroll: true
  });

  // Use search hook for suggestions
  const {
    suggestions,
    recentSearches,
    trendingSearches,
    loadSuggestions,
    saveSearch
  } = useProductSearch();

  const handleAddToCart = (product: Product, options: ProductOptions) => {
    console.log('Adding to cart:', product.name, options);
    // Here you would typically dispatch to a cart store
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const handleQuickView = (product: Product) => {
    console.log('Quick view:', product.name);
    // Here you would typically open a product modal
    alert(`Visualização rápida: ${product.name}`);
  };

  const handleFavoriteToggle = (product: Product) => {
    setFavoriteProductIds(prev => 
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    saveSearch(query);
    loadSuggestions(query);
  };

  return (
    <PageContainer
      title="Catálogo de Produtos"
      description="Explore nossos deliciosos pastéis e encontre seus favoritos"
      actions={
        <div className="flex items-center gap-4">
          <Badge variant="info" size="md">
            {totalCount} produtos
          </Badge>
          <Button variant="outline" onClick={refresh}>
            Atualizar
          </Button>
          <Button variant="ghost" onClick={resetFilters}>
            Limpar Filtros
          </Button>
        </div>
      }
    >
      <ProductCatalog
        products={products}
        categories={categories}
        loading={loading}
        onLoadMore={loadMore}
        hasMore={hasMore}
        onAddToCart={handleAddToCart}
        onQuickView={handleQuickView}
        onFavoriteToggle={handleFavoriteToggle}
        favoriteProductIds={favoriteProductIds}
        onSearch={handleSearch}
        searchSuggestions={suggestions}
        recentSearches={recentSearches}
        trendingSearches={trendingSearches}
      />

      {/* Debug Info */}
      <div className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Debug Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Total Products:</strong> {totalCount}
          </div>
          <div>
            <strong>Loaded Products:</strong> {products.length}
          </div>
          <div>
            <strong>Has More:</strong> {hasMore ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Search Query:</strong> "{searchQuery}"
          </div>
          <div>
            <strong>Active Filters:</strong> {Object.keys(filters).filter(key => filters[key as keyof typeof filters]).length}
          </div>
          <div>
            <strong>Categories:</strong> {categories.length}
          </div>
          <div>
            <strong>Favorites:</strong> {favoriteProductIds.length}
          </div>
          <div>
            <strong>Category:</strong> {filters.categoryId || 'All'}
          </div>
        </div>
        
        {/* Current Filters */}
        {Object.keys(filters).some(key => filters[key as keyof typeof filters]) && (
          <div className="mt-4">
            <strong>Current Filters:</strong>
            <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">
              {JSON.stringify(filters, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </PageContainer>
  );
}