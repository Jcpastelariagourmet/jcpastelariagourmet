import React, { useState } from 'react';
import { Product, ProductOptions } from '@/types/database';
import { ProductGrid } from './ProductGrid';
import { SimpleProductModal } from './SimpleProductModal';
import { ProductSearch, SearchSuggestion } from './ProductSearch';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

export interface ProductCatalogWithSimpleModalProps {
  products: Product[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  onAddToCart: (product: Product, options: ProductOptions) => void;
  onFavoriteToggle?: (product: Product) => void;
  favoriteProductIds?: string[];
  onSearch?: (query: string) => void;
  searchSuggestions?: SearchSuggestion[];
  recentSearches?: string[];
  trendingSearches?: string[];
  className?: string;
}

export const ProductCatalogWithSimpleModal: React.FC<ProductCatalogWithSimpleModalProps> = ({
  products,
  loading = false,
  onLoadMore,
  hasMore = false,
  onAddToCart,
  onFavoriteToggle,
  favoriteProductIds = [],
  onSearch,
  searchSuggestions = [],
  recentSearches = [],
  trendingSearches = [],
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrar produtos por busca
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category?.name.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  // Handle product quick view (abre o modal)
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle add to cart from modal
  const handleModalAddToCart = (product: Product, options: ProductOptions) => {
    onAddToCart(product, options);
    setIsModalOpen(false);
  };

  // Generate search suggestions
  const generateSuggestions = React.useMemo((): SearchSuggestion[] => {
    if (!searchQuery.trim()) return searchSuggestions;

    const query = searchQuery.toLowerCase();
    const suggestions: SearchSuggestion[] = [];

    // Add product suggestions
    products
      .filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
      .slice(0, 5)
      .forEach(product => {
        suggestions.push({
          id: product.id,
          type: 'product',
          title: product.name,
          subtitle: product.description,
          image: product.image_url || undefined,
          category: product.category?.name
        });
      });

    return suggestions;
  }, [searchQuery, products, searchSuggestions]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Search Bar */}
      <Container>
        <div className="max-w-2xl mx-auto">
          <ProductSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            suggestions={generateSuggestions}
            recentSearches={recentSearches}
            trendingSearches={trendingSearches}
            loading={loading}
          />
        </div>
      </Container>

      {/* Results Count */}
      <Container>
        <div className="text-sm text-gray-600 mb-4">
          {loading ? (
            'Carregando...'
          ) : (
            <>
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
              {searchQuery && ` para "${searchQuery}"`}
            </>
          )}
        </div>
      </Container>

      {/* Products Grid */}
      <Container>
        <ProductGrid
          products={filteredProducts}
          loading={loading}
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          onAddToCart={onAddToCart}
          onQuickView={handleQuickView} // Abre o modal simplificado
          onFavoriteToggle={onFavoriteToggle}
          favoriteProductIds={favoriteProductIds}
          emptyState={
            searchQuery ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Não encontramos produtos para "{searchQuery}".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Limpar busca
                </button>
              </div>
            ) : undefined
          }
        />
      </Container>

      {/* Modal Simplificado */}
      {selectedProduct && (
        <SimpleProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleModalAddToCart}
        />
      )}
    </div>
  );
};

export default ProductCatalogWithSimpleModal;