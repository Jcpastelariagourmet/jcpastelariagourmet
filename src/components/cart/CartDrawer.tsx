'use client';

import React, { useEffect } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';
import { useCartStore } from '@/store/useCartStore';
import { CartDrawerProps, AppliedCoupon } from '@/types/components';
import { cn, formatCurrency } from '@/lib/utils';

export const CartDrawer: React.FC<CartDrawerProps & {
  appliedCoupons?: AppliedCoupon[];
  onCouponApply?: (code: string) => Promise<void>;
  onCouponRemove?: (couponId: string) => void;
}> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  loading = false,
  appliedCoupons = [],
  onCouponApply,
  onCouponRemove,
  className
}) => {
  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Calculate totals
  const subtotal = items.reduce((total, item) => total + item.totalPrice, 0);
  const deliveryFee = subtotal >= 50 ? 0 : 8.90; // Free delivery over R$ 50
  const discount = 0; // TODO: Implement coupon system
  const total = subtotal + deliveryFee - discount;

  const itemsCount = items.reduce((total, item) => total + item.options.quantity, 0);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={handleOverlayClick}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Seu Carrinho
                </h2>
                {itemsCount > 0 && (
                  <Badge variant="primary" size="sm">
                    {itemsCount} {itemsCount === 1 ? 'item' : 'itens'}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-h-0">
              {items.length === 0 ? (
                <EmptyCart onClose={onClose} />
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CartItem
                            item={item}
                            onUpdateQuantity={(quantity) => onUpdateQuantity(item.id, quantity)}
                            onRemove={() => onRemoveItem(item.id)}
                            showImage={true}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Delivery Info */}
                    {subtotal > 0 && subtotal < 50 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-50 border border-amber-200 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-2 text-amber-800">
                          <div className="w-2 h-2 bg-amber-500 rounded-full" />
                          <span className="text-sm font-medium">
                            Faltam {formatCurrency(50 - subtotal)} para frete grátis!
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Summary and Checkout */}
                  <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                    <CartSummary
                      subtotal={subtotal}
                      deliveryFee={deliveryFee}
                      discount={discount}
                      total={total}
                      appliedCoupons={appliedCoupons}
                      onCouponApply={onCouponApply}
                      onCouponRemove={onCouponRemove}
                    />

                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={onCheckout}
                      loading={loading}
                      disabled={items.length === 0}
                      className="h-12 text-base font-semibold"
                    >
                      {loading ? 'Processando...' : `Finalizar Pedido - ${formatCurrency(total)}`}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Ao continuar, você concorda com nossos{' '}
                      <a href="/termos" className="text-primary-600 hover:underline">
                        Termos de Uso
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;