// Zustand store types and interfaces
import { User, Product, Order, Address, Notification, UserAchievement, UserChallenge, UserCoupon } from './database'
import { CartItem, ProductFilters, OrderFilters } from './components'

// Base store interface
export interface BaseStore {
  loading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

// Auth store
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  refreshUser: () => Promise<void>
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export interface AuthStore extends AuthState, AuthActions {}

export interface SignUpData {
  name: string
  email: string
  password: string
  phone?: string
}

// Cart store
export interface CartState {
  items: CartItem[]
  isOpen: boolean
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  appliedCoupons: AppliedCoupon[]
  isLoading: boolean
  error: string | null
}

export interface CartActions {
  addItem: (product: Product, options: ProductOptions) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (couponCode: string) => Promise<void>
  removeCoupon: (couponId: string) => void
  calculateTotals: () => void
  setDeliveryFee: (fee: number) => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  syncWithServer: () => Promise<void>
  loadFromStorage: () => void
  saveToStorage: () => void
}

export interface CartStore extends CartState, CartActions {}

export interface ProductOptions {
  sizeId?: string
  customizations: SelectedCustomization[]
  quantity: number
  notes?: string
}

export interface SelectedCustomization {
  customizationId: string
  optionIds: string[]
}

export interface AppliedCoupon {
  id: string
  code: string
  name: string
  discountAmount: number
  appliedAt: string
}

// Products store
export interface ProductsState {
  products: Product[]
  categories: Category[]
  filters: ProductFilters
  searchQuery: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
  currentPage: number
  totalPages: number
  hasMore: boolean
  isLoading: boolean
  error: string | null
}

export interface ProductsActions {
  fetchProducts: (filters?: ProductFilters) => Promise<void>
  fetchCategories: () => Promise<void>
  searchProducts: (query: string) => Promise<void>
  setFilters: (filters: ProductFilters) => void
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void
  loadMore: () => Promise<void>
  resetFilters: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export interface ProductsStore extends ProductsState, ProductsActions {}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  order: number
  isActive: boolean
}

// Orders store
export interface OrdersState {
  orders: Order[]
  currentOrder: Order | null
  filters: OrderFilters
  currentPage: number
  totalPages: number
  hasMore: boolean
  isLoading: boolean
  error: string | null
}

export interface OrdersActions {
  fetchOrders: (filters?: OrderFilters) => Promise<void>
  fetchOrder: (orderId: string) => Promise<void>
  createOrder: (orderData: CreateOrderData) => Promise<Order>
  cancelOrder: (orderId: string) => Promise<void>
  reorder: (orderId: string) => Promise<void>
  trackOrder: (orderId: string) => Promise<OrderTracking>
  setFilters: (filters: OrderFilters) => void
  loadMore: () => Promise<void>
  setCurrentOrder: (order: Order | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  subscribeToOrderUpdates: (orderId: string) => () => void
}

export interface OrdersStore extends OrdersState, OrdersActions {}

export interface CreateOrderData {
  items: CartItem[]
  deliveryType: 'delivery' | 'pickup'
  addressId?: string
  paymentMethod: string
  paymentData?: any
  couponCodes?: string[]
  notes?: string
  scheduledDelivery?: {
    date: string
    timeSlot: string
  }
}

export interface OrderTracking {
  orderId: string
  status: Order['status']
  estimatedDelivery: string
  statusHistory: OrderStatusUpdate[]
  deliveryPerson?: {
    name: string
    phone: string
    location?: {
      lat: number
      lng: number
    }
  }
}

export interface OrderStatusUpdate {
  status: Order['status']
  timestamp: string
  notes?: string
}

// Gamification store
export interface GamificationState {
  points: number
  level: User['level']
  achievements: UserAchievement[]
  challenges: UserChallenge[]
  coupons: UserCoupon[]
  pointsHistory: PointsHistoryItem[]
  levelProgress: LevelProgress
  isLoading: boolean
  error: string | null
}

export interface GamificationActions {
  fetchUserStats: () => Promise<void>
  fetchAchievements: () => Promise<void>
  fetchChallenges: () => Promise<void>
  fetchCoupons: () => Promise<void>
  fetchPointsHistory: () => Promise<void>
  claimAchievement: (achievementId: string) => Promise<void>
  joinChallenge: (challengeId: string) => Promise<void>
  redeemPoints: (rewardId: string, pointsCost: number) => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export interface GamificationStore extends GamificationState, GamificationActions {}

export interface PointsHistoryItem {
  id: string
  points: number
  type: 'earned' | 'spent' | 'expired'
  description: string
  date: string
  expiresAt?: string
}

export interface LevelProgress {
  currentLevel: User['level']
  currentPoints: number
  nextLevel: User['level'] | null
  pointsToNextLevel: number
  progressPercentage: number
  benefits: LevelBenefit[]
}

export interface LevelBenefit {
  type: 'discount' | 'free_delivery' | 'early_access' | 'bonus_points'
  value: number | string
  description: string
}

// Notifications store
export interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
  error: string | null
}

export interface NotificationsActions {
  fetchNotifications: () => Promise<void>
  markAsRead: (notificationId: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  deleteNotification: (notificationId: string) => Promise<void>
  clearAll: () => Promise<void>
  subscribeToNotifications: () => () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export interface NotificationsStore extends NotificationsState, NotificationsActions {}

// Addresses store
export interface AddressesState {
  addresses: Address[]
  defaultAddress: Address | null
  isLoading: boolean
  error: string | null
}

export interface AddressesActions {
  fetchAddresses: () => Promise<void>
  addAddress: (address: AddressFormData) => Promise<void>
  updateAddress: (addressId: string, address: AddressFormData) => Promise<void>
  deleteAddress: (addressId: string) => Promise<void>
  setDefaultAddress: (addressId: string) => Promise<void>
  validateAddress: (zipCode: string) => Promise<AddressValidation>
  calculateDeliveryFee: (addressId: string) => Promise<number>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export interface AddressesStore extends AddressesState, AddressesActions {}

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

export interface AddressValidation {
  isValid: boolean
  address?: {
    street: string
    neighborhood: string
    city: string
    state: string
  }
  deliveryAvailable: boolean
  estimatedFee?: number
}

// UI store
export interface UIState {
  theme: 'light' | 'dark' | 'auto'
  sidebarOpen: boolean
  cartOpen: boolean
  searchOpen: boolean
  notificationsOpen: boolean
  modals: Record<string, boolean>
  toasts: Toast[]
  loading: Record<string, boolean>
  errors: Record<string, string>
}

export interface UIActions {
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  toggleSidebar: () => void
  openSidebar: () => void
  closeSidebar: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleSearch: () => void
  openSearch: () => void
  closeSearch: () => void
  toggleNotifications: () => void
  openNotifications: () => void
  closeNotifications: () => void
  openModal: (modalId: string) => void
  closeModal: (modalId: string) => void
  toggleModal: (modalId: string) => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (toastId: string) => void
  clearToasts: () => void
  setLoading: (key: string, loading: boolean) => void
  setError: (key: string, error: string | null) => void
  clearError: (key: string) => void
  clearAllErrors: () => void
}

export interface UIStore extends UIState, UIActions {}

export interface Toast {
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

// App store (root store combining all stores)
export interface AppStore {
  auth: AuthStore
  cart: CartStore
  products: ProductsStore
  orders: OrdersStore
  gamification: GamificationStore
  notifications: NotificationsStore
  addresses: AddressesStore
  ui: UIStore
}

// Store middleware types
export interface StoreMiddleware<T> {
  (config: T): T
}

export interface PersistOptions {
  name: string
  storage?: Storage
  partialize?: (state: any) => any
  onRehydrateStorage?: (state: any) => void
}

export interface DevtoolsOptions {
  name?: string
  enabled?: boolean
}

// Store selectors
export interface StoreSelectors<T> {
  [key: string]: (state: T) => any
}

// Store subscriptions
export interface StoreSubscription<T> {
  selector: (state: T) => any
  listener: (selectedState: any, previousSelectedState: any) => void
  equalityFn?: (a: any, b: any) => boolean
}

// Store actions with metadata
export interface StoreAction<T = any> {
  type: string
  payload?: T
  meta?: {
    timestamp: number
    source?: string
    [key: string]: any
  }
}

// Store state with metadata
export interface StoreStateWithMeta<T> {
  data: T
  meta: {
    lastUpdated: number
    version: number
    hydrated: boolean
  }
}

// Async action states
export interface AsyncActionState<T = any> {
  data: T | null
  loading: boolean
  error: string | null
  lastFetch?: number
}

export interface AsyncActions<T> {
  fetch: () => Promise<void>
  refetch: () => Promise<void>
  reset: () => void
  setData: (data: T) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

// Store hooks return types
export interface UseStoreReturn<T> {
  state: T
  actions: any
  loading: boolean
  error: string | null
}

export interface UseAsyncStoreReturn<T> extends UseStoreReturn<T> {
  refetch: () => Promise<void>
  reset: () => void
}

// Store configuration
export interface StoreConfig<T> {
  initialState: T
  actions: Record<string, (...args: any[]) => any>
  middleware?: StoreMiddleware<T>[]
  persist?: PersistOptions
  devtools?: DevtoolsOptions
}

// Store provider props
export interface StoreProviderProps {
  children: React.ReactNode
  initialState?: Partial<AppStore>
}