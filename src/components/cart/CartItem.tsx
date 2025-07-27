'use client';

import React from 'react';
import { Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LazyImage } from '@/components/ui/LazyImage';
import { QuantityControl } from '@/components/products/QuantityControl';
import { CartItemProps } from '@/types/components';
import { cn, formatCurrency } from '@/lib/utils';

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  isEditable = true,
  showImage = true,
  className
}) => {
  const { product, options } = item;

  // Format customizations for display
  const formatCustomizations = () => {
    if (!options.customizations || options.customizations.length === 0) {
      return null;
    }

    const customizationGroups: Record<string, { name: string; items: string[] }> = {};

    // Group customizations by type
    options.customizations.forEach((customization) => {
      const key = customization.customizationId;
      if (!customizationGroups[key]) {
        customizationGroups[key] = {
          name: customization.customizationName || 'Personalização',
          items: []
        };
      }
      customizationGroups[key].items.push(...customization.optionNames);
    });

    return Object.values(customizationGroups).map((group, index) => (
      <div key={index} className="text-xs text-gray-600">
        <span className="font-medium">{group.name}:</span>{' '}
        {group.items.join(', ')}
      </div>
    ));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      onRemove();
    } else {
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg p-4', className)}>
      <div className="flex gap-3">
        {/* Product Image */}
        {showImage && (
          <div className="flex-shrink-0">
            <LazyImage
              src={product.image_url || '/placeholder-product.jpg'}
              alt={product.name}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-sm leading-tight">
                {product.name}
              </h3>
              
              {/* Size */}
              {options.sizeId && (
                <Badge variant="default" size="sm" className="mt-1">
                  {/* TODO: Get size name from sizeId */}
                  Tamanho Personalizado
                </Badge>
              )}

              {/* Customizations */}
              <div className="mt-2 space-y-1">
                {formatCustomizations()}
              </div>

              {/* Notes */}
              {options.notes && (
                <div className="mt-2 text-xs text-gray-600 bg-gray-50 rounded p-2">
                  <span className="font-medium">Observações:</span> {options.notes}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {isEditable && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {/* TODO: Open edit modal */}}
                    className="p-1 h-auto text-gray-400 hover:text-primary-600"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRemove}
                    className="p-1 h-auto text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Quantity and Price */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              {isEditable ? (
                <QuantityControl
                  value={options.quantity}
                  min={1}
                  max={10}
                  onChange={handleQuantityChange}
                  size="sm"
                />
              ) : (
                <span className="text-sm text-gray-600">
                  Qtd: {options.quantity}
                </span>
              )}
            </div>

            <div className="text-right">
              {options.quantity > 1 && (
                <div className="text-xs text-gray-500">
                  {formatCurrency(item.unitPrice)} × {options.quantity}
                </div>
              )}
              <div className="font-semibold text-gray-900">
                {formatCurrency(item.totalPrice)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;