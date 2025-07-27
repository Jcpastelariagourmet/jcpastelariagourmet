import React, { useState, useMemo } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { Product, ProductOptions } from '@/types/database';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { LazyImage } from '@/components/ui/LazyImage';
import { ProductCustomizer, CustomizationSelection } from './ProductCustomizer';
import { QuantityControl } from './QuantityControl';

export interface SimpleProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, options: ProductOptions) => void;
}

export const SimpleProductModal: React.FC<SimpleProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  // Estados
  const [quantity, setQuantity] = useState(1);
  const [customizationSelections, setCustomizationSelections] = useState<CustomizationSelection[]>([]);
  const [notes, setNotes] = useState('');

  // Calcular preço final
  const finalPrice = useMemo(() => {
    let basePrice = product.discountedPrice || product.price;
    
    // Adicionar modificadores de customização com quantidades (apenas itens com quantidade > 0)
    customizationSelections
      .filter(selection => selection.quantity > 0)
      .forEach(selection => {
        const customization = product.customizations?.find(c => c.id === selection.customizationId);
        if (customization?.options) {
          const option = customization.options.find(o => o.id === selection.optionId);
          if (option) {
            basePrice += (option.price_modifier || 0) * selection.quantity;
          }
        }
      });

    return basePrice * quantity;
  }, [product.price, product.discountedPrice, quantity, customizationSelections, product.customizations]);

  // Resetar estado quando modal abre
  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setCustomizationSelections([]);
      setNotes('');
    }
  }, [isOpen, product.id]);

  // Adicionar ao carrinho
  const handleAddToCart = () => {
    // Group customizations by customizationId and collect all selected options
    const customizationGroups: Record<string, { 
      customizationId: string; 
      customizationName: string; 
      optionIds: string[]; 
      optionNames: string[] 
    }> = {};

    customizationSelections
      .filter(selection => selection.quantity > 0)
      .forEach(selection => {
        const customization = product.customizations?.find(c => c.id === selection.customizationId);
        const option = customization?.options?.find(o => o.id === selection.optionId);
        
        if (customization && option) {
          if (!customizationGroups[selection.customizationId]) {
            customizationGroups[selection.customizationId] = {
              customizationId: selection.customizationId,
              customizationName: customization.name,
              optionIds: [],
              optionNames: []
            };
          }
          
          // Add option multiple times based on quantity
          for (let i = 0; i < selection.quantity; i++) {
            customizationGroups[selection.customizationId].optionIds.push(option.id);
            customizationGroups[selection.customizationId].optionNames.push(option.name);
          }
        }
      });

    const options: ProductOptions = {
      quantity,
      notes,
      customizations: Object.values(customizationGroups)
    };

    onAddToCart(product, options);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      closeOnOverlayClick={true}
      showCloseButton={false}
    >
      <div className="relative max-h-[90vh] overflow-y-auto">
        {/* Header com botão fechar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 truncate pr-4">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Imagem do Produto */}
          <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
            <LazyImage
              src={product.image_url || '/placeholder-product.jpg'}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Descrição */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            
            {/* Informações adicionais */}
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              {product.preparation_time && (
                <span>⏱️ {product.preparation_time} min</span>
              )}
              {product.rating && (
                <span>⭐ {product.rating}/5</span>
              )}
              {product.allergens && product.allergens.length > 0 && (
                <span>⚠️ Contém: {product.allergens.join(', ')}</span>
              )}
            </div>
          </div>

          {/* Complementos */}
          {product.customizations && product.customizations.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Personalize seu Pedido</h3>
              <ProductCustomizer
                customizations={product.customizations}
                selections={customizationSelections}
                onSelectionChange={setCustomizationSelections}
              />
            </div>
          )}

          {/* Caixa de Observações */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Observações</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Alguma observação especial? (Ex: sem cebola, bem passado, etc.)"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              maxLength={200}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {notes.length}/200 caracteres
            </div>
          </div>

          {/* Quantidade e Preço */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Quantidade:</span>
              <QuantityControl
                value={quantity}
                min={1}
                max={10}
                onChange={setQuantity}
                size="md"
              />
            </div>

            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-gray-900">Total:</span>
              <div className="text-right">
                <div className="font-bold text-primary-600">
                  {formatCurrency(finalPrice)}
                </div>
                {quantity > 1 && (
                  <div className="text-sm text-gray-500">
                    {formatCurrency(finalPrice / quantity)} × {quantity}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botão Adicionar ao Carrinho */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleAddToCart}
            disabled={!product.is_available}
            className="h-12 text-lg font-semibold"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {product.is_available 
              ? `Adicionar ao Carrinho - ${formatCurrency(finalPrice)}`
              : 'Produto Indisponível'
            }
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SimpleProductModal;