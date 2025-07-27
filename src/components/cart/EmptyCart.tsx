'use client';

import React from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface EmptyCartProps {
  onClose: () => void;
  className?: string;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({
  onClose,
  className
}) => {
  return (
    <div className={cn('flex-1 flex flex-col items-center justify-center p-8 text-center', className)}>
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ShoppingCart className="w-10 h-10 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Seu carrinho está vazio
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-sm">
        Adicione alguns deliciosos pastéis ao seu carrinho para começar seu pedido.
      </p>
      
      <Button
        variant="primary"
        onClick={onClose}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Continuar Comprando
      </Button>
      
      {/* Suggestions */}
      <div className="mt-8 text-left w-full max-w-sm">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Sugestões populares:
        </h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-primary-500 rounded-full" />
            <span>Pastel de Carne com Queijo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-primary-500 rounded-full" />
            <span>Pastel de Frango com Catupiry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-primary-500 rounded-full" />
            <span>Combo Família (4 pastéis)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;