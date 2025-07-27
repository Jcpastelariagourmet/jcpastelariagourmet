// Component-specific types and interfaces
import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, FormHTMLAttributes } from 'react'
import { User, Product, Order, Category, Achievement, Challenge, Coupon, Address, Review, UserAchievement, UserChallenge } from './database'

// Base component props
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  testId?: string
}

// Button component types
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>, BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

// Input component types
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseComponentProps {
  label?: string
  error?: string
  helper?: string
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onRightIconClick?: () => void
}

// Modal component types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  footer?: ReactNode
}

// Card component types
export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outlined' | 'elevated' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  clickable?: boolean
  onClick?: () => void
}

// Badge component types
export interface BadgeProps extends BaseComponentProps {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

// Loading component types
export interface LoadingProps extends BaseComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  text?: string
}

// Toast notification types
export interface ToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Layout component types
export interface HeaderProps extends BaseComponentProps {
  user?: User | null
  cartItemsCount: number
  onCartToggle: () => void
  onAuthToggle: () => void
  onProfileClick: () => void
  onNotificationsClick: () => void
  unreadNotifications: number
}

export interface FooterProps extends BaseComponentProps {
  companyInfo?: CompanyInfo
  socialLinks?: SocialLink[]
  quickLinks?: QuickLink[]
}

export interface SidebarProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  user?: User | null
  navigationItems: NavigationItem[]
}

// Product component types
export interface ProductCardProps extends BaseComponentProps {
  product: Product
  onAddToCart: (product: Product, options: ProductOptions) => void
  onQuickView: (product: Product) => void
  onFavoriteToggle?: (product: Product) => void
  isFavorite?: boolean
  isLoading?: boolean
  showQuickActions?: boolean
}

export interface ProductGridProps extends BaseComponentProps {
  products: Product[]
  loading?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  emptyState?: ReactNode
}

export interface ProductModalProps extends BaseComponentProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, options: ProductOptions) => void
}

export interface ProductCustomizerProps extends BaseComponentProps {
  product: Product
  selectedOptions: ProductOptions
  onOptionsChange: (options: ProductOptions) => void
  onPriceCalculate: (price: number) => void
}



// Cart component types
export interface CartDrawerProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onClearCart: () => void
  onCheckout: () => void
  loading?: boolean
}

export interface CartItemProps extends BaseComponentProps {
  item: CartItem
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
  isEditable?: boolean
  showImage?: boolean
}

export interface CartSummaryProps extends BaseComponentProps {
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  appliedCoupons?: AppliedCoupon[]
  onCouponApply?: (code: string) => void
  onCouponRemove?: (couponId: string) => void
}

// Gamification component types
export interface PointsDisplayProps extends BaseComponentProps {
  points: number
  level: User['level']
  nextLevelPoints: number
  animated?: boolean
  showProgress?: boolean
}

export interface LevelProgressProps extends BaseComponentProps {
  currentPoints: number
  levelRange: { min: number; max: number }
  showAnimation?: boolean
  showLabels?: boolean
}

export interface AchievementCardProps extends BaseComponentProps {
  achievement: Achievement
  userAchievement?: UserAchievement
  isUnlocked: boolean
  progress?: number
  onClaim?: () => void
  showProgress?: boolean
}

export interface ChallengeCardProps extends BaseComponentProps {
  challenge: Challenge
  userChallenge?: UserChallenge
  onParticipate: () => void
  showLeaderboard?: boolean
}

export interface LeaderboardProps extends BaseComponentProps {
  challenge: Challenge
  participants: ChallengeParticipant[]
  currentUser?: User
  showRank?: number
}

// Dashboard component types
export interface UserDashboardProps extends BaseComponentProps {
  user: User
  stats: UserStats
  recentOrders: Order[]
  activeChallenges: Challenge[]
  achievements: UserAchievement[]
  notifications: Notification[]
}

export interface StatsCardProps extends BaseComponentProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

export interface QuickActionsProps extends BaseComponentProps {
  user: User
  onReorderLast: () => void
  onViewFavorites: () => void
  onViewCoupons: () => void
  onViewAchievements: () => void
}

// Order component types
export interface OrderCardProps extends BaseComponentProps {
  order: Order
  onViewDetails: (order: Order) => void
  onReorder?: (order: Order) => void
  onCancel?: (order: Order) => void
  onTrack?: (order: Order) => void
  showActions?: boolean
}

export interface OrderTrackingProps extends BaseComponentProps {
  order: Order
  onStatusUpdate?: (status: Order['status']) => void
  realTimeUpdates?: boolean
}

export interface OrderHistoryProps extends BaseComponentProps {
  orders: Order[]
  loading?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  filters?: OrderFilters
  onFiltersChange?: (filters: OrderFilters) => void
}

// Review component types
export interface ReviewCardProps extends BaseComponentProps {
  review: Review
  showProduct?: boolean
  showUser?: boolean
  onHelpful?: (reviewId: string) => void
  onReport?: (reviewId: string) => void
}

export interface ReviewFormProps extends BaseComponentProps {
  product: Product
  order?: Order
  onSubmit: (review: ReviewFormData) => void
  onCancel: () => void
  loading?: boolean
}

export interface ReviewsListProps extends BaseComponentProps {
  reviews: Review[]
  loading?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  filters?: ReviewFilters
  onFiltersChange?: (filters: ReviewFilters) => void
}

// Address component types
export interface AddressCardProps extends BaseComponentProps {
  address: Address
  onEdit: (address: Address) => void
  onDelete: (address: Address) => void
  onSetDefault: (address: Address) => void
  showActions?: boolean
  isSelected?: boolean
  onSelect?: (address: Address) => void
}

export interface AddressFormProps extends BaseComponentProps {
  address?: Address
  onSubmit: (address: AddressFormData) => void
  onCancel: () => void
  loading?: boolean
}

// Notification component types
export interface NotificationItemProps extends BaseComponentProps {
  notification: Notification
  onRead: (notificationId: string) => void
  onDelete: (notificationId: string) => void
  onAction?: (notification: Notification) => void
}

export interface NotificationCenterProps extends BaseComponentProps {
  notifications: Notification[]
  loading?: boolean
  onMarkAllRead: () => void
  onClearAll: () => void
  onLoadMore?: () => void
  hasMore?: boolean
}

// Form data types
export interface ProductOptions {
  sizeId?: string
  customizations: SelectedCustomization[]
  quantity: number
  notes?: string
}

export interface SelectedCustomization {
  customizationId: string
  customizationName?: string
  optionIds: string[]
  optionNames: string[]
}

export interface CartItem {
  id: string
  product: Product
  options: ProductOptions
  unitPrice: number
  totalPrice: number
  addedAt: string
}

export interface AppliedCoupon {
  coupon: Coupon
  discountAmount: number
  appliedAt: string
}



export interface OrderFilters {
  status?: Order['status'][]
  dateRange?: [string, string]
  minAmount?: number
  maxAmount?: number
  paymentMethod?: string
  deliveryType?: Order['delivery_type']
}

export interface ReviewFilters {
  rating?: number
  verified?: boolean
  hasImages?: boolean
  dateRange?: [string, string]
  sortBy?: 'newest' | 'oldest' | 'rating' | 'helpful'
}

export interface ReviewFormData {
  rating: number
  comment?: string
  images?: File[]
}

export interface AddressFormData {
  name: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isDefault?: boolean
}

// Utility types
export interface CompanyInfo {
  name: string
  description: string
  address: string
  phone: string
  email: string
  whatsapp: string
  cnpj: string
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'tiktok'
  url: string
  icon: ReactNode
}

export interface QuickLink {
  label: string
  href: string
  external?: boolean
}

export interface NavigationItem {
  label: string
  href: string
  icon?: ReactNode
  badge?: string | number
  children?: NavigationItem[]
}

export interface ChallengeParticipant {
  user: User
  progress: number
  rank: number
  completedAt?: string
}

export interface UserStats {
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  pointsEarned: number
  pointsSpent: number
  currentLevel: User['level']
  achievementsCount: number
  challengesCompleted: number
  favoriteCategory?: string
  memberSince: string
}

// Animation and transition types
export interface AnimationProps {
  initial?: any
  animate?: any
  exit?: any
  transition?: any
  variants?: any
}

// Theme and styling types
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  success: string
  warning: string
  error: string
  info: string
}

export interface Breakpoints {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

// API Response types
export interface ApiResponse<T = any> {
  data: T
  success: boolean
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Error handling types
export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: any) => void
}

export interface ErrorFallbackProps {
  error?: Error
  resetError?: () => void
}

// Accessibility types
export interface A11yProps {
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-hidden'?: boolean
  'aria-live'?: 'polite' | 'assertive' | 'off'
  role?: string
  tabIndex?: number
}