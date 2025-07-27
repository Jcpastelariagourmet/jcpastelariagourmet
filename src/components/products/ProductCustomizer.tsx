import React from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import { ProductCustomization, CustomizationOption } from '@/types/database';
import { QuantityControl } from './QuantityControl';

export interface CustomizationSelection {
  customizationId: string;
  optionId: string;
  quantity: number;
}

export interface ProductCustomizerProps {
  customizations: ProductCustomization[];
  selections: CustomizationSelection[];
  onSelectionChange: (selections: CustomizationSelection[]) => void;
  className?: string;
}

export const ProductCustomizer: React.FC<ProductCustomizerProps> = ({
  customizations,
  selections,
  onSelectionChange,
  className
}) => {
  // Todos os itens agora têm controles de quantidade (+ e -)
  const handleSingleSelection = (customizationId: string, optionId: string) => {
    const newSelections = selections.filter(s => s.customizationId !== customizationId);
    newSelections.push({ customizationId, optionId, quantity: 1 });
    onSelectionChange(newSelections);
  };

  const handleMultipleSelection = (customizationId: string, optionId: string, checked: boolean) => {
    let newSelections = [...selections];
    
    if (checked) {
      newSelections.push({ customizationId, optionId, quantity: 1 });
    } else {
      newSelections = newSelections.filter(s => 
        !(s.customizationId === customizationId && s.optionId === optionId)
      );
    }
    
    onSelectionChange(newSelections);
  };

  const handleQuantityChangeForAll = (customizationId: string, optionId: string, quantity: number) => {
    if (quantity === 0) {
      // Remove item if quantity is 0
      const newSelections = selections.filter(s => 
        !(s.customizationId === customizationId && s.optionId === optionId)
      );
      onSelectionChange(newSelections);
    } else {
      // Check category limits before adding/updating
      const customization = customizations.find(c => c.id === customizationId);
      const currentCategorySelections = selections.filter(s => s.customizationId === customizationId);
      const existingSelection = currentCategorySelections.find(s => s.optionId === optionId);
      
      // If it's a new selection, check if we're within the max_selections limit
      if (!existingSelection && customization?.max_selections) {
        const currentCount = currentCategorySelections.length;
        if (currentCount >= customization.max_selections) {
          // Don't allow adding more items if limit is reached
          return;
        }
      }
      
      // Update or add item with new quantity
      const existingIndex = selections.findIndex(s => 
        s.customizationId === customizationId && s.optionId === optionId
      );
      
      let newSelections = [...selections];
      
      if (existingIndex >= 0) {
        newSelections[existingIndex] = { ...newSelections[existingIndex], quantity };
      } else {
        newSelections.push({ customizationId, optionId, quantity });
      }
      
      onSelectionChange(newSelections);
    }
  };

  const getSelection = (customizationId: string, optionId: string) => {
    return selections.find(s => s.customizationId === customizationId && s.optionId === optionId);
  };

  const getCustomizationIcon = (name: string) => {
    const icons: Record<string, string> = {
      'Sabores': '🌶️',
      'Molhos': '🥫',
      'Adicionais': '🧀',
      'Complementos': '🍟'
    };
    return icons[name] || '⚙️';
  };

  return (
    <div className={cn('space-y-6', className)}>
      {customizations
        .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
        .map((customization) => (
          <div key={customization.id} className="space-y-3">
            {/* Customization Header */}
            <div className="flex items-center gap-2">
              <span className="text-lg">{getCustomizationIcon(customization.name)}</span>
              <h3 className="font-semibold text-gray-900">
                {customization.name}
                {customization.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h3>
              {customization.max_selections && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Máx. {customization.max_selections} {customization.max_selections === 1 ? 'item' : 'itens'}
                  </span>
                  {/* Show current count */}
                  {(() => {
                    const currentCount = selections.filter(s => s.customizationId === customization.id).length;
                    return currentCount > 0 && (
                      <span className={cn(
                        'text-xs px-2 py-1 rounded',
                        currentCount >= (customization.max_selections || 0)
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      )}>
                        {currentCount}/{customization.max_selections}
                      </span>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-2">
              {customization.options
                ?.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                .map((option) => {
                  const selection = getSelection(customization.id, option.id);
                  const currentQuantity = selection?.quantity || 0;
                  const maxQuantity = (option as any).max_quantity || 10;
                  
                  // Check if category limit is reached for new selections
                  const currentCategorySelections = selections.filter(s => s.customizationId === customization.id);
                  const categoryLimitReached = customization.max_selections && 
                    currentCategorySelections.length >= customization.max_selections && 
                    currentQuantity === 0;

                  return (
                    <div
                      key={option.id}
                      className={cn(
                        'flex items-center justify-between p-3 border rounded-lg transition-colors',
                        currentQuantity > 0
                          ? 'border-primary-300 bg-primary-50' 
                          : categoryLimitReached
                          ? 'border-gray-200 bg-gray-50 opacity-60'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              'font-medium',
                              categoryLimitReached ? 'text-gray-500' : 'text-gray-900'
                            )}>
                              {option.name}
                            </span>
                            {option.price_modifier !== 0 && (
                              <span className={cn(
                                'text-sm font-medium',
                                option.price_modifier > 0 ? 'text-green-600' : 'text-red-600',
                                categoryLimitReached && 'opacity-60'
                              )}>
                                {option.price_modifier > 0 ? '+' : ''}
                                {formatCurrency(option.price_modifier)}
                                {currentQuantity > 1 && ` × ${currentQuantity}`}
                              </span>
                            )}
                          </div>
                          
                          <div className="text-xs text-gray-500 mt-1 space-y-1">
                            {maxQuantity > 1 && (
                              <div>Máximo: {maxQuantity} unidade{maxQuantity > 1 ? 's' : ''}</div>
                            )}
                            {categoryLimitReached && (
                              <div className="text-amber-600">
                                Limite de {customization.max_selections} {customization.name.toLowerCase()} atingido
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Control - Sempre visível */}
                      <div className="ml-3">
                        <QuantityControl
                          value={currentQuantity}
                          min={0}
                          max={maxQuantity}
                          onChange={(quantity) => 
                            handleQuantityChangeForAll(customization.id, option.id, quantity)
                          }
                          disabled={categoryLimitReached}
                          size="sm"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductCustomizer;