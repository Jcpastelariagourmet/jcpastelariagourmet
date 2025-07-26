'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { Breadcrumb } from './Breadcrumb';
import { Container } from './Container';
import { BaseComponentProps } from '@/types/components';
import { User } from '@/types/database';
import { cn } from '@/lib/utils';

export interface MainLayoutProps extends BaseComponentProps {
  user?: User | null;
  showHeader?: boolean;
  showFooter?: boolean;
  showBreadcrumb?: boolean;
  showSidebar?: boolean;
  cartItemsCount?: number;
  unreadNotifications?: number;
  onCartToggle?: () => void;
  onAuthToggle?: () => void;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  breadcrumbItems?: Array<{ label: string; href?: string; icon?: React.ReactNode }>;
  headerActions?: React.ReactNode;
  footerContent?: React.ReactNode;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  backgroundColor?: 'white' | 'gray' | 'primary';
}

export function MainLayout({
  user,
  showHeader = true,
  showFooter = true,
  showBreadcrumb = true,
  showSidebar = true,
  cartItemsCount = 0,
  unreadNotifications = 0,
  onCartToggle = () => {},
  onAuthToggle = () => {},
  onProfileClick = () => {},
  onNotificationsClick = () => {},
  breadcrumbItems,
  headerActions,
  footerContent,
  containerSize = 'xl',
  backgroundColor = 'white',
  className,
  children,
  ...props
}: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle cart toggle
  const handleCartToggle = () => {
    onCartToggle();
  };

  // Handle auth toggle
  const handleAuthToggle = () => {
    onAuthToggle();
  };

  // Handle profile click
  const handleProfileClick = () => {
    onProfileClick();
  };

  // Handle notifications click
  const handleNotificationsClick = () => {
    onNotificationsClick();
  };

  // Background classes
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary/5'
  };

  // Pages where breadcrumb should be hidden
  const hideBreadcrumbPages = ['/', '/login', '/cadastro', '/checkout', '/pagamento'];
  const shouldShowBreadcrumb = showBreadcrumb && !hideBreadcrumbPages.includes(pathname);

  // Pages where footer should be minimal or hidden
  const minimalFooterPages = ['/checkout', '/pagamento', '/dashboard'];
  const shouldShowFullFooter = showFooter && !minimalFooterPages.includes(pathname);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div 
      className={cn(
        'min-h-screen flex flex-col',
        backgroundClasses[backgroundColor],
        className
      )}
      {...props}
    >
      {/* Header */}
      {showHeader && (
        <Header
          user={user}
          cartItemsCount={cartItemsCount}
          unreadNotifications={unreadNotifications}
          onCartToggle={handleCartToggle}
          onAuthToggle={handleAuthToggle}
          onProfileClick={handleProfileClick}
          onNotificationsClick={handleNotificationsClick}
        />
      )}

      {/* Sidebar */}
      {showSidebar && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          user={user}
          navigationItems={[]}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Breadcrumb */}
        {shouldShowBreadcrumb && (
          <div className="border-b bg-white">
            <Container size={containerSize} padding="md">
              <div className="py-3">
                <Breadcrumb items={breadcrumbItems} />
              </div>
            </Container>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>
      </main>

      {/* Footer */}
      {shouldShowFullFooter && (
        <Footer
          companyInfo={undefined} // Will use defaults
          socialLinks={[]}
          quickLinks={[]}
        />
      )}

      {/* Minimal Footer for checkout pages */}
      {showFooter && minimalFooterPages.includes(pathname) && (
        <footer className="border-t bg-white py-4">
          <Container size={containerSize} padding="md">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
              <div>© 2024 JC Pastelaria Gourmet. Todos os direitos reservados.</div>
              <div className="flex space-x-4 mt-2 sm:mt-0">
                <a href="/privacidade" className="hover:text-primary">Privacidade</a>
                <a href="/termos" className="hover:text-primary">Termos</a>
                <a href="/ajuda" className="hover:text-primary">Ajuda</a>
              </div>
            </div>
          </Container>
        </footer>
      )}

      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Layout variants for specific page types
export interface AuthLayoutProps extends Omit<MainLayoutProps, 'showHeader' | 'showFooter' | 'showBreadcrumb'> {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export function AuthLayout({
  title,
  subtitle,
  showLogo = true,
  backgroundColor = 'gray',
  containerSize = 'sm',
  className,
  children,
  ...props
}: AuthLayoutProps) {
  return (
    <MainLayout
      showHeader={false}
      showFooter={false}
      showBreadcrumb={false}
      showSidebar={false}
      backgroundColor={backgroundColor}
      containerSize={containerSize}
      className={cn('justify-center items-center', className)}
      {...props}
    >
      <Container size={containerSize} padding="md" className="py-12">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          {showLogo && (
            <div className="text-center mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg mx-auto mb-4">
                JC
              </div>
              <h1 className="text-2xl font-bold text-gray-900">JC Pastelaria Gourmet</h1>
            </div>
          )}

          {/* Title */}
          {title && (
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              {subtitle && (
                <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {children}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}

// Dashboard Layout
export interface DashboardLayoutProps extends Omit<MainLayoutProps, 'showBreadcrumb'> {
  sidebar?: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  pageActions?: React.ReactNode;
}

export function DashboardLayout({
  sidebar,
  pageTitle,
  pageDescription,
  pageActions,
  backgroundColor = 'gray',
  containerSize = 'full',
  className,
  children,
  ...props
}: DashboardLayoutProps) {
  return (
    <MainLayout
      showBreadcrumb={true}
      backgroundColor={backgroundColor}
      containerSize={containerSize}
      className={className}
      {...props}
    >
      <Container size={containerSize} padding="md" className="py-6">
        {/* Page Header */}
        {(pageTitle || pageDescription || pageActions) && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                {pageTitle && (
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {pageTitle}
                  </h1>
                )}
                {pageDescription && (
                  <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    {pageDescription}
                  </p>
                )}
              </div>
              {pageActions && (
                <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                  {pageActions}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dashboard Content */}
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

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </Container>
    </MainLayout>
  );
}

// Checkout Layout
export interface CheckoutLayoutProps extends Omit<MainLayoutProps, 'showFooter' | 'showBreadcrumb'> {
  step?: number;
  totalSteps?: number;
  stepLabels?: string[];
}

export function CheckoutLayout({
  step = 1,
  totalSteps = 3,
  stepLabels = ['Carrinho', 'Entrega', 'Pagamento'],
  backgroundColor = 'gray',
  containerSize = 'lg',
  className,
  children,
  ...props
}: CheckoutLayoutProps) {
  return (
    <MainLayout
      showFooter={true} // Will show minimal footer
      showBreadcrumb={false}
      backgroundColor={backgroundColor}
      containerSize={containerSize}
      className={className}
      {...props}
    >
      <Container size={containerSize} padding="md" className="py-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {stepLabels.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === step;
              const isCompleted = stepNumber < step;
              
              return (
                <div key={label} className="flex items-center">
                  <div className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                    isCompleted 
                      ? 'bg-primary text-white'
                      : isActive
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-600'
                  )}>
                    {isCompleted ? '✓' : stepNumber}
                  </div>
                  <span className={cn(
                    'ml-2 text-sm font-medium',
                    isActive ? 'text-primary' : 'text-gray-600'
                  )}>
                    {label}
                  </span>
                  {index < stepLabels.length - 1 && (
                    <div className={cn(
                      'w-12 h-0.5 mx-4',
                      stepNumber < step ? 'bg-primary' : 'bg-gray-200'
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Checkout Content */}
        {children}
      </Container>
    </MainLayout>
  );
}