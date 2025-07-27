'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCatalog } from '@/components/products';
import { CategoryNavigation } from '@/components/categories';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Container } from '@/components/layout/Container';
import { useProducts, useProductSearch } from '@/hooks/useProducts';
import { MainLayout } from '@/components/layout/MainLayout';
import { Product } from '@/types/database';
import { ProductOptions } from '@/types/components';

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

  const { addToCart } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();

  // Find current category for breadcrumb
  const currentCategory = React.useMemo(() => 
    categoryId ? categories.find(cat => cat.id === categoryId) : undefined,
    [categories, categoryId]
  );

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

  // Redirect to home page since menu is now there
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (categoryId) {
      params.set('categoria', categoryId);
    }
    window.location.href = `/?${params.toString()}`;
  }, [categoryId]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecionando para o cardápio...</p>
        </div>
      </div>
    </MainLayout>
  );
}