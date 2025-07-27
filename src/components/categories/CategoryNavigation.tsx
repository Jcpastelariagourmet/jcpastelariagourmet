import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/types/database';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Grid, List } from 'lucide-react';

export interface CategoryNavigationProps {
  categories: Category[];
  currentCategoryId?: string;
  showAll?: boolean;
  layout?: 'horizontal' | 'vertical';
  showProductCounts?: boolean;
  className?: string;
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  currentCategoryId,
  showAll = true,
  layout = 'horizontal',
  showProductCounts = true,
  className
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (categoryId?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categoryId) {
      params.set('categoria', categoryId);
    } else {
      params.delete('categoria');
    }
    
    router.push(`/?${params.toString()}`);
  };

  const isHorizontal = layout === 'horizontal';

  return (
    <nav className={cn(
      'bg-white rounded-lg border border-gray-200 p-4',
      className
    )}>
      <div className={cn(
        'flex gap-2',
        isHorizontal ? 'flex-wrap' : 'flex-col'
      )}>
        {/* All Categories Button */}
        {showAll && (
          <Button
            variant={!currentCategoryId ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleCategoryClick()}
            className={cn(
              'justify-start',
              !isHorizontal && 'w-full'
            )}
          >
            <Grid className="w-4 h-4 mr-2" />
            Todas as Categorias
            {showProductCounts && (
              <Badge variant="secondary" size="sm" className="ml-2">
                {categories.reduce((sum, cat) => sum + (cat.productsCount || 0), 0)}
              </Badge>
            )}
          </Button>
        )}

        {/* Category Buttons */}
        {categories
          .filter(category => category.is_active)
          .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
          .map((category) => (
            <Button
              key={category.id}
              variant={currentCategoryId === category.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                'justify-start',
                !isHorizontal && 'w-full'
              )}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
              {showProductCounts && category.productsCount !== undefined && (
                <Badge 
                  variant={currentCategoryId === category.id ? 'secondary' : 'default'} 
                  size="sm" 
                  className="ml-2"
                >
                  {category.productsCount}
                </Badge>
              )}
            </Button>
          ))}
      </div>
    </nav>
  );
};

export default CategoryNavigation;