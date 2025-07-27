'use client';

import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { ProductCatalog } from '@/components/products';
import { CategoryNavigation } from '@/components/categories';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MainLayout } from '@/components/layout/MainLayout';
import { Container } from '@/components/layout/Container';
import { useProducts, useProductSearch } from '@/hooks/useProducts';
import { Product } from '@/types/database';
import { ProductOptions } from '@/types/components';
import { Badge } from '@/components/ui/Badge';

// Mock cart functionality for demo
const useCart = () => {
  const addToCart = (product: Product, options: ProductOptions) => {
    console.log('Adding to cart:', product.name, options);
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

export default function CategoriaPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categoryId = params.id as string;

  // Redirect to home page with category filter
  React.useEffect(() => {
    window.location.href = `/?categoria=${categoryId}`;
  }, [categoryId]);

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

  // Find current category
  const currentCategory = useMemo(() => 
    categories.find(cat => cat.id === categoryId),
    [categories, categoryId]
  );

  // Filter products by category
  const categoryProducts = useMemo(() => 
    products.filter(product => product.category_id === categoryId),
    [products, categoryId]
  );

  // Handle product quick view
  const handleQuickView = (product: Product) => {
    console.log('Quick view:', product.name);
    alert(`Visualização rápida: ${product.name}`);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    saveSearch(query);
    loadSuggestions(query);
  };

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: 'Produtos', href: '/produtos' },
    { label: 'Categorias', href: '/categorias' },
    { 
      label: currentCategory?.name || 'Categoria', 
      current: true,
      icon: currentCategory?.icon ? <span>{currentCategory.icon}</span> : undefined
    }
  ];

  if (loading && !currentCategory) {
    return (
      <MainLayout>
        <Container className="py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-6 bg-gray-200 rounded w-64" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80" />
              ))}
            </div>
          </div>
        </Container>
      </MainLayout>
    );
  }

  if (!currentCategory && !loading) {
    return (
      <MainLayout>
        <Container className="py-8">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">❓</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Categoria não encontrada
            </h1>
            <p className="text-gray-600">
              A categoria que você está procurando não existe ou foi removida.
            </p>
          </div>
        </Container>
      </MainLayout>
    );
  }

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