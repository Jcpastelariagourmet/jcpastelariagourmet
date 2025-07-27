import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingCart, 
  Clock, 
  Minus, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  ZoomIn,
  Info,
  MessageSquare,
  ThumbsUp,
  Camera
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { 
  Product, 
  ProductOptions, 
  ProductSize, 
  ProductCustomization, 
  CustomizationOption,
  Review,
  SelectedCustomization 
} from '@/types/database';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LazyImage } from '@/components/ui/LazyImage';
import { ProductCustomizer, CustomizationSelection } from './ProductCustomizer';
import { QuantityControl } from './QuantityControl';

export interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, options: ProductOptions) => void;
  onFavoriteToggle?: (product: Product) => void;
  isFavorite?: boolean;
  sizes?: ProductSize[];
  customizations?: ProductCustomization[];
  reviews?: Review[];
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onFavoriteToggle,
  isFavorite = false,
  sizes = [],
  customizations = [],
  reviews = []
}) => {
  // State for product options
  const [selectedOptions, setSelectedOptions] = useState<ProductOptions>({
    sizeId: sizes.length > 0 ? sizes[0].id : undefined,
    customizations: [],
    quantity: 1,
    notes: ''
  });
  
  // State for new customization system
  const [customizationSelections, setCustomizationSelections] = useState<CustomizationSelection[]>([]);

  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageZoom, setShowImageZoom] = useState(false);

  // State for tabs
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Reset state when modal opens/closes or product changes
  useEffect(() => {
    if (isOpen) {
      setSelectedOptions({
        sizeId: sizes.length > 0 ? sizes[0].id : undefined,
        customizations: [],
        quantity: 1,
        notes: ''
      });
      setCustomizationSelections([]);
      setCurrentImageIndex(0);
      setActiveTab('details');
    }
  }, [isOpen, product.id, sizes]);

  // Get all product images
  const productImages = useMemo(() => {
    const images = [product.image_url || '/placeholder-product.jpg'];
    if (product.images && product.images.length > 0) {
      images.push(...product.images);
    }
    return images.filter(Boolean);
  }, [product.image_url, product.images]);

  // Calculate final price based on selected options
  const finalPrice = useMemo(() => {
    let basePrice = product.discountedPrice || product.price;
    
    // Add size modifier
    if (selectedOptions.sizeId) {
      const selectedSize = sizes.find(size => size.id === selectedOptions.sizeId);
      if (selectedSize) {
        basePrice += selectedSize.price_modifier || 0;
      }
    }

    // Add customization modifiers with quantities
    customizationSelections.forEach(selection => {
      const customizationConfig = customizations.find(c => c.id === selection.customizationId);
      if (customizationConfig?.options) {
        const option = customizationConfig.options.find(o => o.id === selection.optionId);
        if (option) {
          basePrice += (option.price_modifier || 0) * selection.quantity;
        }
      }
    });

    return basePrice * selectedOptions.quantity;
  }, [product.price, product.discountedPrice, selectedOptions.quantity, customizationSelections, sizes, customizations]);

  // Handle size selection
  const handleSizeChange = (sizeId: string) => {
    setSelectedOptions(prev => ({ ...prev, sizeId }));
  };

  // Handle customization change
  const handleCustomizationChange = (customizationId: string, optionIds: string[]) => {
    setSelectedOptions(prev => ({
      ...prev,
      customizations: prev.customizations
        .filter(c => c.customizationId !== customizationId)
        .concat({ customizationId, optionIds })
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (delta: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta)
    }));
  };

  // Handle add to cart
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

    const finalOptions: ProductOptions = {
      ...selectedOptions,
      customizations: Object.values(customizationGroups)
    };

    onAddToCart(product, finalOptions);
    onClose();
  };

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    onFavoriteToggle?.(product);
  };

  // Navigate images
  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? productImages.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === productImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        )}
      />
    ));
  };

  // Render nutritional info
  const renderNutritionalInfo = () => {
    if (!product.nutritional_info) return null;

    const info = product.nutritional_info as any;
    return (
      <div className="grid grid-cols-2 gap-4 text-sm">
        {info.calories && (
          <div className="flex justify-between">
            <span>Calorias:</span>
            <span className="font-medium">{info.calories} kcal</span>
          </div>
        )}
        {info.protein && (
          <div className="flex justify-between">
            <span>Proteínas:</span>
            <span className="font-medium">{info.protein}g</span>
          </div>
        )}
        {info.carbs && (
          <div className="flex justify-between">
            <span>Carboidratos:</span>
            <span className="font-medium">{info.carbs}g</span>
          </div>
        )}
        {info.fat && (
          <div className="flex justify-between">
            <span>Gorduras:</span>
            <span className="font-medium">{info.fat}g</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        closeOnOverlayClick={true}
        showCloseButton={false}
      >
        <div className="flex flex-col lg:flex-row gap-6 max-h-[80vh] overflow-hidden">
          {/* Left Side - Image Gallery */}
          <div className="lg:w-1/2">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <LazyImage
                src={productImages[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Image Navigation */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Zoom Button */}
              <button
                onClick={() => setShowImageZoom(true)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && (
                  <Badge variant="success" size="sm">
                    Novo
                  </Badge>
                )}
                {product.isPopular && (
                  <Badge variant="primary" size="sm">
                    Popular
                  </Badge>
                )}
                {product.discountedPrice && (
                  <Badge variant="error" size="sm">
                    Oferta
                  </Badge>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors',
                      index === currentImageIndex
                        ? 'border-primary-500'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <LazyImage
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Details */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                
                {/* Rating and Reviews */}
                {product.rating && product.rating > 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm font-medium">
                      {product.rating.toFixed(1)}
                    </span>
                    {product.reviews_count && product.reviews_count > 0 && (
                      <span className="text-sm text-gray-500">
                        ({product.reviews_count} avaliações)
                      </span>
                    )}
                  </div>
                )}

                {/* Preparation Time */}
                {product.preparation_time && (
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Tempo de preparo: {product.preparation_time} min</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Favorite Button */}
                {onFavoriteToggle && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFavoriteToggle}
                    className={cn(
                      'w-10 h-10 p-0',
                      isFavorite && 'text-red-500'
                    )}
                  >
                    <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
                  </Button>
                )}

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="w-10 h-10 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-6">
              {product.discountedPrice ? (
                <>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatCurrency(product.discountedPrice)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatCurrency(product.price)}
                  </span>
                  <Badge variant="error" size="sm">
                    {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                  </Badge>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={cn(
                  'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                  activeTab === 'details'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                )}
              >
                <Info className="w-4 h-4 inline mr-2" />
                Detalhes
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={cn(
                  'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                  activeTab === 'reviews'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                )}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Avaliações ({reviews.length})
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>

                  {/* Size Selection */}
                  {sizes.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Tamanho</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size.id}
                            onClick={() => handleSizeChange(size.id)}
                            className={cn(
                              'p-3 text-sm border rounded-lg transition-colors',
                              selectedOptions.sizeId === size.id
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-gray-200 hover:border-gray-300'
                            )}
                          >
                            <div className="font-medium">{size.name}</div>
                            {size.price_modifier !== 0 && (
                              <div className="text-xs text-gray-500">
                                {size.price_modifier > 0 ? '+' : ''}
                                {formatCurrency(size.price_modifier)}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Customizations with Quantity Controls */}
                  {customizations.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Personalize seu Pedido</h3>
                      <ProductCustomizer
                        customizations={customizations}
                        selections={customizationSelections}
                        onSelectionChange={setCustomizationSelections}
                      />
                    </div>
                  )}

                  {/* Nutritional Information */}
                  {product.nutritional_info && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Informações Nutricionais</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {renderNutritionalInfo()}
                      </div>
                    </div>
                  )}

                  {/* Allergens */}
                  {product.allergens && product.allergens.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Alérgenos</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.allergens.map((allergen) => (
                          <Badge key={allergen} variant="warning" size="sm">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Notes */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Observações Especiais</h3>
                    <textarea
                      value={selectedOptions.notes || ''}
                      onChange={(e) => setSelectedOptions(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Alguma observação especial para seu pedido?"
                      className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {review.user?.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">
                                {review.user?.name || 'Usuário'}
                              </span>
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            {review.comment && (
                              <p className="text-gray-600 mb-2">{review.comment}</p>
                            )}
                            {review.images && review.images.length > 0 && (
                              <div className="flex gap-2 mb-2">
                                {review.images.map((image, index) => (
                                  <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                                    <LazyImage
                                      src={image}
                                      alt={`Review image ${index + 1}`}
                                      width={64}
                                      height={64}
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{new Date(review.created_at).toLocaleDateString('pt-BR')}</span>
                              {review.is_verified && (
                                <Badge variant="success" size="sm">
                                  Compra verificada
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Nenhuma avaliação ainda
                      </h3>
                      <p className="text-gray-600">
                        Seja o primeiro a avaliar este produto!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              {/* Quantity and Price */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Quantidade:</span>
                  <QuantityControl
                    value={selectedOptions.quantity}
                    min={1}
                    max={10}
                    onChange={(quantity) => setSelectedOptions(prev => ({ ...prev, quantity }))}
                    size="md"
                  />
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="text-xl font-bold text-primary-600">
                    {formatCurrency(finalPrice)}
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={!product.is_available}
                className="h-12"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.is_available ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Image Zoom Modal */}
      {showImageZoom && (
        <Modal
          isOpen={showImageZoom}
          onClose={() => setShowImageZoom(false)}
          size="xl"
          closeOnOverlayClick={true}
          showCloseButton={true}
        >
          <div className="relative">
            <LazyImage
              src={productImages[currentImageIndex]}
              alt={product.name}
              width={800}
              height={600}
              className="object-contain max-h-[70vh] mx-auto"
            />
            
            {productImages.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'w-3 h-3 rounded-full transition-colors',
                      index === currentImageIndex
                        ? 'bg-primary-500'
                        : 'bg-gray-300 hover:bg-gray-400'
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProductModal;