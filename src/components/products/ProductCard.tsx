import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Clock, Eye } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { Product, ProductOptions } from '@/types/database';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { LazyImage } from '@/components/ui/LazyImage';

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, options: ProductOptions) => void;
  onQuickView: (product: Product) => void;
  onFavoriteToggle?: (product: Product) => void;
  isFavorite?: boolean;
  isLoading?: boolean;
  showQuickActions?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onFavoriteToggle,
  isFavorite = false,
  isLoading = false,
  showQuickActions = true,
  className
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultOptions: ProductOptions = {
      customizations: [],
      quantity: 1
    };
    onAddToCart(product, defaultOptions);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(product);
  };

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

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        isLoading && 'opacity-50 pointer-events-none',
        className
      )}
      onClick={handleQuickView}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <LazyImage
          src={product.image_url || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className={cn(
            'object-cover transition-all duration-300 group-hover:scale-105'
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          rootMargin="100px"
          threshold={0.1}
        />

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

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {onFavoriteToggle && (
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'w-8 h-8 p-0 bg-white/90 hover:bg-white shadow-sm',
                  isFavorite && 'text-red-500'
                )}
                onClick={handleFavoriteToggle}
              >
                <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 bg-white/90 hover:bg-white shadow-sm"
              onClick={handleQuickView}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Availability overlay */}
        {!product.is_available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="error" size="lg">
              Indisponível
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* Rating and Reviews */}
          {product.rating && product.rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating.toFixed(1)}
              </span>
              {product.reviews_count && product.reviews_count > 0 && (
                <span className="text-sm text-gray-500">
                  ({product.reviews_count})
                </span>
              )}
            </div>
          )}

          {/* Preparation Time */}
          {product.preparation_time && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{product.preparation_time} min</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.discountedPrice ? (
                <>
                  <span className="text-lg font-bold text-primary-600">
                    {formatCurrency(product.discountedPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        {product.is_available && (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;