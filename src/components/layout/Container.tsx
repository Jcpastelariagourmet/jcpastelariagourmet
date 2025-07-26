'use client';

import { forwardRef } from 'react';
import { BaseComponentProps } from '@/types/components';
import { cn } from '@/lib/utils';

export interface ContainerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: keyof JSX.IntrinsicElements;
  centered?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    size = 'lg', 
    padding = 'md', 
    as: Component = 'div',
    centered = true,
    className, 
    children, 
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl', 
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full'
    };

    const paddingClasses = {
      none: '',
      sm: 'px-4 sm:px-6',
      md: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-6 sm:px-8 lg:px-12'
    };

    const ElementComponent = Component as any;
    
    return (
      <ElementComponent
        ref={ref}
        className={cn(
          'w-full',
          sizeClasses[size],
          paddingClasses[padding],
          centered && 'mx-auto',
          className
        )}
        {...props}
      >
        {children}
      </ElementComponent>
    );
  }
);

Container.displayName = 'Container';

// Grid Container for responsive layouts
export interface GridContainerProps extends BaseComponentProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 6 | 12;
    md?: 1 | 2 | 3 | 4 | 6 | 12;
    lg?: 1 | 2 | 3 | 4 | 6 | 12;
    xl?: 1 | 2 | 3 | 4 | 6 | 12;
  };
  as?: keyof JSX.IntrinsicElements;
}

export const GridContainer = forwardRef<HTMLDivElement, GridContainerProps>(
  ({ 
    cols = 1, 
    gap = 'md',
    responsive,
    as: Component = 'div',
    className, 
    children, 
    ...props 
  }, ref) => {
    const colsClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      6: 'grid-cols-6',
      12: 'grid-cols-12'
    };

    const gapClasses = {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8'
    };

    const responsiveClasses = responsive ? [
      responsive.sm && `sm:grid-cols-${responsive.sm}`,
      responsive.md && `md:grid-cols-${responsive.md}`,
      responsive.lg && `lg:grid-cols-${responsive.lg}`,
      responsive.xl && `xl:grid-cols-${responsive.xl}`
    ].filter(Boolean).join(' ') : '';

    const ElementComponent = Component as any;
    
    return (
      <ElementComponent
        ref={ref}
        className={cn(
          'grid',
          colsClasses[cols],
          gapClasses[gap],
          responsiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </ElementComponent>
    );
  }
);

GridContainer.displayName = 'GridContainer';

// Flex Container for flexible layouts
export interface FlexContainerProps extends BaseComponentProps {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  as?: keyof JSX.IntrinsicElements;
}

export const FlexContainer = forwardRef<HTMLDivElement, FlexContainerProps>(
  ({ 
    direction = 'row',
    align = 'start',
    justify = 'start',
    wrap = 'nowrap',
    gap = 'none',
    as: Component = 'div',
    className, 
    children, 
    ...props 
  }, ref) => {
    const directionClasses = {
      row: 'flex-row',
      col: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse'
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline'
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly'
    };

    const wrapClasses = {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
      'wrap-reverse': 'flex-wrap-reverse'
    };

    const gapClasses = {
      none: '',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8'
    };

    const ElementComponent = Component as any;
    
    return (
      <ElementComponent
        ref={ref}
        className={cn(
          'flex',
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          wrapClasses[wrap],
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </ElementComponent>
    );
  }
);

FlexContainer.displayName = 'FlexContainer';

// Section Container for page sections
export interface SectionProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'none' | 'gray' | 'primary' | 'secondary';
  as?: keyof JSX.IntrinsicElements;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    size = 'lg',
    padding = 'lg',
    background = 'none',
    as: Component = 'section',
    className, 
    children, 
    ...props 
  }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-24'
    };

    const backgroundClasses = {
      none: '',
      gray: 'bg-gray-50',
      primary: 'bg-primary/5',
      secondary: 'bg-secondary/5'
    };

    const ElementComponent = Component as any;
    
    return (
      <ElementComponent
        ref={ref}
        className={cn(
          paddingClasses[padding],
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        <Container size={size}>
          {children}
        </Container>
      </ElementComponent>
    );
  }
);

Section.displayName = 'Section';

// Page Container for full page layouts
export interface PageContainerProps extends BaseComponentProps {
  title?: string;
  description?: string;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ 
    title,
    description,
    breadcrumb,
    actions,
    sidebar,
    footer,
    maxWidth = 'xl',
    className, 
    children, 
    ...props 
  }, ref) => {
    return (
      <div ref={ref} className={cn('min-h-screen bg-gray-50', className)} {...props}>
        <Container size={maxWidth} padding="md" className="py-6">
          {/* Breadcrumb */}
          {breadcrumb && (
            <div className="mb-4">
              {breadcrumb}
            </div>
          )}

          {/* Page Header */}
          {(title || description || actions) && (
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  {title && (
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                      {description}
                    </p>
                  )}
                </div>
                {actions && (
                  <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                    {actions}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={cn(
            'flex flex-col gap-6',
            sidebar && 'lg:flex-row'
          )}>
            {/* Sidebar */}
            {sidebar && (
              <aside className="lg:w-64 flex-shrink-0">
                {sidebar}
              </aside>
            )}

            {/* Content */}
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>

          {/* Footer */}
          {footer && (
            <div className="mt-12">
              {footer}
            </div>
          )}
        </Container>
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';