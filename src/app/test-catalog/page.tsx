'use client';

import React, { useState } from 'react';
import { ProductCatalog } from '@/components/products/ProductCatalog';
import { EnhancedProductCatalog } from '@/components/products/EnhancedProductCatalog';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Product } from '@/types/database';
import { ProductOptions } from '@/types/components';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/layout/Container';

export default function TestCatalogPage() {
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>(['2', '5']);
  const [useEnhanced, setUseEnhanced] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (product: Product, options: ProductOptions) => {
    console.log('Adding to cart:', product.name, options);
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const handleQuickView = (product: Product) => {
    console.log('Quick view:', product.name);
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
    console.log('Search:', query);
    // Simulate search loading
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const mockSearchSuggestions = [
    {
      id: '1',
      type: 'product' as const,
      title: 'Pastel de Carne',
      subtitle: 'Pastel tradicional com recheio de carne moída',
      category: 'Pastéis Salgados'
    },
    {
      id: '2',
      type: 'category' as const,
      title: 'Pastéis Salgados',
      subtitle: '4 produtos'
    }
  ];

  const mockRecentSearches = [
    'Pastel de carne',
    'Refrigerante',
    'Combo família'
  ];

  const mockTrendingSearches = [
    'Combo tradicional',
    'Pastel de frango',
    'Suco natural'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Teste do Catálogo de Produtos
            </h1>
            <div className="flex items-center gap-4">
              <Badge variant="info" size="md">
                {mockProducts.length} produtos
              </Badge>
              <Button
                variant={useEnhanced ? 'primary' : 'outline'}
                onClick={() => setUseEnhanced(!useEnhanced)}
              >
                {useEnhanced ? 'Versão Básica' : 'Versão Avançada'}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{mockProducts.length}</div>
              <div className="text-sm text-gray-600">Total de Produtos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{mockCategories.length}</div>
              <div className="text-sm text-gray-600">Categorias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{favoriteProductIds.length}</div>
              <div className="text-sm text-gray-600">Favoritos</div>
            </div>
          </div>
        </div>

        {/* Data Source Status */}
        <div className="mb-8 p-6 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Status da Fonte de Dados</h2>
            <a 
              href="/test-supabase" 
              className="text-blue-600 hover:underline text-sm"
            >
              Testar Conexão Supabase →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                isSupabaseConfigured ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              <div>
                <div className="font-medium">
                  {isSupabaseConfigured ? 'Dados Reais (Supabase)' : 'Dados Mock (Desenvolvimento)'}
                </div>
                <div className="text-sm text-gray-600">
                  {isSupabaseConfigured 
                    ? 'Conectado ao banco de dados real'
                    : 'Configure as variáveis de ambiente para usar dados reais'
                  }
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <div>
                <div className="font-medium">Catálogo Funcional</div>
                <div className="text-sm text-gray-600">
                  Todas as funcionalidades implementadas e testadas
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Implemented */}
        <div className="mb-8 p-6 bg-white rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Funcionalidades Implementadas ✅</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">✓</Badge>
                <span className="text-sm">ProductCard com imagem, preço, avaliações</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">✓</Badge>
                <span className="text-sm">ProductGrid responsivo com paginação</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">✓</Badge>
                <span className="text-sm">Sistema de filtros (categoria, preço, avaliação)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">✓</Badge>
                <span className="text-sm">Barra de busca com autocomplete</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">✓</Badge>
                <span className="text-sm">Ordenação de produtos (preço, popularidade, avaliação)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">✓</Badge>
                <span className="text-sm">Lazy loading para imagens de produtos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Component */}
        {useEnhanced ? (
          <EnhancedProductCatalog
            products={mockProducts}
            categories={mockCategories}
            loading={loading}
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
            onFavoriteToggle={handleFavoriteToggle}
            favoriteProductIds={favoriteProductIds}
            onSearch={handleSearch}
            searchSuggestions={mockSearchSuggestions}
            recentSearches={mockRecentSearches}
            trendingSearches={mockTrendingSearches}
            enableVirtualization={true}
            enablePerformanceMode={true}
          />
        ) : (
          <ProductCatalog
            products={mockProducts}
            categories={mockCategories}
            loading={loading}
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
            onFavoriteToggle={handleFavoriteToggle}
            favoriteProductIds={favoriteProductIds}
            onSearch={handleSearch}
            searchSuggestions={mockSearchSuggestions}
            recentSearches={mockRecentSearches}
            trendingSearches={mockTrendingSearches}
          />
        )}
      </Container>
    </div>
  );
}