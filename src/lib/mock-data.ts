// Mock data for development when Supabase is not configured
import { Product, Category } from '@/types/database';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Pastéis Salgados',
    description: 'Deliciosos pastéis salgados com recheios variados',
    icon: '🥟',
    color: '#FFC700',
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    productsCount: 4
  },
  {
    id: '2',
    name: 'Pastéis Doces',
    description: 'Pastéis doces irresistíveis para sobremesa',
    icon: '🍰',
    color: '#FF6B6B',
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    productsCount: 2
  },
  {
    id: '3',
    name: 'Bebidas',
    description: 'Bebidas refrescantes para acompanhar',
    icon: '🥤',
    color: '#4ECDC4',
    order_index: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    productsCount: 3
  },
  {
    id: '4',
    name: 'Combos',
    description: 'Combinações especiais com desconto',
    icon: '🍽️',
    color: '#45B7D1',
    order_index: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    productsCount: 2
  }
];

// Mock customizations data - Sistema completo de complementos para pastéis salgados
// Função para criar customizações para um produto específico
const createCustomizationsForProduct = (productId: string) => [
  // Sabores - Agora com controles de quantidade e limites
  {
    id: `custom-sabores-${productId}`,
    product_id: productId,
    name: 'Sabores',
    type: 'multiple' as const,
    required: false,
    max_selections: 3, // Limite de 3 sabores diferentes
    order_index: 1,
    options: [
      { id: `sabor-1-${productId}`, name: 'Tradicional', price_modifier: 0, is_available: true, order_index: 1, max_quantity: 2 },
      { id: `sabor-2-${productId}`, name: 'Apimentado', price_modifier: 1.00, is_available: true, order_index: 2, max_quantity: 2 },
      { id: `sabor-3-${productId}`, name: 'Com Cebola Caramelizada', price_modifier: 2.00, is_available: true, order_index: 3, max_quantity: 2 },
      { id: `sabor-4-${productId}`, name: 'Defumado', price_modifier: 2.50, is_available: true, order_index: 4, max_quantity: 1 },
      { id: `sabor-5-${productId}`, name: 'Com Ervas Finas', price_modifier: 1.50, is_available: true, order_index: 5, max_quantity: 2 }
    ]
  },
  // Adicionais
  {
    id: `custom-adicionais-${productId}`,
    product_id: productId,
    name: 'Adicionais',
    type: 'multiple' as const,
    required: false,
    max_selections: 5, // Limite de 5 adicionais diferentes
    order_index: 2,
    options: [
      { id: `add-1-${productId}`, name: 'Queijo Extra', price_modifier: 2.50, is_available: true, order_index: 1, max_quantity: 3 },
      { id: `add-2-${productId}`, name: 'Bacon', price_modifier: 3.00, is_available: true, order_index: 2, max_quantity: 2 },
      { id: `add-3-${productId}`, name: 'Catupiry', price_modifier: 2.00, is_available: true, order_index: 3, max_quantity: 2 },
      { id: `add-4-${productId}`, name: 'Ovo', price_modifier: 1.50, is_available: true, order_index: 4, max_quantity: 2 },
      { id: `add-5-${productId}`, name: 'Azeitona', price_modifier: 1.00, is_available: true, order_index: 5, max_quantity: 1 },
      { id: `add-6-${productId}`, name: 'Tomate', price_modifier: 0.50, is_available: true, order_index: 6, max_quantity: 2 },
      { id: `add-7-${productId}`, name: 'Cebola Roxa', price_modifier: 0.50, is_available: true, order_index: 7, max_quantity: 1 }
    ]
  },
  // Molhos
  {
    id: `custom-molhos-${productId}`,
    product_id: productId,
    name: 'Molhos',
    type: 'multiple' as const,
    required: false,
    max_selections: 3, // Limite de 3 molhos diferentes
    order_index: 3,
    options: [
      { id: `molho-1-${productId}`, name: 'Molho de Alho', price_modifier: 0, is_available: true, order_index: 1, max_quantity: 2 },
      { id: `molho-2-${productId}`, name: 'Molho Picante', price_modifier: 0, is_available: true, order_index: 2, max_quantity: 2 },
      { id: `molho-3-${productId}`, name: 'Molho Barbecue', price_modifier: 1.00, is_available: true, order_index: 3, max_quantity: 2 },
      { id: `molho-4-${productId}`, name: 'Molho Especial da Casa', price_modifier: 1.50, is_available: true, order_index: 4, max_quantity: 1 },
      { id: `molho-5-${productId}`, name: 'Molho Rosé', price_modifier: 1.00, is_available: true, order_index: 5, max_quantity: 2 },
      { id: `molho-6-${productId}`, name: 'Molho Verde (Chimichurri)', price_modifier: 1.50, is_available: true, order_index: 6, max_quantity: 1 }
    ]
  }
];

// Customizações específicas para pastéis doces
const createSweetCustomizationsForProduct = (productId: string) => [
  // Complementos doces
  {
    id: `custom-complementos-${productId}`,
    product_id: productId,
    name: 'Complementos',
    type: 'multiple' as const,
    required: false,
    max_selections: 3,
    order_index: 1,
    options: [
      { id: `comp-1-${productId}`, name: 'Chantilly', price_modifier: 2.00, is_available: true, order_index: 1, max_quantity: 1 },
      { id: `comp-2-${productId}`, name: 'Sorvete de Baunilha', price_modifier: 3.50, is_available: true, order_index: 2, max_quantity: 1 },
      { id: `comp-3-${productId}`, name: 'Calda de Chocolate', price_modifier: 1.50, is_available: true, order_index: 3, max_quantity: 2 },
      { id: `comp-4-${productId}`, name: 'Açúcar de Confeiteiro', price_modifier: 0.50, is_available: true, order_index: 4, max_quantity: 1 },
      { id: `comp-5-${productId}`, name: 'Canela em Pó', price_modifier: 0.50, is_available: true, order_index: 5, max_quantity: 1 }
    ]
  }
];

// Customizações para bebidas
const createDrinkCustomizationsForProduct = (productId: string) => [
  {
    id: `custom-opcoes-${productId}`,
    product_id: productId,
    name: 'Opções',
    type: 'single' as const,
    required: false,
    max_selections: 1,
    order_index: 1,
    options: [
      { id: `opt-1-${productId}`, name: 'Gelado', price_modifier: 0, is_available: true, order_index: 1, max_quantity: 1 },
      { id: `opt-2-${productId}`, name: 'Natural', price_modifier: 0, is_available: true, order_index: 2, max_quantity: 1 },
      { id: `opt-3-${productId}`, name: 'Com Gelo Extra', price_modifier: 0, is_available: true, order_index: 3, max_quantity: 1 }
    ]
  }
];

export const mockProducts: Product[] = [
  // PASTÉIS SALGADOS - Todos com sistema completo de complementos
  {
    id: '1',
    name: 'Pastel de Carne',
    description: 'Pastel tradicional com recheio de carne moída temperada com cebola e temperos especiais',
    price: 12.90,
    category_id: '1',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 25,
    rating: 4.5,
    reviews_count: 23,
    orders_count: 156,
    nutritional_info: { calories: 320, protein: 18, carbs: 28, fat: 16 },
    allergens: ['glúten'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    isPopular: true,
    category: mockCategories[0],
    customizations: createCustomizationsForProduct('1')
  },
  {
    id: '2',
    name: 'Pastel de Queijo',
    description: 'Pastel cremoso com queijo mussarela derretido',
    price: 10.90,
    category_id: '1',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 20,
    rating: 4.2,
    reviews_count: 18,
    orders_count: 89,
    nutritional_info: { calories: 280, protein: 14, carbs: 26, fat: 14 },
    allergens: ['glúten', 'lactose'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[0],
    customizations: createCustomizationsForProduct('2')
  },
  {
    id: '3',
    name: 'Pastel de Frango com Catupiry',
    description: 'Pastel com frango desfiado e catupiry cremoso',
    price: 14.90,
    discountedPrice: 12.90,
    category_id: '1',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 30,
    rating: 4.8,
    reviews_count: 45,
    orders_count: 234,
    nutritional_info: { calories: 350, protein: 22, carbs: 28, fat: 18 },
    allergens: ['glúten', 'lactose'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    isNew: true,
    category: mockCategories[0],
    customizations: createCustomizationsForProduct('3')
  },
  {
    id: '4',
    name: 'Pastel de Camarão',
    description: 'Pastel gourmet com camarão refogado e temperos especiais',
    price: 18.90,
    category_id: '1',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 35,
    rating: 4.6,
    reviews_count: 31,
    orders_count: 78,
    nutritional_info: { calories: 290, protein: 20, carbs: 26, fat: 12 },
    allergens: ['glúten', 'crustáceos'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[0],
    customizations: createCustomizationsForProduct('4')
  },
  
  // PASTÉIS DOCES - Com complementos específicos para doces
  {
    id: '5',
    name: 'Pastel de Chocolate',
    description: 'Pastel doce com recheio cremoso de chocolate ao leite',
    price: 11.90,
    category_id: '2',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 20,
    rating: 4.3,
    reviews_count: 12,
    orders_count: 67,
    nutritional_info: { calories: 380, protein: 8, carbs: 45, fat: 18 },
    allergens: ['glúten', 'lactose'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[1],
    customizations: createSweetCustomizationsForProduct('5')
  },
  {
    id: '6',
    name: 'Pastel de Doce de Leite',
    description: 'Pastel com doce de leite cremoso argentino',
    price: 12.90,
    category_id: '2',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: false,
    preparation_time: 20,
    rating: 4.7,
    reviews_count: 28,
    orders_count: 134,
    nutritional_info: { calories: 420, protein: 10, carbs: 52, fat: 20 },
    allergens: ['glúten', 'lactose'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[1],
    customizations: createSweetCustomizationsForProduct('6')
  },
  
  // BEBIDAS - Com opções simples de personalização
  {
    id: '7',
    name: 'Refrigerante Lata',
    description: 'Refrigerante gelado em lata 350ml - Coca-Cola, Guaraná, Fanta',
    price: 4.50,
    category_id: '3',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 5,
    rating: 4.0,
    reviews_count: 8,
    orders_count: 245,
    nutritional_info: { calories: 140, protein: 0, carbs: 37, fat: 0 },
    allergens: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[2],
    customizations: createDrinkCustomizationsForProduct('7')
  },
  {
    id: '8',
    name: 'Suco Natural',
    description: 'Suco natural de frutas frescas - Laranja, Limão, Maracujá',
    price: 6.90,
    category_id: '3',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 10,
    rating: 4.4,
    reviews_count: 15,
    orders_count: 89,
    nutritional_info: { calories: 110, protein: 2, carbs: 26, fat: 0 },
    allergens: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[2],
    customizations: createDrinkCustomizationsForProduct('8')
  },
  {
    id: '9',
    name: 'Água Mineral',
    description: 'Água mineral natural 500ml',
    price: 3.00,
    category_id: '3',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 2,
    rating: 4.1,
    reviews_count: 5,
    orders_count: 156,
    nutritional_info: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    allergens: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[2]
    // Água não precisa de customizações
  },
  
  // COMBOS - Sem customizações (são produtos pré-definidos)
  {
    id: '10',
    name: 'Combo Tradicional',
    description: '1 Pastel salgado + 1 Refrigerante + 1 Pastel doce',
    price: 24.90,
    discountedPrice: 22.90,
    category_id: '4',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 30,
    rating: 4.6,
    reviews_count: 42,
    orders_count: 178,
    nutritional_info: { calories: 740, protein: 26, carbs: 91, fat: 34 },
    allergens: ['glúten', 'lactose'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    isPopular: true,
    category: mockCategories[3]
    // Combos não têm customizações - são produtos fixos
  },
  {
    id: '11',
    name: 'Combo Família',
    description: '4 Pastéis salgados + 2 Refrigerantes + 2 Pastéis doces',
    price: 65.90,
    discountedPrice: 59.90,
    category_id: '4',
    image_url: '/placeholder-product.jpg',
    images: [],
    is_available: true,
    preparation_time: 45,
    rating: 4.8,
    reviews_count: 67,
    orders_count: 234,
    nutritional_info: { calories: 1480, protein: 52, carbs: 182, fat: 68 },
    allergens: ['glúten', 'lactose'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    isPopular: true,
    isNew: true,
    category: mockCategories[3]
    // Combos não têm customizações - são produtos fixos
  }
];

// Mock search suggestions
export const mockSearchSuggestions = [
  {
    id: '1',
    type: 'product' as const,
    title: 'Pastel de Carne',
    subtitle: 'Pastel tradicional com recheio de carne moída',
    category: 'Pastéis Salgados'
  },
  {
    id: '2',
    type: 'category' as const,
    title: 'Pastéis Salgados',
    subtitle: '4 produtos'
  }
];

export const mockRecentSearches = [
  'Pastel de carne',
  'Refrigerante',
  'Combo família',
  'Pastel doce'
];

export const mockTrendingSearches = [
  'Combo tradicional',
  'Pastel de frango',
  'Suco natural',
  'Pastel de queijo',
  'Combo família'
];