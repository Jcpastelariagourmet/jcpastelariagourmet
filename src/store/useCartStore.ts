import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductOptions, AppliedCoupon } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupons: AppliedCoupon[];
  
  // Computed values
  itemsCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  
  // Actions
  addItem: (product: Product, options: ProductOptions) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateItemOptions: (itemId: string, options: ProductOptions) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: (couponId: string) => void;
  validateStock: () => Promise<boolean>;
}

const calculateItemPrice = (product: Product, options: ProductOptions): number => {
  let price = product.price;
  
  // Add size price modifier
  if (options.sizeId && product.sizes) {
    const size = product.sizes.find(s => s.id === options.sizeId);
    if (size) {
      price += size.price_modifier;
    }
  }
  
  // Add customizations price modifiers
  if (options.customizations && product.customizations) {
    options.customizations.forEach(customization => {
      const productCustomization = product.customizations?.find(
        pc => pc.id === customization.customizationId
      );
      
      if (productCustomization?.options) {
        customization.optionIds.forEach(optionId => {
          const option = productCustomization.options?.find(o => o.id === optionId);
          if (option) {
            price += option.price_modifier;
          }
        });
      }
    });
  }
  
  return Math.max(0, price);
};

const calculateDeliveryFee = (subtotal: number): number => {
  // Free delivery over R$ 50
  return subtotal >= 50 ? 0 : 8.90;
};

const calculateDiscount = (subtotal: number, appliedCoupons: AppliedCoupon[]): number => {
  return appliedCoupons.reduce((total, coupon) => total + coupon.discountAmount, 0);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      appliedCoupons: [],
      
      get itemsCount() {
        return get().items.reduce((total, item) => total + item.options.quantity, 0);
      },
      
      get subtotal() {
        return get().items.reduce((total, item) => total + item.totalPrice, 0);
      },

      get deliveryFee() {
        return calculateDeliveryFee(get().subtotal);
      },

      get discount() {
        return calculateDiscount(get().subtotal, get().appliedCoupons);
      },

      get total() {
        const { subtotal, deliveryFee, discount } = get();
        return subtotal + deliveryFee - discount;
      },

      addItem: (product, options) => {
        const { items } = get();
        const unitPrice = calculateItemPrice(product, options);
        
        // Check if identical item already exists
        const existingItemIndex = items.findIndex(item => {
          const sameProduct = item.product.id === product.id;
          const sameSize = item.options.sizeId === options.sizeId;
          const sameCustomizations = JSON.stringify(item.options.customizations) === JSON.stringify(options.customizations);
          const sameNotes = item.options.notes === options.notes;
          
          return sameProduct && sameSize && sameCustomizations && sameNotes;
        });

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const updatedItems = [...items];
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity = existingItem.options.quantity + options.quantity;
          
          updatedItems[existingItemIndex] = {
            ...existingItem,
            options: { ...existingItem.options, quantity: newQuantity },
            totalPrice: unitPrice * newQuantity
          };
          
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}-${Math.random()}`,
            product,
            options,
            unitPrice,
            totalPrice: unitPrice * options.quantity,
            addedAt: new Date().toISOString()
          };
          
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (itemId) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              options: { ...item.options, quantity },
              totalPrice: item.unitPrice * quantity
            };
          }
          return item;
        });
        
        set({ items: updatedItems });
      },

      updateItemOptions: (itemId, options) => {
        const { items } = get();
        const updatedItems = items.map(item => {
          if (item.id === itemId) {
            const unitPrice = calculateItemPrice(item.product, options);
            return {
              ...item,
              options,
              unitPrice,
              totalPrice: unitPrice * options.quantity
            };
          }
          return item;
        });
        
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [], appliedCoupons: [] });
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      setCartOpen: (open) => {
        set({ isOpen: open });
      },

      applyCoupon: async (code) => {
        // TODO: Implement coupon validation API call
        // For now, simulate a coupon system
        const { subtotal, appliedCoupons } = get();
        
        // Check if coupon is already applied
        if (appliedCoupons.some(c => c.coupon.code === code)) {
          throw new Error('Cupom já aplicado');
        }

        // Simulate coupon validation
        const mockCoupons = {
          'WELCOME10': { id: '1', code: 'WELCOME10', type: 'percentage' as const, value: 10 },
          'FRETE5': { id: '2', code: 'FRETE5', type: 'fixed_amount' as const, value: 5 },
          'PRIMEIRA': { id: '3', code: 'PRIMEIRA', type: 'percentage' as const, value: 15 }
        };

        const coupon = mockCoupons[code as keyof typeof mockCoupons];
        if (!coupon) {
          throw new Error('Cupom inválido');
        }

        // Calculate discount
        let discountAmount = 0;
        if (coupon.type === 'percentage') {
          discountAmount = (subtotal * coupon.value) / 100;
        } else {
          discountAmount = coupon.value;
        }

        const appliedCoupon: AppliedCoupon = {
          coupon,
          discountAmount,
          appliedAt: new Date().toISOString()
        };

        set({ appliedCoupons: [...appliedCoupons, appliedCoupon] });
      },

      removeCoupon: (couponId) => {
        const { appliedCoupons } = get();
        set({ 
          appliedCoupons: appliedCoupons.filter(c => c.coupon.id !== couponId) 
        });
      },

      validateStock: async () => {
        // TODO: Implement stock validation API call
        // For now, always return true
        return true;
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        items: state.items, 
        appliedCoupons: state.appliedCoupons 
      })
    }
  )
);