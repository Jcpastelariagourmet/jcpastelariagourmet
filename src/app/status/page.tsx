'use client';

import React from 'react';
import { APP_CONFIG } from '@/utils/constants';

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">JC</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {APP_CONFIG.name}
          </h1>
          <p className="text-gray-600">{APP_CONFIG.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-green-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Sistema Funcionando
            </h3>
            <ul className="text-sm text-green-700 space-y-2">
              <li>✅ Carrinho de Compras</li>
              <li>✅ Sistema de Complementos</li>
              <li>✅ Controles de Quantidade</li>
              <li>✅ Cálculo de Preços</li>
              <li>✅ Sistema de Cupons</li>
              <li>✅ Persistência Local</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Produtos com Complementos
            </h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>🥟 Pastéis Salgados (4)</li>
              <li>🍰 Pastéis Doces (2)</li>
              <li>🥤 Bebidas (2)</li>
              <li>🍽️ Combos (2)</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-amber-800 mb-3">🛍️ Como Testar o Sistema:</h3>
          <ol className="text-sm text-amber-700 space-y-2">
            <li>1. Vá para a página principal</li>
            <li>2. Clique em qualquer pastel salgado</li>
            <li>3. Teste os complementos (Sabores, Adicionais, Molhos)</li>
            <li>4. Use os controles + e - para ajustar quantidades</li>
            <li>5. Veja o preço sendo calculado em tempo real</li>
            <li>6. Adicione ao carrinho e veja o drawer lateral</li>
            <li>7. Teste cupons: WELCOME10, FRETE5, PRIMEIRA</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="/" 
            className="flex-1 bg-primary text-white text-center py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            🏠 Página Principal
          </a>
          <a 
            href="/test" 
            className="flex-1 bg-accent text-white text-center py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors font-medium"
          >
            🧪 Página de Teste
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Versão {APP_CONFIG.version} • {APP_CONFIG.author}</p>
          <p className="mt-1">Sistema de Carrinho com Complementos - Implementado com Sucesso! 🎉</p>
        </div>
      </div>
    </div>
  );
}