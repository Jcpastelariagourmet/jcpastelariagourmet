'use client';

import React from 'react';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          🎉 Sistema Funcionando!
        </h1>
        <p className="text-gray-600 mb-6">
          O sistema de carrinho com complementos foi implementado com sucesso!
        </p>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">✅ Implementado:</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Sistema de Carrinho Completo</li>
              <li>• Complementos para Pastéis Salgados</li>
              <li>• Complementos para Pastéis Doces</li>
              <li>• Opções para Bebidas</li>
              <li>• Controles de Quantidade</li>
              <li>• Cálculo de Preços</li>
              <li>• Sistema de Cupons</li>
              <li>• Persistência Local</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">🛍️ Produtos com Complementos:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Pastel de Carne (Sabores, Adicionais, Molhos)</li>
              <li>• Pastel de Queijo (Sabores, Adicionais, Molhos)</li>
              <li>• Pastel de Frango (Sabores, Adicionais, Molhos)</li>
              <li>• Pastel de Camarão (Sabores, Adicionais, Molhos)</li>
              <li>• Pastéis Doces (Complementos especiais)</li>
              <li>• Bebidas (Opções de temperatura)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <a 
            href="/" 
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            🏠 Ir para Página Principal
          </a>
        </div>
      </div>
    </div>
  );
}