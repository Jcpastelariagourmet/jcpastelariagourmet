import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Product, ProductOptions } from '@/types/database';
import { ProductCard } from './ProductCard';

export interface VirtualProductGridProps {
  products: Product[];
  loading?: boolean;
  onAddToCart: (product: Product, options: ProductOptions) => void;
  onQuickView: (product: Product) => void;
  onFavoriteToggle?: (product: Product) => void;
  favoriteProductIds?: string[];
  className?: string;
  itemsPerPage?: number;
  containerHeight?: number;
}

export const VirtualProductGrid: React.FC<VirtualProductGridProps> = ({
  products,
  loading = false,
  onAddToCart,
  onQuickView,
  onFavoriteToggle,
  favoriteProductIds = [],
  className,
  itemsPerPage = 20,
  containerHeight = 600
}) => {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for loading more items
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && visibleItems < products.length && !isLoadingMore) {
        setIsLoadingMore(true);
        // Simulate loading delay
        setTimeout(() => {
          setVisibleItems(prev => Math.min(prev + itemsPerPage, products.length));
          setIsLoadingMore(false);
        }, 300);
      }
    },
    [visibleItems, products.length, isLoadingMore, itemsPerPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '100px',
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection]);

  // Reset visible items when products change
  useEffect(() => {
    setVisibleItems(itemsPerPage);
  }, [products, itemsPerPage]);

  // Get visible products
  const visibleProducts = useMemo(() => {
    return products.slice(0, visibleItems);
  }, [products, visibleItems]);

  // Empty state
  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou buscar por outros termos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Loading State */}
      {loading && products.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
                <div className="h-5 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!loading && visibleProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onFavoriteToggle={onFavoriteToggle}
              isFavorite={favoriteProductIds.includes(product.id)}
            />
          ))}
        </div>
      )}

      {/* Load More Trigger */}
      {visibleItems < products.length && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isLoadingMore ? (
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
              Carregando mais produtos...
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              Mostrando {visibleItems} de {products.length} produtos
            </div>
          )}
        </div>
      )}

      {/* Loading More Indicator */}
      {loading && products.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
            Carregando mais produtos...
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualProductGrid;