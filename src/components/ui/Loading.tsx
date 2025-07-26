import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  text,
  className
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colors = {
    primary: 'text-primary-500',
    secondary: 'text-accent-500',
    white: 'text-white',
    gray: 'text-gray-500'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  if (variant === 'spinner') {
    return (
      <div className={cn('flex flex-col items-center justify-center', className)}>
        <svg
          className={cn(
            'animate-spin',
            sizes[size],
            colors[color]
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {text && (
          <p className={cn('mt-2', textSizes[size], colors[color])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex flex-col items-center justify-center', className)}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-full animate-pulse',
                size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5',
                color === 'primary' ? 'bg-primary-500' : 
                color === 'secondary' ? 'bg-accent-500' :
                color === 'white' ? 'bg-white' : 'bg-gray-500'
              )}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.4s'
              }}
            />
          ))}
        </div>
        {text && (
          <p className={cn('mt-2', textSizes[size], colors[color])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex flex-col items-center justify-center', className)}>
        <div
          className={cn(
            'rounded-full animate-ping',
            sizes[size],
            color === 'primary' ? 'bg-primary-500' : 
            color === 'secondary' ? 'bg-accent-500' :
            color === 'white' ? 'bg-white' : 'bg-gray-500'
          )}
        />
        {text && (
          <p className={cn('mt-2', textSizes[size], colors[color])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  return null;
};

// Full page loading component
export const PageLoading: React.FC<{ text?: string }> = ({ text = 'Carregando...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <Loading size="xl" text={text} />
    </div>
  );
};

// Inline loading component for buttons and small areas
export const InlineLoading: React.FC<{ size?: LoadingProps['size'] }> = ({ size = 'sm' }) => {
  return <Loading size={size} variant="spinner" className="inline-flex" />;
};

// Loading overlay for specific components
export const LoadingOverlay: React.FC<{ 
  isLoading: boolean; 
  text?: string; 
  children: React.ReactNode;
}> = ({ isLoading, text, children }) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <Loading text={text} />
        </div>
      )}
    </div>
  );
};

export { Loading };