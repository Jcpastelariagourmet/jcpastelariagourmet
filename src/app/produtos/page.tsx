'use client';

import React from 'react';
import { ProductCatalog } from '@/components/products';
import { useProducts, useProductSearch } from '@/hooks/useProducts';
import { MainLayout } from '@/components/layout/MainLayout';
import { Product, ProductOptions } from '@/types/database';

// Mock cart functionality for demo
const useCart = () => {
  const addToCart = (product: Product, options: ProductOptions) => {
    console.log('Adding to cart:', product.name, options);
    // In a real app, this would add to cart state/context
    alert(`${product.name} adicionado ao carrinho!`);
  };

  return { addToCart };
};

// Mock favorites functionality for demo
const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);

  const toggleFavorite = (product: Product) => {
    setFavoriteIds(prev => 
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  return { favoriteIds, toggleFavorite };
};

export default function ProdutosPage() {
  const {
    products,
    categories,
    loading,
    hasMore,
    setFilters,
    setSearchQuery,
    loadMore,
    refresh
  } = useProducts({
    pageSize: 12,
    enableInfiniteScroll: true
  });

  const {
    suggestions,
    recentSearches,
    trendingSearches,
    loadSuggestions,
    saveSearch
  } = useProductSearch();

  const { addToCart } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();

  // Handle product quick view
  const handleQuickView = (product: Product) => {
    console.log('Quick view:', product.name);
    // In a real app, this would open a product modal
    alert(`Visualização rápida: ${product.name}`);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    saveSearch(query);
    loadSuggestions(query);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <ProductCatalog
          products={products}
          categories={categories}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          onAddToCart={addToCart}
          onQuickView={handleQuickView}
          onFavoriteToggle={toggleFavorite}
          favoriteProductIds={favoriteIds}
          onSearch={handleSearch}
          searchSuggestions={suggestions}
          recentSearches={recentSearches}
          trendingSearches={trendingSearches}
        />
      </div>
    </MainLayout>
  );
}