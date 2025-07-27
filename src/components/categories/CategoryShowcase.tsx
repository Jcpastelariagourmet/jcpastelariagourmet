import React from 'react';
import Link from 'next/link';
import { Category } from '@/types/database';
import { CategoryCard } from './CategoryCard';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CategoryShowcaseProps {
  categories: Category[];
  featuredCategoryIds?: string[];
  maxItems?: number;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  className?: string;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  categories,
  featuredCategoryIds = [],
  maxItems = 4,
  title = 'Explore Nossas Categorias',
  subtitle = 'Descubra uma variedade incrível de sabores organizados especialmente para você',
  showViewAll = true,
  className
}) => {
  // Filter and sort categories
  const activeCategories = categories
    .filter(category => category.is_active)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  // Prioritize featured categories
  const featuredCategories = activeCategories.filter(cat => 
    featuredCategoryIds.includes(cat.id)
  );
  
  const regularCategories = activeCategories.filter(cat => 
    !featuredCategoryIds.includes(cat.id)
  );

  // Combine and limit
  const displayCategories = [
    ...featuredCategories,
    ...regularCategories
  ].slice(0, maxItems);

  if (displayCategories.length === 0) {
    return null;
  }

  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              featured={featuredCategoryIds.includes(category.id)}
              size="lg"
              showProductCount={true}
            />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && activeCategories.length > maxItems && (
          <div className="text-center">
            <Link href="/">
              <Button variant="outline" size="lg" className="group">
                Ver Cardápio Completo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryShowcase;