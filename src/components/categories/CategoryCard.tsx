import React from 'react';
import Link from 'next/link';
import { Category } from '@/types/database';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export interface CategoryCardProps {
  category: Category;
  featured?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showProductCount?: boolean;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  featured = false,
  size = 'md',
  showProductCount = true,
  className
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <Link
      href={`/?categoria=${category.id}`}
      className={cn(
        'group relative block rounded-xl border-2 border-gray-200 bg-white',
        'hover:border-primary-300 hover:shadow-lg transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        featured && 'border-primary-200 bg-gradient-to-br from-primary-50 to-white',
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: featured ? (category.color || undefined) : undefined,
        backgroundColor: featured ? `${category.color || '#000000'}10` : undefined
      }}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-2 -right-2">
          <Badge variant="primary" size="sm">
            Destaque
          </Badge>
        </div>
      )}

      <div className="flex flex-col items-center text-center space-y-3">
        {/* Icon */}
        <div 
          className={cn(
            'flex items-center justify-center w-16 h-16 rounded-full',
            'group-hover:scale-110 transition-transform duration-300',
            iconSizes[size]
          )}
          style={{
            backgroundColor: `${category.color}20`,
            color: category.color
          }}
        >
          {category.icon}
        </div>

        {/* Title */}
        <h3 className={cn(
          'font-semibold text-gray-900 group-hover:text-primary-700',
          'transition-colors duration-200',
          titleSizes[size]
        )}>
          {category.name}
        </h3>

        {/* Description */}
        {category.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {category.description}
          </p>
        )}

        {/* Product Count */}
        {showProductCount && category.productsCount !== undefined && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>{category.productsCount}</span>
            <span>{category.productsCount === 1 ? 'produto' : 'produtos'}</span>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: category.color }}
      />
    </Link>
  );
};

export default CategoryCard;