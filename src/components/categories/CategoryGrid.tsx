import React from 'react';
import { Category } from '@/types/database';
import { CategoryCard } from './CategoryCard';
import { cn } from '@/lib/utils';

export interface CategoryGridProps {
  categories: Category[];
  featuredCategoryIds?: string[];
  columns?: 2 | 3 | 4;
  showProductCounts?: boolean;
  className?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  featuredCategoryIds = [],
  columns = 4,
  showProductCounts = true,
  className
}) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  // Sort categories by order_index and filter active ones
  const sortedCategories = categories
    .filter(category => category.is_active)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  // Separate featured and regular categories
  const featuredCategories = sortedCategories.filter(cat => 
    featuredCategoryIds.includes(cat.id)
  );
  
  const regularCategories = sortedCategories.filter(cat => 
    !featuredCategoryIds.includes(cat.id)
  );

  if (sortedCategories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">📂</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhuma categoria encontrada
        </h3>
        <p className="text-gray-600">
          As categorias de produtos aparecerão aqui quando estiverem disponíveis.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Featured Categories */}
      {featuredCategories.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Categorias em Destaque
            </h2>
            <div className="h-px bg-gradient-to-r from-primary-500 to-transparent flex-1 ml-4" />
          </div>
          
          <div className={cn(
            'grid gap-6',
            gridCols[columns]
          )}>
            {featuredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                featured={true}
                size="lg"
                showProductCount={showProductCounts}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Categories */}
      {regularCategories.length > 0 && (
        <div>
          {featuredCategories.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Todas as Categorias
              </h2>
              <div className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1 ml-4" />
            </div>
          )}
          
          <div className={cn(
            'grid gap-4',
            gridCols[columns]
          )}>
            {regularCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                featured={false}
                size="md"
                showProductCount={showProductCounts}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;