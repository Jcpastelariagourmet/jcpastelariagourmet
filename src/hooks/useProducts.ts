import { useState, useEffect, useCallback, useMemo } from 'react';
import { Product, Category } from '@/types/database';
import { db, isSupabaseConfigured } from '@/lib/supabase';
import { ProductFilters } from '@/components/products/ProductFilters';
import { mockCategories, mockProducts, mockSearchSuggestions, mockRecentSearches, mockTrendingSearches } from '@/lib/mock-data';

export interface UseProductsOptions {
  initialFilters?: ProductFilters;
  pageSize?: number;
  enableInfiniteScroll?: boolean;
}

export interface UseProductsReturn {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  filters: ProductFilters;
  searchQuery: string;
  setFilters: (filters: ProductFilters) => void;
  setSearchQuery: (query: string) => void;
  loadMore: () => void;
  refresh: () => void;
  resetFilters: () => void;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const {
    initialFilters = { sortBy: 'popularity', sortOrder: 'desc' },
    pageSize = 20,
    enableInfiniteScroll = true
  } = options;

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');

  // Build query based on filters and search
  const buildQuery = useCallback((page: number = 0, limit: number = pageSize) => {
    if (!db) return null;
    
    let query = db.products()
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_available', true);

    // Apply search filter
    if (searchQuery.trim()) {
      query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    // Apply category filter
    if (filters.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      query = query.gte('price', min).lte('price', max);
    }

    // Apply rating filter
    if (filters.rating) {
      query = query.gte('rating', filters.rating);
    }

    // Apply preparation time filter
    if (filters.preparationTime) {
      query = query.lte('preparation_time', filters.preparationTime);
    }

    // Apply sorting
    if (filters.sortBy) {
      const ascending = filters.sortOrder === 'asc';
      
      switch (filters.sortBy) {
        case 'name':
          query = query.order('name', { ascending });
          break;
        case 'price':
          query = query.order('price', { ascending });
          break;
        case 'rating':
          query = query.order('rating', { ascending, nullsFirst: false });
          break;
        case 'popularity':
          query = query.order('orders_count', { ascending, nullsFirst: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending });
          break;
      }
    }

    // Apply pagination
    if (enableInfiniteScroll) {
      query = query.range(page * limit, (page + 1) * limit - 1);
    } else {
      query = query.range(page * limit, (page + 1) * limit - 1);
    }

    return query;
  }, [searchQuery, filters, pageSize, enableInfiniteScroll]);

  // Load categories
  const loadCategories = useCallback(async () => {
    try {
      // Use mock data if Supabase is not configured
      if (!isSupabaseConfigured || !db) {
        console.log('Using mock categories - Supabase not configured');
        setCategories(mockCategories);
        return;
      }

      console.log('Loading categories from Supabase...');
      const { data, error } = await db.categories()
        .select(`
          *,
          products!inner(id)
        `)
        .eq('is_active', true)
        .order('order_index');

      if (error) {
        console.error('Supabase categories error:', error);
        throw error;
      }

      console.log('Loaded categories from Supabase:', data?.length || 0);
      
      // Add product count to categories
      const categoriesWithCount = data?.map(category => ({
        ...category,
        productsCount: category.products?.length || 0
      })) || [];

      setCategories(categoriesWithCount);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Erro ao carregar categorias');
      
      // Fallback to mock data
      console.log('Falling back to mock categories');
      setCategories(mockCategories);
    }
  }, []);

  // Load products
  const loadProducts = useCallback(async (page: number = 0, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      // Use mock data if Supabase is not configured
      if (!isSupabaseConfigured || !db) {
        console.log('Using mock data - Supabase not configured');
        // Simulate filtering and pagination with mock data
        let filteredMockProducts = [...mockProducts];
        
        // Apply search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filteredMockProducts = filteredMockProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category?.name.toLowerCase().includes(query)
          );
        }

        // Apply category filter
        if (filters.categoryId) {
          filteredMockProducts = filteredMockProducts.filter(product => product.category_id === filters.categoryId);
        }

        // Apply price range filter
        if (filters.priceRange) {
          const [min, max] = filters.priceRange;
          filteredMockProducts = filteredMockProducts.filter(product => {
            const price = product.discountedPrice || product.price;
            return price >= min && price <= max;
          });
        }

        // Apply rating filter
        if (filters.rating) {
          filteredMockProducts = filteredMockProducts.filter(product => 
            product.rating && product.rating >= filters.rating!
          );
        }

        // Apply preparation time filter
        if (filters.preparationTime) {
          filteredMockProducts = filteredMockProducts.filter(product => 
            product.preparation_time && product.preparation_time <= filters.preparationTime!
          );
        }

        // Apply sorting
        if (filters.sortBy) {
          filteredMockProducts.sort((a, b) => {
            let aValue: any, bValue: any;

            switch (filters.sortBy) {
              case 'name':
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
                break;
              case 'price':
                aValue = a.discountedPrice || a.price;
                bValue = b.discountedPrice || b.price;
                break;
              case 'rating':
                aValue = a.rating || 0;
                bValue = b.rating || 0;
                break;
              case 'popularity':
                aValue = a.orders_count || 0;
                bValue = b.orders_count || 0;
                break;
              case 'newest':
                aValue = new Date(a.created_at || 0).getTime();
                bValue = new Date(b.created_at || 0).getTime();
                break;
              default:
                return 0;
            }

            if (filters.sortOrder === 'asc') {
              return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
              return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
          });
        }

        // Simulate pagination
        const startIndex = page * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = filteredMockProducts.slice(startIndex, endIndex);
        
        if (append) {
          setProducts(prev => [...prev, ...paginatedProducts]);
        } else {
          setProducts(paginatedProducts);
        }

        setTotalCount(filteredMockProducts.length);
        setHasMore(endIndex < filteredMockProducts.length);
        setCurrentPage(page);
        return;
      }

      console.log('Loading products from Supabase...');
      const query = buildQuery(page, pageSize);
      if (!query) {
        setProducts([]);
        setTotalCount(0);
        setHasMore(false);
        setCurrentPage(0);
        return;
      }
      
      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Loaded products from Supabase:', data?.length || 0);
      const productsData = data || [];
      
      if (append) {
        setProducts(prev => [...prev, ...productsData]);
      } else {
        setProducts(productsData);
      }

      setTotalCount(count || 0);
      setHasMore(productsData.length === pageSize);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Erro ao carregar produtos');
      
      // Fallback to mock data on error
      if (page === 0) {
        console.log('Falling back to mock data');
        setProducts(mockProducts.slice(0, pageSize));
        setTotalCount(mockProducts.length);
        setHasMore(mockProducts.length > pageSize);
        setCurrentPage(0);
      }
    } finally {
      setLoading(false);
    }
  }, [buildQuery, pageSize, searchQuery, filters]);

  // Load more products (for infinite scroll)
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadProducts(currentPage + 1, true);
    }
  }, [loading, hasMore, currentPage, loadProducts]);

  // Refresh products
  const refresh = useCallback(() => {
    setCurrentPage(0);
    loadProducts(0, false);
  }, [loadProducts]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchQuery('');
    setCurrentPage(0);
  }, [initialFilters]);

  // Update filters
  const updateFilters = useCallback((newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(0);
  }, []);

  // Update search query
  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
  }, []);

  // Load data when filters or search change
  useEffect(() => {
    loadProducts(0, false);
  }, [filters, searchQuery, loadProducts]);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Memoized return value
  return useMemo(() => ({
    products,
    categories,
    loading,
    error,
    hasMore,
    totalCount,
    filters,
    searchQuery,
    setFilters: updateFilters,
    setSearchQuery: updateSearchQuery,
    loadMore,
    refresh,
    resetFilters
  }), [
    products,
    categories,
    loading,
    error,
    hasMore,
    totalCount,
    filters,
    searchQuery,
    updateFilters,
    updateSearchQuery,
    loadMore,
    refresh,
    resetFilters
  ]);
};

// Hook for search suggestions
export const useProductSearch = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load search suggestions
  const loadSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (!isSupabaseConfigured || !db) {
      // Use mock suggestions
      const queryLower = query.toLowerCase();
      const filteredSuggestions = mockSearchSuggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(queryLower)
      );
      setSuggestions(filteredSuggestions);
      return;
    }

    try {
      setLoading(true);

      // Search products
      const { data: products } = await db.products()
        .select('id, name, description, image_url, category:categories(name)')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('is_available', true)
        .limit(5);

      // Search categories
      const { data: categories } = await db.categories()
        .select('id, name')
        .ilike('name', `%${query}%`)
        .eq('is_active', true)
        .limit(3);

      const productSuggestions = products?.map(product => ({
        id: product.id,
        type: 'product' as const,
        title: product.name,
        subtitle: product.description,
        image: product.image_url,
        category: product.category?.name
      })) || [];

      const categorySuggestions = categories?.map(category => ({
        id: category.id,
        type: 'category' as const,
        title: category.name,
        subtitle: 'Categoria'
      })) || [];

      setSuggestions([...productSuggestions, ...categorySuggestions]);
    } catch (err) {
      console.error('Error loading suggestions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('jc-recent-searches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (err) {
        console.error('Error parsing recent searches:', err);
      }
    }
  }, []);

  // Save search to recent searches
  const saveSearch = useCallback((query: string) => {
    if (!query.trim()) return;

    setRecentSearches(prev => {
      const updated = [query, ...prev.filter(s => s !== query)].slice(0, 10);
      localStorage.setItem('jc-recent-searches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Load trending searches (mock data for now)
  useEffect(() => {
    setTrendingSearches([
      'Pastel de carne',
      'Pastel doce',
      'Refrigerante',
      'Combo família',
      'Pastel de queijo'
    ]);
  }, []);

  return {
    suggestions,
    recentSearches,
    trendingSearches,
    loading,
    loadSuggestions,
    saveSearch
  };
};