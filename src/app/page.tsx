'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCatalogWithSimpleModal } from '@/components/products';
import { CategoryNavigation } from '@/components/categories';
import { Container } from '@/components/layout/Container';
import { HeroSection } from '@/components/layout/HeroSection';
import { useProducts, useProductSearch } from '@/hooks/useProducts';
import { MainLayout } from '@/components/layout/MainLayout';
import { Product } from '@/types/database';
import { ProductOptions } from '@/types/components';
import { useCartStore } from '@/store/useCartStore';

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

export default function HomePage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoria') || undefined;

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
    enableInfiniteScroll: true,
    initialFilters: { categoryId }
  });

  const {
    suggestions,
    recentSearches,
    trendingSearches,
    loadSuggestions,
    saveSearch
  } = useProductSearch();


  const { favoriteIds, toggleFavorite } = useFavorites();
  const { addItem, setCartOpen, itemsCount, toggleCart } = useCartStore();

  // Handle add to cart with cart store integration
  const handleAddToCart = (product: Product, options: ProductOptions) => {
    addItem(product, options);
    
    // Show cart drawer after adding item
    setTimeout(() => {
      setCartOpen(true);
    }, 100);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    saveSearch(query);
    loadSuggestions(query);
  };

  return (
    <MainLayout 
      showBreadcrumb={false}
      cartItemsCount={itemsCount}
      onCartToggle={toggleCart}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Restaurant Info */}
        <HeroSection showInfo={false} />

        {/* Category Navigation */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <Container className="py-4">
            <CategoryNavigation
              categories={categories}
              currentCategoryId={categoryId}
              showAll={true}
              layout="horizontal"
              showProductCounts={true}
            />
          </Container>
        </div>

        {/* Main Menu/Catalog com Modal Simplificado */}
        <div className="py-8">
          <ProductCatalogWithSimpleModal
            products={products}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
            onAddToCart={handleAddToCart}
            onFavoriteToggle={toggleFavorite}
            favoriteProductIds={favoriteIds}
            onSearch={handleSearch}
            searchSuggestions={suggestions}
            recentSearches={recentSearches}
            trendingSearches={trendingSearches}
          />
        </div>

        {/* Info Footer */}
        <div className="bg-white border-t border-gray-200">
          <Container className="py-6">
            <div className="text-center text-sm text-gray-600 space-y-2">
              <p>
                <strong>🍽️ Cardápio Interativo:</strong> Clique em qualquer produto para personalizar seu pedido
              </p>
              <p>
                <strong>🎯 Personalizações:</strong> Sabores, Adicionais e Molhos com controles de quantidade
              </p>
              <p>
                <strong>📱 Responsivo:</strong> Funciona perfeitamente em todos os dispositivos
              </p>
            </div>
          </Container>
        </div>
      </div>
    </MainLayout>
  );
}