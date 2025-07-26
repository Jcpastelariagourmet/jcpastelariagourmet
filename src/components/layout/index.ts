// Layout components exports
export { Header } from './Header';
export { Footer } from './Footer';
export { Sidebar } from './Sidebar';
export { Breadcrumb, useBreadcrumb, BREADCRUMB_CONFIGS } from './Breadcrumb';
export { 
  Container, 
  GridContainer, 
  FlexContainer, 
  Section, 
  PageContainer 
} from './Container';
export { 
  MainLayout, 
  AuthLayout, 
  DashboardLayout, 
  CheckoutLayout 
} from './MainLayout';

// Re-export types
export type { 
  HeaderProps, 
  FooterProps, 
  SidebarProps 
} from '@/types/components';
export type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb';
export type { 
  ContainerProps, 
  GridContainerProps, 
  FlexContainerProps, 
  SectionProps, 
  PageContainerProps 
} from './Container';
export type { 
  MainLayoutProps, 
  AuthLayoutProps, 
  DashboardLayoutProps, 
  CheckoutLayoutProps 
} from './MainLayout';