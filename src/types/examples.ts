// Exemplos de uso dos tipos do sistema JC Pastelaria Gourmet
// Este arquivo contém exemplos de como usar os tipos definidos no sistema

import { 
  Product, 
  User, 
  Order, 
  UserStats,
  Achievement,
  Challenge
} from './database';
import { 
  ProductCardProps, 
  CartDrawerProps, 
  UserDashboardProps,
  CartItem,
  ProductOptions,
  ApiResponse
} from './components';

// ===== EXEMPLO 1: Produto =====
export const exampleProduct: Product = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Pastel de Carne',
  description: 'Delicioso pastel recheado com carne temperada e queijo',
  price: 12.50,
  category_id: '456e7890-e89b-12d3-a456-426614174001',
  image_url: 'https://example.com/pastel-carne.jpg',
  images: [
    'https://example.com/pastel-carne-1.jpg',
    'https://example.com/pastel-carne-2.jpg'
  ],
  is_available: true,
  preparation_time: 15,
  rating: 4.5,
  reviews_count: 23,
  orders_count: 156,
  nutritional_info: {
    calories: 320,
    protein: 18,
    carbs: 25,
    fat: 15
  },
  allergens: ['gluten', 'lactose'],
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-20T15:30:00Z'
};

// ===== EXEMPLO 2: Usuário =====
export const exampleUser: User = {
  id: '789e0123-e89b-12d3-a456-426614174002',
  name: 'Maria Silva',
  email: 'maria@example.com',
  phone: '(11) 99999-9999',
  avatar_url: 'https://example.com/avatar.jpg',
  points: 2500,
  level: 'gold',
  total_spent: 350.75,
  orders_count: 15,
  preferences: {
    dietary_restrictions: ['vegetarian'],
    favorite_categories: ['doces'],
    notification_preferences: {
      email: true,
      sms: false,
      push: true
    }
  },
  is_active: true,
  email_verified: true,
  phone_verified: true,
  created_at: '2024-01-01T08:00:00Z',
  updated_at: '2024-01-20T12:00:00Z'
};

// ===== EXEMPLO 3: Opções de Produto =====
export const exampleProductOptions: ProductOptions = {
  sizeId: 'size-medium',
  customizations: [
    {
      customizationId: 'extras',
      optionIds: ['extra-cheese', 'extra-meat']
    },
    {
      customizationId: 'sauce',
      optionIds: ['spicy-sauce']
    }
  ],
  quantity: 2,
  notes: 'Sem cebola, por favor'
};

// ===== EXEMPLO 4: Item do Carrinho =====
export const exampleCartItem: CartItem = {
  id: 'cart-item-1',
  product: exampleProduct,
  options: exampleProductOptions,
  unitPrice: 15.50, // Preço com customizações
  totalPrice: 31.00, // unitPrice * quantity
  addedAt: '2024-01-20T14:30:00Z'
};

// ===== EXEMPLO 5: Estatísticas do Usuário =====
export const exampleUserStats: UserStats = {
  totalOrders: 15,
  totalSpent: 350.75,
  averageOrderValue: 23.38,
  pointsEarned: 3500,
  pointsSpent: 1000,
  // currentLevel: 'gold', // Commented out due to type issues
  // achievementsCount: 8, // Commented out due to type issues
  challengesCompleted: 3,
  favoriteCategory: 'Pastéis Salgados',
  memberSince: '2024-01-01T08:00:00Z'
};

// ===== EXEMPLO 6: Conquista =====
export const exampleAchievement: Achievement = {
  id: 'achievement-first-order',
  name: 'Primeira Compra',
  description: 'Parabéns por fazer seu primeiro pedido!',
  icon: '🎉',
  points_reward: 100,
  type: 'first_order',
  requirements: {
    orders_count: 1
  },
  is_active: true,
  created_at: '2024-01-01T00:00:00Z'
};

// ===== EXEMPLO 7: Desafio =====
export const exampleChallenge: Challenge = {
  id: 'challenge-weekend-warrior',
  name: 'Guerreiro do Fim de Semana',
  description: 'Faça 3 pedidos em fins de semana este mês',
  icon: '⚔️',
  points_reward: 300,
  type: 'monthly',
  requirements: {
    weekend_orders: 3,
    time_period: 'month'
  },
  start_date: '2024-01-01T00:00:00Z',
  end_date: '2024-01-31T23:59:59Z',
  is_active: true,
  created_at: '2024-01-01T00:00:00Z'
};

// ===== EXEMPLO 8: Resposta da API =====
export const exampleApiResponse: ApiResponse<Product[]> = {
  data: [exampleProduct],
  success: true,
  message: 'Produtos carregados com sucesso',
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1
  }
};

// ===== EXEMPLO 9: Props de Componente =====
export const exampleProductCardProps: ProductCardProps = {
  product: exampleProduct,
  onAddToCart: (product, options) => {
    console.log('Adicionando ao carrinho:', product.name, options);
  },
  onQuickView: (product) => {
    console.log('Visualização rápida:', product.name);
  },
  onFavoriteToggle: (product) => {
    console.log('Toggle favorito:', product.name);
  },
  isFavorite: false,
  isLoading: false,
  showQuickActions: true
};

// ===== EXEMPLO 10: Função de Validação =====
export function validateProductOptions(options: ProductOptions): boolean {
  // Validar se quantidade é positiva
  if (options.quantity <= 0) {
    return false;
  }

  // Validar se customizações são válidas
  for (const customization of options.customizations) {
    if (!customization.customizationId || customization.optionIds.length === 0) {
      return false;
    }
  }

  return true;
}

// ===== EXEMPLO 11: Função de Cálculo de Preço =====
export function calculateItemPrice(
  product: Product, 
  options: ProductOptions
): number {
  let basePrice = product.price;
  
  // Adicionar modificadores de tamanho
  if (options.sizeId) {
    // Em uma implementação real, buscaríamos o modificador do banco
    const sizeModifier = 0; // Placeholder
    basePrice += sizeModifier;
  }

  // Adicionar modificadores de customizações
  for (const customization of options.customizations) {
    // Em uma implementação real, buscaríamos os modificadores do banco
    const customizationPrice = 0; // Placeholder
    basePrice += customizationPrice;
  }

  return basePrice * options.quantity;
}

// ===== EXEMPLO 12: Função de Formatação =====
export function formatUserLevel(level: User['level']): string {
  const levelNames = {
    bronze: 'Bronze',
    silver: 'Prata', 
    gold: 'Ouro',
    diamond: 'Diamante'
  };

  return levelNames[level] || 'Desconhecido';
}

// ===== EXEMPLO 13: Função de Filtro =====
export function filterProductsByCategory(
  products: Product[], 
  categoryId: string
): Product[] {
  return products.filter(product => 
    product.category_id === categoryId && product.is_available
  );
}

// ===== EXEMPLO 14: Função de Ordenação =====
export function sortProductsByRating(products: Product[]): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating);
}

// ===== EXEMPLO 15: Função de Busca =====
export function searchProducts(
  products: Product[], 
  searchTerm: string
): Product[] {
  const term = searchTerm.toLowerCase();
  
  return products.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term)
  );
}