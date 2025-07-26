import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductSize, SelectedCustomization } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Computed values
  itemsCount: number;
  subtotal: number;
  
  // Actions
  addItem: (product: Product, quantity?: number, size?: ProductSize, customizations?: SelectedCustomization[], notes?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
}

const calculateItemPrice = (
  product: Product, 
  size?: ProductSize, 
  customizations?: SelectedCustomization[]
): number => {
  let price = product.price;
  
  // Adicionar preço do tamanho
  if (size) {
    price += size.price_modifier;
  }
  
  // Adicionar preço das customizações
  if (customizations) {
    customizations.forEach(customization => {
      const productCustomization = product.customizations.find(
        pc => pc.id === customization.customization_id
      );
      
      if (productCustomization) {
        customization.option_ids.forEach(optionId => {
          const option = productCustomization.options.find(o => o.id === optionId);
          if (option) {
            price += option.price_modifier;
          }
        });
      }
    });
  }
  
  return Math.max(0, price);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      get itemsCount() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      get subtotal() {
        return get().items.reduce((total, item) => total + item.total_price, 0);
      },

      addItem: (product, quantity = 1, size, customizations = [], notes) => {
        const { items } = get();
        const unitPrice = calculateItemPrice(product, size, customizations);
        
        // Verificar se já existe um item idêntico
        const existingItemIndex = items.findIndex(item => {
          const sameProduct = item.product.id === product.id;
          const sameSize = (!item.size && !size) || (item.size?.id === size?.id);
          const sameCustomizations = JSON.stringify(item.customizations) === JSON.stringify(customizations);
          const sameNotes = item.notes === notes;
          
          return sameProduct && sameSize && sameCustomizations && sameNotes;
        });

        if (existingItemIndex >= 0) {
          // Atualizar quantidade do item existente
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          updatedItems[existingItemIndex].total_price = 
            updatedItems[existingItemIndex].unit_price * updatedItems[existingItemIndex].quantity;
          
          set({ items: updatedItems });
        } else {
          // Adicionar novo item
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}-${Math.random()}`,
            product,
            quantity,
            size,
            customizations,
            notes,
            unit_price: unitPrice,
            total_price: unitPrice * quantity
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
              quantity,
              total_price: item.unit_price * quantity
            };
          }
          return item;
        });
        
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      setCartOpen: (open) => {
        set({ isOpen: open });
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
);