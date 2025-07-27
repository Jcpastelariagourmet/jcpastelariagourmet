'use client';

import React from 'react';
import { ProductCatalogWithSimpleModal } from '@/components/products/ProductCatalogWithSimpleModal';
import { CategoryNavigation } from '@/components/categories';
import { Container } from '@/components/layout/Container';
import { useProducts, useProductSearch } from '@/hooks/useProducts';
import { MainLayout } from '@/components/layout/MainLayout';
import { Product } from '@/types/database';
import { ProductOptions } from '@/types/components';

// Mock cart functionality
const useCart = () => {
  const addToCart = (product: Product, options: ProductOptions) => {
    console.log('Produto adicionado ao carrinho:', {
      product: product.name,
      price: product.price,
      quantity: options.quantity,
      customizations: options.customizations,
      notes: options.notes,
      total: (product.discountedPrice || product.price) * options.quantity
    });
    
    // Simular feedback visual
    const customizationsText = options.customizations?.length 
      ? `\nPersonalizações: ${options.customizations.length} itens`
      : '';
    
    const notesText = options.notes 
      ? `\nObservações: ${options.notes}`
      : '';
    
    alert(`✅ Adicionado ao carrinho!\n\n${product.name}\nQuantidade: ${options.quantity}${customizationsText}${notesText}`);
  };

  return { addToCart };
};

// Mock favorites functionality
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

export default function TestCatalogSimplePage() {
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

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    saveSearch(query);
    loadSuggestions(query);
  };

  return (
    <MainLayout showBreadcrumb={false}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <Container className="py-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Catálogo com Modal Simplificado
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Versão otimizada do catálogo usando o modal simplificado para visualização de produtos
              </p>
            </div>
          </Container>
        </div>

        {/* Category Navigation */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <Container className="py-4">
            <CategoryNavigation
              categories={categories}
              showAll={true}
              layout="horizontal"
              showProductCounts={true}
            />
          </Container>
        </div>

        {/* Main Catalog */}
        <div className="py-8">
          <ProductCatalogWithSimpleModal
            products={products}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
            onAddToCart={addToCart}
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
                <strong>💡 Como testar:</strong> Clique em qualquer produto para abrir o modal simplificado
              </p>
              <p>
                <strong>🔍 Funcionalidades:</strong> Busca, navegação por categorias, modal com complementos e carrinho
              </p>
              <p>
                <strong>📱 Responsivo:</strong> Funciona perfeitamente em mobile, tablet e desktop
              </p>
            </div>
          </Container>
        </div>
      </div>
    </MainLayout>
  );
}