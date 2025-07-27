'use client';

import React, { useState } from 'react';
import { SimpleProductModal } from '@/components/products/SimpleProductModal';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { mockProducts } from '@/lib/mock-data';
import { Product } from '@/types/database';
import { ProductOptions } from '@/types/components';

export default function TestSimpleModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(mockProducts[0]!);

  // Mock função adicionar ao carrinho
  const handleAddToCart = (product: Product, options: ProductOptions) => {
    console.log('Produto adicionado ao carrinho:', {
      product: product.name,
      quantity: options.quantity,
      customizations: options.customizations,
      notes: options.notes,
      options
    });
    
    // Simular feedback visual
    alert(`✅ ${product.name} adicionado ao carrinho!\n\nQuantidade: ${options.quantity}\nObservações: ${options.notes || 'Nenhuma'}\nPersonalizações: ${options.customizations?.length || 0}`);
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Modal Simplificado de Produto
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Versão focada com: imagem, descrição, complementos, observações e botão de adicionar ao carrinho
          </p>
        </div>

        {/* Produtos para Teste */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockProducts.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img
                  src={product.image_url || '/placeholder-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-primary-600">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </div>
                
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openModal(product)}
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de Teste Direto */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => openModal(mockProducts[0]!)}
            className="mb-4"
          >
            🍽️ Abrir Modal - Pastel de Carne (com complementos)
          </Button>
          
          <div className="text-sm text-gray-600 max-w-md mx-auto">
            <p className="mb-2">
              <strong>Teste as funcionalidades:</strong>
            </p>
            <ul className="text-left space-y-1">
              <li>• Visualização da imagem e descrição</li>
              <li>• Seleção de sabores, molhos e adicionais</li>
              <li>• Controles de quantidade (+ e -)</li>
              <li>• Caixa de observações personalizadas</li>
              <li>• Cálculo de preço em tempo real</li>
              <li>• Botão de adicionar ao carrinho</li>
            </ul>
          </div>
        </div>

        {/* Informações de Debug */}
        <div className="mt-8 bg-white rounded-lg border p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            💡 Informações de Desenvolvimento
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Produto Atual:</strong> {selectedProduct.name}</p>
            <p><strong>Customizações:</strong> {selectedProduct.customizations?.length || 0} tipos disponíveis</p>
            <p><strong>Console:</strong> Abra o console do navegador para ver os dados do carrinho</p>
          </div>
        </div>
      </div>

      {/* Modal Simplificado */}
      <SimpleProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}