'use client';

import React, { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { CartSummaryProps } from '@/types/components';
import { cn, formatCurrency } from '@/lib/utils';

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  deliveryFee,
  discount,
  total,
  appliedCoupons = [],
  onCouponApply,
  onCouponRemove,
  className
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim() || !onCouponApply) return;

    setIsApplyingCoupon(true);
    setCouponError('');

    try {
      await onCouponApply(couponCode.trim().toUpperCase());
      setCouponCode('');
    } catch (error) {
      setCouponError('Cupom inválido ou expirado');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleCouponRemove = (couponId: string) => {
    if (onCouponRemove) {
      onCouponRemove(couponId);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Coupon Section */}
      {onCouponApply && (
        <div className="space-y-3">
          <form onSubmit={handleCouponSubmit} className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Código do cupom"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                error={couponError}
                className="text-sm"
                leftIcon={<Tag className="w-4 h-4" />}
              />
            </div>
            <Button
              type="submit"
              variant="outline"
              size="md"
              loading={isApplyingCoupon}
              disabled={!couponCode.trim()}
              className="px-4"
            >
              Aplicar
            </Button>
          </form>

          {/* Applied Coupons */}
          {appliedCoupons.length > 0 && (
            <div className="space-y-2">
              {appliedCoupons.map((appliedCoupon) => (
                <div
                  key={appliedCoupon.coupon.id}
                  className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-2"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <div>
                      <span className="text-sm font-medium text-green-800">
                        {appliedCoupon.coupon.code}
                      </span>
                      <div className="text-xs text-green-600">
                        -{formatCurrency(appliedCoupon.discountAmount)}
                      </div>
                    </div>
                  </div>
                  {onCouponRemove && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCouponRemove(appliedCoupon.coupon.id)}
                      className="p-1 h-auto text-green-600 hover:text-green-700"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Order Summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            Taxa de entrega
            {deliveryFee === 0 && (
              <Badge variant="success" size="sm">
                Grátis
              </Badge>
            )}
          </span>
          <span>
            {deliveryFee === 0 ? 'Grátis' : formatCurrency(deliveryFee)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Desconto</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
          <span>Tempo estimado: 30-45 minutos</span>
        </div>
        {subtotal < 50 && (
          <div className="flex items-center gap-1 text-amber-600">
            <div className="w-1 h-1 bg-amber-500 rounded-full" />
            <span>
              Faltam {formatCurrency(50 - subtotal)} para frete grátis
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSummary;