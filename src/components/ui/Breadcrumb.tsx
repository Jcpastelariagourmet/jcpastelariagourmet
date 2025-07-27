import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
  showHome = true,
  className
}) => {
  const allItems = showHome 
    ? [{ label: 'Início', href: '/', icon: <Home className="w-4 h-4" /> }, ...items]
    : items;

  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isCurrent = item.current || isLast;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mr-2" aria-hidden="true">
                  {separator}
                </span>
              )}
              
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 hover:text-primary-600 transition-colors',
                    'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1',
                    isCurrent 
                      ? 'text-gray-900 font-medium' 
                      : 'text-gray-600'
                  )}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;