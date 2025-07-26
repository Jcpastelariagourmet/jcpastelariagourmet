'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BaseComponentProps } from '@/types/components';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps extends BaseComponentProps {
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  maxItems?: number;
}

export function Breadcrumb({
  items = [],
  separator,
  showHome = true,
  maxItems = 5,
  className,
  ...props
}: BreadcrumbProps) {
  const pathname = usePathname();

  // Default separator
  const defaultSeparator = (
    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const sep = separator || defaultSeparator;

  // Generate breadcrumb items from pathname if not provided
  const generateBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = [];

    // Add home if enabled
    if (showHome) {
      breadcrumbItems.push({
        label: 'Início',
        href: '/',
        icon: (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
      });
    }

    // Map path segments to readable labels
    const segmentLabels: Record<string, string> = {
      'cardapio': 'Cardápio',
      'produtos': 'Produtos',
      'produto': 'Produto',
      'categoria': 'Categoria',
      'promocoes': 'Promoções',
      'sobre': 'Sobre Nós',
      'contato': 'Contato',
      'dashboard': 'Dashboard',
      'perfil': 'Perfil',
      'pedidos': 'Pedidos',
      'pedido': 'Pedido',
      'conquistas': 'Conquistas',
      'desafios': 'Desafios',
      'enderecos': 'Endereços',
      'configuracoes': 'Configurações',
      'carrinho': 'Carrinho',
      'checkout': 'Checkout',
      'pagamento': 'Pagamento',
      'confirmacao': 'Confirmação',
      'buscar': 'Buscar',
      'favoritos': 'Favoritos',
      'ajuda': 'Ajuda',
      'faq': 'FAQ',
      'privacidade': 'Política de Privacidade',
      'termos': 'Termos de Uso',
      'admin': 'Administração',
      'relatorios': 'Relatórios',
      'usuarios': 'Usuários',
      'cupons': 'Cupons',
      'avaliacoes': 'Avaliações'
    };

    // Build breadcrumb items from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Skip dynamic route segments (starting with [)
      if (segment.startsWith('[')) return;
      
      breadcrumbItems.push({
        label: segmentLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : currentPath
      });
    });

    return breadcrumbItems;
  };

  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbItems();

  // Truncate items if exceeds maxItems
  const displayItems = breadcrumbItems.length > maxItems
    ? [
        ...breadcrumbItems.slice(0, 1),
        { label: '...', href: undefined },
        ...breadcrumbItems.slice(-maxItems + 2)
      ]
    : breadcrumbItems;

  // Don't render if only home item or empty
  if (displayItems.length <= 1) {
    return null;
  }

  return (
    <nav
      className={cn('flex items-center space-x-1 text-sm', className)}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex items-center space-x-1">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <li key={`${item.href}-${index}`} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 flex-shrink-0" aria-hidden="true">
                  {sep}
                </span>
              )}
              
              {isEllipsis ? (
                <span className="text-gray-500 px-1">...</span>
              ) : isLast || !item.href ? (
                <span
                  className={cn(
                    'flex items-center space-x-1 font-medium',
                    isLast ? 'text-gray-900' : 'text-gray-500'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Utility hook to generate breadcrumb items for specific pages
export function useBreadcrumb() {
  const pathname = usePathname();

  const setBreadcrumb = (items: BreadcrumbItem[]) => {
    // This could be enhanced to work with a context provider
    // For now, it's just a utility to help generate items
    return items;
  };

  const addBreadcrumbItem = (item: BreadcrumbItem) => {
    // Helper to add a single item
    return item;
  };

  return {
    pathname,
    setBreadcrumb,
    addBreadcrumbItem
  };
}

// Pre-built breadcrumb configurations for common pages
export const BREADCRUMB_CONFIGS = {
  product: (productName: string, categoryName?: string): BreadcrumbItem[] => [
    { label: 'Início', href: '/', icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { label: 'Cardápio', href: '/cardapio' },
    ...(categoryName ? [{ label: categoryName, href: `/cardapio?categoria=${categoryName.toLowerCase()}` }] : []),
    { label: productName }
  ],

  category: (categoryName: string): BreadcrumbItem[] => [
    { label: 'Início', href: '/', icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { label: 'Cardápio', href: '/cardapio' },
    { label: categoryName }
  ],

  order: (orderId: string): BreadcrumbItem[] => [
    { label: 'Início', href: '/', icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Pedidos', href: '/pedidos' },
    { label: `Pedido #${orderId}` }
  ],

  checkout: (): BreadcrumbItem[] => [
    { label: 'Início', href: '/', icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { label: 'Carrinho', href: '/carrinho' },
    { label: 'Checkout' }
  ],

  profile: (section?: string): BreadcrumbItem[] => [
    { label: 'Início', href: '/', icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Perfil', href: '/perfil' },
    ...(section ? [{ label: section }] : [])
  ]
};