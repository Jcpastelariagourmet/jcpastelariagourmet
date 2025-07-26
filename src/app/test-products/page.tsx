'use client';

import React from 'react';
import { ProductCard, ProductGrid, ProductFilters, ProductSearch } from '@/components/products';
import { Product, Category, ProductOptions } from '@/types/database';

// Mock data for testing
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Pastéis Salgados',
    description: 'Deliciosos pastéis salgados',
    icon: '🥟',
    color: '#FFC700',
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    productsCount: 4
  },
  {
    id: '2',
    name: 'Pastéis Doces',
    description: 'Pastéis doces irresistíveis',
    icon: '🍰',
    color: '#FF6B6B',
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    productsCount: 2
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pastel de Carne',
    description: 'Pastel tradicional com recheio de carne moída temperada com cebola e temperos especiais',
    price: 12.90,
    category_id: '1',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 25,
    rating: 4.5,
    reviews_count: 23,
    orders_count: 156,
    nutritional_info: { calories: 320, protein: 18, carbs: 28, fat: 16 },
    allergens: ['glúten'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    isPopular: true
  },
  {
    id: '2',
    name: 'Pastel de Queijo',
    description: 'Pastel cremoso com queijo mussarela derretido',
    price: 10.90,
    category_id: '1',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 20,
    rating: 4.2,
    reviews_count: 18,
    orders_count: 89,
    nutritional_info: { calories: 280, protein: 14, carbs: 26, fat: 14 },
    allergens: ['glúten', 'lactose'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Pastel de Frango com Catupiry',
    description: 'Pastel com frango desfiado e catupiry cremoso',
    price: 14.90,
    discountedPrice: 12.90,
    category_id: '1',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 30,
    rating: 4.8,
    reviews_count: 45,
    orders_count: 234,
    nutritional_info: { calories: 350, protein: 22, carbs: 28, fat: 18 },
    allergens: ['glúten', 'lactose'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    isNew: true
  },
  {
    id: '4',
    name: 'Pastel de Chocolate',
    description: 'Pastel doce com recheio cremoso de chocolate ao leite',
    price: 11.90,
    category_id: '2',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: false,
    preparation_time: 20,
    rating: 4.3,
    reviews_count: 12,
    orders_count: 67,
    nutritional_info: { calories: 380, protein: 8, carbs: 45, fat: 18 },
    allergens: ['glúten', 'lactose'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export default function TestProductsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filters, setFilters] = React.useState({
    sortBy: 'popularity' as const,
    sortOrder: 'desc' as const
  });

  const handleAddToCart = (product: Product, options: ProductOptions) => {
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const handleQuickView = (product: Product) => {
    alert(`Visualização rápida: ${product.name}`);
  };

  const handleFavoriteToggle = (product: Product) => {
    console.log('Toggle favorite:', product.name);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search:', query);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Teste dos Componentes de Produtos</h1>
        
        {/* Search Component */}
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Busca de Produtos</h2>
          <ProductSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            recentSearches={['Pastel de carne', 'Refrigerante']}
            trendingSearches={['Combo família', 'Pastel doce']}
          />
        </div>

        {/* Single Product Card */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Card de Produto</h2>
          <div className="max-w-sm">
            <ProductCard
              product={mockProducts[0]}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
              onFavoriteToggle={handleFavoriteToggle}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Grid de Produtos</h2>
          <ProductGrid
            products={mockProducts}
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
            onFavoriteToggle={handleFavoriteToggle}
            favoriteProductIds={['2']}
          />
        </div>

        {/* Filters */}
        <div className="max-w-sm">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <ProductFilters
            categories={mockCategories}
            filters={filters}
            onFiltersChange={setFilters}
            onReset={() => setFilters({ sortBy: 'popularity', sortOrder: 'desc' })}
          />
        </div>
      </div>
    </div>
  );
}