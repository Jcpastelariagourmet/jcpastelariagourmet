'use client';

import React from 'react';
import { CartDrawer } from './CartDrawer';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const router = useRouter();
  const {
    items,
    isOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    appliedCoupons
  } = useCartStore();

  const handleCheckout = () => {
    setCartOpen(false);
    router.push('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm('Tem certeza que deseja limpar o carrinho?')) {
      clearCart();
    }
  };

  return (
    <>
      {children}
      <CartDrawer
        isOpen={isOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
        appliedCoupons={appliedCoupons}
        onCouponApply={applyCoupon}
        onCouponRemove={removeCoupon}
      />
    </>
  );
};

export default CartProvider;