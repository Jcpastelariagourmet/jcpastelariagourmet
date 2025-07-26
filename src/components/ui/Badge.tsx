import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors duration-200';
    
    const variants = {
      default: 'bg-gray-100 text-gray-800 border border-gray-200',
      primary: 'bg-primary-100 text-primary-800 border border-primary-200',
      secondary: 'bg-accent-100 text-accent-800 border border-accent-200',
      success: 'bg-green-100 text-green-800 border border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      error: 'bg-red-100 text-red-800 border border-red-200',
      info: 'bg-blue-100 text-blue-800 border border-blue-200'
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base'
    };

    return (
      <span
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Status-specific badge variants for common use cases
export const StatusBadge: React.FC<{
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  size?: BadgeProps['size'];
  className?: string;
}> = ({ status, size = 'md', className }) => {
  const statusConfig = {
    pending: { variant: 'warning' as const, label: 'Pendente' },
    confirmed: { variant: 'info' as const, label: 'Confirmado' },
    preparing: { variant: 'primary' as const, label: 'Preparando' },
    ready: { variant: 'success' as const, label: 'Pronto' },
    out_for_delivery: { variant: 'primary' as const, label: 'Saiu para Entrega' },
    delivered: { variant: 'success' as const, label: 'Entregue' },
    cancelled: { variant: 'error' as const, label: 'Cancelado' }
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size={size} className={className}>
      {config.label}
    </Badge>
  );
};

export const LevelBadge: React.FC<{
  level: 'bronze' | 'silver' | 'gold' | 'diamond';
  size?: BadgeProps['size'];
  className?: string;
}> = ({ level, size = 'md', className }) => {
  const levelConfig = {
    bronze: { variant: 'warning' as const, label: 'Bronze' },
    silver: { variant: 'default' as const, label: 'Prata' },
    gold: { variant: 'primary' as const, label: 'Ouro' },
    diamond: { variant: 'info' as const, label: 'Diamante' }
  };

  const config = levelConfig[level];

  return (
    <Badge variant={config.variant} size={size} className={className}>
      {config.label}
    </Badge>
  );
};

export { Badge };