'use client';

import React, { useState } from 'react';
import { ProductModal } from '@/components/products/ProductModal';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { mockProducts } from '@/lib/mock-data';
import { 
  Product, 
  ProductSize, 
  ProductCustomization,
  Review 
} from '@/types/database';
import { ProductOptions } from '@/types/components';

// Use mock data with customizations
const mockProduct = mockProducts[0]; // Pastel de Carne with customizations

if (!mockProduct) {
  throw new Error('Mock product not found');
}

const mockSizes: ProductSize[] = [
  {
    id: 'size-small',
    product_id: '1',
    name: 'Pequeno',
    price_modifier: -2.00,
    description: 'Ideal para lanche',
    is_available: true
  },
  {
    id: 'size-medium',
    product_id: '1',
    name: 'Médio',
    price_modifier: 0,
    description: 'Tamanho tradicional',
    is_available: true
  },
  {
    id: 'size-large',
    product_id: '1',
    name: 'Grande',
    price_modifier: 3.00,
    description: 'Para quem tem mais fome',
    is_available: true
  }
];

// Usando as customizações que vêm do mock-data.ts

const mockReviews: Review[] = [
  {
    id: 'review-1',
    user_id: 'user-1',
    product_id: '1',
    order_id: 'order-1',
    rating: 5,
    comment: 'Simplesmente perfeito! O frango estava suculento e o catupiry na medida certa. Já virou meu favorito!',
    images: [],
    is_verified: true,
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    user: {
      id: 'user-1',
      name: 'Maria Silva',
      email: 'maria@example.com',
      phone: null,
      avatar_url: null,
      points: 1250,
      level: 'gold',
      total_spent: 89.50,
      orders_count: 8,
      preferences: {},
      is_active: true,
      email_verified: true,
      phone_verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: 'review-2',
    user_id: 'user-2',
    product_id: '1',
    order_id: 'order-2',
    rating: 4,
    comment: 'Muito bom! Só achei que poderia ter um pouco mais de recheio, mas o sabor estava excelente.',
    images: [],
    is_verified: true,
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    user: {
      id: 'user-2',
      name: 'João Santos',
      email: 'joao@example.com',
      phone: null,
      avatar_url: null,
      points: 850,
      level: 'silver',
      total_spent: 45.20,
      orders_count: 4,
      preferences: {},
      is_active: true,
      email_verified: true,
      phone_verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: 'review-3',
    user_id: 'user-3',
    product_id: '1',
    order_id: 'order-3',
    rating: 5,
    comment: 'Entrega rápida e pastel quentinho! A massa estava crocante e o recheio delicioso. Recomendo!',
    images: [],
    is_verified: true,
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 259200000).toISOString(),
    user: {
      id: 'user-3',
      name: 'Ana Costa',
      email: 'ana@example.com',
      phone: null,
      avatar_url: null,
      points: 2100,
      level: 'diamond',
      total_spent: 156.80,
      orders_count: 15,
      preferences: {},
      is_active: true,
      email_verified: true,
      phone_verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
];

export default function TestProductModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (product: Product, options: ProductOptions) => {
    console.log('Adding to cart:', {
      product: product.name,
      options
    });
    alert(`${product.name} adicionado ao carrinho!\n\nOpções selecionadas:\n${JSON.stringify(options, null, 2)}`);
  };

  const handleQuickView = (product: Product) => {
    setIsModalOpen(true);
  };

  const handleFavoriteToggle = (product: Product) => {
    setIsFavorite(!isFavorite);
    console.log('Favorite toggled:', product.name, !isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Teste do Modal de Produto
          </h1>
          <p className="text-gray-600 mb-6">
            Esta página demonstra o funcionamento completo do modal de detalhes do produto,
            incluindo galeria de imagens, customizações, avaliações e calculadora de preço.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Card */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Card do Produto
            </h2>
            <ProductCard
              product={mockProduct}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
              onFavoriteToggle={handleFavoriteToggle}
              isFavorite={isFavorite}
            />
          </div>

          {/* Controls */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Controles de Teste
            </h2>
            <div className="space-y-4">
              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                fullWidth
              >
                Abrir Modal do Produto
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setIsFavorite(!isFavorite)}
                fullWidth
              >
                {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </Button>

              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Funcionalidades Implementadas:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ Galeria de imagens com navegação</li>
                  <li>✅ Zoom de imagem em modal separado</li>
                  <li>✅ Seleção de tamanhos</li>
                  <li>✅ Customizações (single e multiple)</li>
                  <li>✅ Calculadora de preço em tempo real</li>
                  <li>✅ Controle de quantidade</li>
                  <li>✅ Informações nutricionais</li>
                  <li>✅ Lista de alérgenos</li>
                  <li>✅ Seção de avaliações</li>
                  <li>✅ Campo de observações especiais</li>
                  <li>✅ Botão de favoritos</li>
                  <li>✅ Validações de disponibilidade</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Product Modal */}
        <ProductModal
          product={mockProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleAddToCart}
          onFavoriteToggle={handleFavoriteToggle}
          isFavorite={isFavorite}
          sizes={mockSizes}
          customizations={mockProduct.customizations || []}
          reviews={mockReviews}
        />
      </div>
    </div>
  );
}