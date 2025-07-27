import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface QuantityControlProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  value,
  min = 0,
  max = 99,
  onChange,
  disabled = false,
  size = 'md',
  className
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizes = {
    sm: 'text-sm w-8',
    md: 'text-base w-12',
    lg: 'text-lg w-16'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className={cn(
          'p-0 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
          sizeClasses[size]
        )}
      >
        <Minus className={iconSizes[size]} />
      </Button>
      
      <span className={cn(
        'text-center font-medium text-gray-900',
        textSizes[size]
      )}>
        {value}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className={cn(
          'p-0 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
          sizeClasses[size]
        )}
      >
        <Plus className={iconSizes[size]} />
      </Button>
    </div>
  );
};

export default QuantityControl;