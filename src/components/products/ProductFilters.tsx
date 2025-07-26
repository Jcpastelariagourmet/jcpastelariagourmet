import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { Category } from '@/types/database';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export interface ProductFilters {
  categoryId?: string;
  priceRange?: [number, number];
  rating?: number;
  preparationTime?: number;
  dietary?: string[];
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'popularity' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductFiltersProps {
  categories: Category[];
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onReset: () => void;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const PRICE_RANGES = [
  { label: 'Até R$ 15', value: [0, 15] as [number, number] },
  { label: 'R$ 15 - R$ 25', value: [15, 25] as [number, number] },
  { label: 'R$ 25 - R$ 35', value: [25, 35] as [number, number] },
  { label: 'R$ 35 - R$ 50', value: [35, 50] as [number, number] },
  { label: 'Acima de R$ 50', value: [50, 999] as [number, number] },
];

const PREPARATION_TIMES = [
  { label: 'Até 15 min', value: 15 },
  { label: 'Até 30 min', value: 30 },
  { label: 'Até 45 min', value: 45 },
  { label: 'Até 60 min', value: 60 },
];

const DIETARY_OPTIONS = [
  { label: 'Vegetariano', value: 'vegetarian' },
  { label: 'Vegano', value: 'vegan' },
  { label: 'Sem Glúten', value: 'gluten_free' },
  { label: 'Sem Lactose', value: 'lactose_free' },
  { label: 'Sem Açúcar', value: 'sugar_free' },
];

const SORT_OPTIONS = [
  { label: 'Mais Populares', value: 'popularity', order: 'desc' as const },
  { label: 'Melhor Avaliados', value: 'rating', order: 'desc' as const },
  { label: 'Menor Preço', value: 'price', order: 'asc' as const },
  { label: 'Maior Preço', value: 'price', order: 'desc' as const },
  { label: 'Nome A-Z', value: 'name', order: 'asc' as const },
  { label: 'Nome Z-A', value: 'name', order: 'desc' as const },
  { label: 'Mais Recentes', value: 'newest', order: 'desc' as const },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  filters,
  onFiltersChange,
  onReset,
  className,
  isOpen = true,
  onToggle
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    time: true,
    dietary: true,
    sort: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilter = (key: keyof ProductFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleDietaryOption = (option: string) => {
    const current = filters.dietary || [];
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    updateFilter('dietary', updated);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categoryId) count++;
    if (filters.priceRange) count++;
    if (filters.rating) count++;
    if (filters.preparationTime) count++;
    if (filters.dietary && filters.dietary.length > 0) count++;
    return count;
  };

  const renderStars = (rating: number, interactive = false, onClick?: () => void) => {
    return (
      <div 
        className={cn('flex items-center gap-1', interactive && 'cursor-pointer')}
        onClick={onClick}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={cn(
              'w-4 h-4',
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-sm text-gray-600 ml-1">& acima</span>
      </div>
    );
  };

  const FilterSection: React.FC<{
    title: string;
    sectionKey: keyof typeof expandedSections;
    children: React.ReactNode;
  }> = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex items-center justify-between w-full py-3 text-left"
        onClick={() => toggleSection(sectionKey)}
      >
        <span className="font-medium text-gray-900">{title}</span>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="pb-4">{children}</div>
      )}
    </div>
  );

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <CardTitle className="text-lg">Filtros</CardTitle>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="primary" size="sm">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-gray-600 hover:text-gray-900"
              >
                Limpar
              </Button>
            )}
            {onToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-0">
        {/* Sort */}
        <FilterSection title="Ordenar por" sectionKey="sort">
          <div className="space-y-2">
            {SORT_OPTIONS.map((option) => (
              <label
                key={`${option.value}-${option.order}`}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sortBy === option.value && filters.sortOrder === option.order}
                  onChange={() => {
                    updateFilter('sortBy', option.value);
                    updateFilter('sortOrder', option.order);
                  }}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Categories */}
        <FilterSection title="Categorias" sectionKey="categories">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="category"
                checked={!filters.categoryId}
                onChange={() => updateFilter('categoryId', undefined)}
                className="text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Todas as categorias</span>
            </label>
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="category"
                  checked={filters.categoryId === category.id}
                  onChange={() => updateFilter('categoryId', category.id)}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
                {category.productsCount && (
                  <span className="text-xs text-gray-500">({category.productsCount})</span>
                )}
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Faixa de Preço" sectionKey="price">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="price"
                checked={!filters.priceRange}
                onChange={() => updateFilter('priceRange', undefined)}
                className="text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Qualquer preço</span>
            </label>
            {PRICE_RANGES.map((range, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="price"
                  checked={
                    filters.priceRange &&
                    filters.priceRange[0] === range.value[0] &&
                    filters.priceRange[1] === range.value[1]
                  }
                  onChange={() => updateFilter('priceRange', range.value)}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Avaliação" sectionKey="rating">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="rating"
                checked={!filters.rating}
                onChange={() => updateFilter('rating', undefined)}
                className="text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Qualquer avaliação</span>
            </label>
            {[4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => updateFilter('rating', rating)}
                  className="text-primary-500 focus:ring-primary-500"
                />
                {renderStars(rating)}
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Preparation Time */}
        <FilterSection title="Tempo de Preparo" sectionKey="time">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="time"
                checked={!filters.preparationTime}
                onChange={() => updateFilter('preparationTime', undefined)}
                className="text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Qualquer tempo</span>
            </label>
            {PREPARATION_TIMES.map((time) => (
              <label
                key={time.value}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="time"
                  checked={filters.preparationTime === time.value}
                  onChange={() => updateFilter('preparationTime', time.value)}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{time.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Dietary Options */}
        <FilterSection title="Opções Alimentares" sectionKey="dietary">
          <div className="space-y-2">
            {DIETARY_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={filters.dietary?.includes(option.value) || false}
                  onChange={() => toggleDietaryOption(option.value)}
                  className="text-primary-500 focus:ring-primary-500 rounded"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;