// API and external services types
import { User, Product, Order, Address, Review, Achievement, Challenge, Coupon } from './database'

// Base API types
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  timestamp: string
}

export interface ApiError {
  code: string
  message: string
  details?: any
  timestamp: string
  path?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  filters?: Record<string, any>
  sort?: {
    field: string
    order: 'asc' | 'desc'
  }
}

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  params?: Record<string, any>
  data?: any
  timeout?: number
  retries?: number
  cache?: boolean
  cacheTTL?: number
}

// Authentication API
export interface AuthApiEndpoints {
  signIn: (credentials: SignInRequest) => Promise<ApiResponse<AuthResponse>>
  signUp: (userData: SignUpRequest) => Promise<ApiResponse<AuthResponse>>
  signOut: () => Promise<ApiResponse<void>>
  refreshToken: (refreshToken: string) => Promise<ApiResponse<TokenResponse>>
  forgotPassword: (email: string) => Promise<ApiResponse<void>>
  resetPassword: (data: ResetPasswordRequest) => Promise<ApiResponse<void>>
  verifyEmail: (token: string) => Promise<ApiResponse<void>>
  changePassword: (data: ChangePasswordRequest) => Promise<ApiResponse<void>>
}

export interface SignInRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignUpRequest {
  name: string
  email: string
  password: string
  phone?: string
  acceptTerms: boolean
  acceptMarketing?: boolean
}

export interface AuthResponse {
  user: User
  tokens: TokenResponse
  expiresAt: string
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// User API
export interface UserApiEndpoints {
  getProfile: () => Promise<ApiResponse<User>>
  updateProfile: (data: UpdateProfileRequest) => Promise<ApiResponse<User>>
  uploadAvatar: (file: File) => Promise<ApiResponse<{ avatarUrl: string }>>
  deleteAccount: (password: string) => Promise<ApiResponse<void>>
  getStats: () => Promise<ApiResponse<UserStats>>
  getPreferences: () => Promise<ApiResponse<UserPreferences>>
  updatePreferences: (preferences: UserPreferences) => Promise<ApiResponse<UserPreferences>>
}

export interface UpdateProfileRequest {
  name?: string
  phone?: string
  preferences?: Partial<UserPreferences>
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

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: 'pt-BR' | 'en-US'
  notifications: NotificationPreferences
  dietary: DietaryPreferences
  delivery: DeliveryPreferences
}

export interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
  orderUpdates: boolean
  promotions: boolean
  achievements: boolean
  challenges: boolean
  reminders: boolean
}

export interface DietaryPreferences {
  restrictions: string[]
  allergies: string[]
  preferences: string[]
  spiceLevel: 'mild' | 'medium' | 'hot' | 'extra_hot'
}

export interface DeliveryPreferences {
  defaultAddressId?: string
  preferredDeliveryTime?: string
  specialInstructions?: string
  contactPreference: 'phone' | 'sms' | 'app'
}

// Products API
export interface ProductsApiEndpoints {
  getProducts: (params?: ProductsQueryParams) => Promise<PaginatedResponse<Product>>
  getProduct: (id: string) => Promise<ApiResponse<Product>>
  getCategories: () => Promise<ApiResponse<Category[]>>
  searchProducts: (query: string, filters?: { categoryId?: string }) => Promise<PaginatedResponse<Product>>
  getFeaturedProducts: () => Promise<ApiResponse<Product[]>>
  getPopularProducts: (limit?: number) => Promise<ApiResponse<Product[]>>
  getNewProducts: (limit?: number) => Promise<ApiResponse<Product[]>>
  getProductReviews: (productId: string, params?: ReviewsQueryParams) => Promise<PaginatedResponse<Review>>
}

export interface ProductsQueryParams {
  page?: number
  limit?: number
  categoryId?: string
  priceMin?: number
  priceMax?: number
  rating?: number
  preparationTimeMax?: number
  dietary?: string[]
  search?: string
  sortBy?: 'name' | 'price' | 'rating' | 'popularity' | 'newest'
  sortOrder?: 'asc' | 'desc'
  isAvailable?: boolean
}



export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  order: number
  isActive: boolean
  productsCount?: number
}

export interface ReviewsQueryParams {
  page?: number
  limit?: number
  rating?: number
  verified?: boolean
  hasImages?: boolean
  sortBy?: 'newest' | 'oldest' | 'rating' | 'helpful'
}

// Orders API
export interface OrdersApiEndpoints {
  getOrders: (params?: OrdersQueryParams) => Promise<PaginatedResponse<Order>>
  getOrder: (id: string) => Promise<ApiResponse<Order>>
  createOrder: (data: CreateOrderRequest) => Promise<ApiResponse<Order>>
  cancelOrder: (id: string, reason?: string) => Promise<ApiResponse<void>>
  trackOrder: (id: string) => Promise<ApiResponse<OrderTracking>>
  reorder: (id: string) => Promise<ApiResponse<Order>>
  getOrderStatuses: () => Promise<ApiResponse<OrderStatus[]>>
}

export interface OrdersQueryParams {
  page?: number
  limit?: number
  status?: Order['status'][]
  dateFrom?: string
  dateTo?: string
  minAmount?: number
  maxAmount?: number
  paymentMethod?: string
  deliveryType?: Order['delivery_type']
}

export interface CreateOrderRequest {
  items: OrderItemRequest[]
  deliveryType: 'delivery' | 'pickup'
  addressId?: string
  paymentMethod: string
  paymentData?: PaymentData
  couponCodes?: string[]
  notes?: string
  scheduledDelivery?: ScheduledDelivery
}

export interface OrderItemRequest {
  productId: string
  quantity: number
  sizeId?: string
  customizations?: CustomizationSelection[]
  notes?: string
}

export interface CustomizationSelection {
  customizationId: string
  optionIds: string[]
}

export interface PaymentData {
  method: 'pix' | 'credit_card' | 'debit_card' | 'cash' | 'points'
  cardData?: CardPaymentData
  pointsAmount?: number
  installments?: number
}

export interface CardPaymentData {
  token: string
  holderName: string
  installments?: number
  saveCard?: boolean
}

export interface ScheduledDelivery {
  date: string
  timeSlot: string
  instructions?: string
}

export interface OrderTracking {
  orderId: string
  status: Order['status']
  estimatedDelivery: string
  statusHistory: OrderStatusUpdate[]
  deliveryPerson?: DeliveryPerson
}

export interface OrderStatusUpdate {
  status: Order['status']
  timestamp: string
  notes?: string
  location?: {
    lat: number
    lng: number
  }
}

export interface DeliveryPerson {
  name: string
  phone: string
  photo?: string
  rating?: number
  location?: {
    lat: number
    lng: number
  }
}

export interface OrderStatus {
  value: Order['status']
  label: string
  description: string
  color: string
  icon: string
}

// Addresses API
export interface AddressesApiEndpoints {
  getAddresses: () => Promise<ApiResponse<Address[]>>
  getAddress: (id: string) => Promise<ApiResponse<Address>>
  createAddress: (data: CreateAddressRequest) => Promise<ApiResponse<Address>>
  updateAddress: (id: string, data: UpdateAddressRequest) => Promise<ApiResponse<Address>>
  deleteAddress: (id: string) => Promise<ApiResponse<void>>
  setDefaultAddress: (id: string) => Promise<ApiResponse<void>>
  validateAddress: (zipCode: string) => Promise<ApiResponse<AddressValidation>>
  calculateDeliveryFee: (addressId: string) => Promise<ApiResponse<DeliveryFeeCalculation>>
}

export interface CreateAddressRequest {
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

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {}

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
  estimatedTime?: number
}

export interface DeliveryFeeCalculation {
  fee: number
  estimatedTime: number
  freeDeliveryThreshold?: number
  zone: string
}

// Gamification API
export interface GamificationApiEndpoints {
  getUserStats: () => Promise<ApiResponse<GamificationStats>>
  getAchievements: () => Promise<ApiResponse<Achievement[]>>
  getUserAchievements: () => Promise<ApiResponse<UserAchievement[]>>
  claimAchievement: (achievementId: string) => Promise<ApiResponse<UserAchievement>>
  getChallenges: (type?: Challenge['type']) => Promise<ApiResponse<Challenge[]>>
  getUserChallenges: () => Promise<ApiResponse<UserChallenge[]>>
  joinChallenge: (challengeId: string) => Promise<ApiResponse<UserChallenge>>
  getCoupons: () => Promise<ApiResponse<Coupon[]>>
  getUserCoupons: () => Promise<ApiResponse<UserCoupon[]>>
  applyCoupon: (code: string) => Promise<ApiResponse<CouponApplication>>
  getPointsHistory: (params?: PointsHistoryParams) => Promise<PaginatedResponse<PointsHistoryItem>>
  redeemPoints: (rewardId: string, pointsCost: number) => Promise<ApiResponse<PointsRedemption>>
  getLeaderboard: (challengeId: string) => Promise<ApiResponse<LeaderboardEntry[]>>
}

export interface GamificationStats {
  points: number
  level: User['level']
  levelProgress: LevelProgress
  achievementsUnlocked: number
  challengesCompleted: number
  pointsEarned: number
  pointsSpent: number
  expiringPoints: number
  nextLevelPoints: number
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

export interface UserAchievement {
  id: string
  achievementId: string
  achievement: Achievement
  earnedAt: string
  pointsEarned: number
}

export interface UserChallenge {
  id: string
  challengeId: string
  challenge: Challenge
  progress: number
  completed: boolean
  completedAt?: string
  pointsEarned: number
}

export interface UserCoupon {
  id: string
  couponId: string
  coupon: Coupon
  usedCount: number
  lastUsedAt?: string
  canUse: boolean
}

export interface CouponApplication {
  coupon: Coupon
  discountAmount: number
  isValid: boolean
  message?: string
}

export interface PointsHistoryParams {
  page?: number
  limit?: number
  type?: 'earned' | 'spent' | 'expired'
  dateFrom?: string
  dateTo?: string
}

export interface PointsHistoryItem {
  id: string
  points: number
  type: 'earned' | 'spent' | 'expired'
  description: string
  date: string
  expiresAt?: string
  referenceId?: string
  referenceType?: string
}

export interface PointsRedemption {
  rewardId: string
  pointsSpent: number
  reward: any
  redeemedAt: string
}

export interface LeaderboardEntry {
  rank: number
  user: {
    id: string
    name: string
    avatar?: string
  }
  progress: number
  completedAt?: string
  points: number
}

// Reviews API
export interface ReviewsApiEndpoints {
  createReview: (data: CreateReviewRequest) => Promise<ApiResponse<Review>>
  updateReview: (id: string, data: UpdateReviewRequest) => Promise<ApiResponse<Review>>
  deleteReview: (id: string) => Promise<ApiResponse<void>>
  getReview: (id: string) => Promise<ApiResponse<Review>>
  markHelpful: (id: string) => Promise<ApiResponse<void>>
  reportReview: (id: string, reason: string) => Promise<ApiResponse<void>>
  uploadReviewImages: (files: File[]) => Promise<ApiResponse<{ urls: string[] }>>
}

export interface CreateReviewRequest {
  productId: string
  orderId: string
  rating: number
  comment?: string
  images?: string[]
  wouldRecommend?: boolean
}

export interface UpdateReviewRequest {
  rating?: number
  comment?: string
  images?: string[]
  wouldRecommend?: boolean
}

// Notifications API
export interface NotificationsApiEndpoints {
  getNotifications: (params?: NotificationsQueryParams) => Promise<PaginatedResponse<Notification>>
  markAsRead: (id: string) => Promise<ApiResponse<void>>
  markAllAsRead: () => Promise<ApiResponse<void>>
  deleteNotification: (id: string) => Promise<ApiResponse<void>>
  clearAll: () => Promise<ApiResponse<void>>
  updatePreferences: (preferences: NotificationPreferences) => Promise<ApiResponse<NotificationPreferences>>
  subscribeToPush: (subscription: PushSubscription) => Promise<ApiResponse<void>>
  unsubscribeFromPush: () => Promise<ApiResponse<void>>
}

export interface NotificationsQueryParams {
  page?: number
  limit?: number
  type?: Notification['type'][]
  read?: boolean
  dateFrom?: string
  dateTo?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'order_update' | 'promotion' | 'achievement' | 'challenge' | 'system' | 'reminder'
  data?: Record<string, any>
  read: boolean
  createdAt: string
}

// External APIs

// Stripe API types
export interface StripeApiEndpoints {
  createPaymentIntent: (data: CreatePaymentIntentRequest) => Promise<StripePaymentIntent>
  confirmPayment: (paymentIntentId: string, paymentMethod: string) => Promise<StripePaymentIntent>
  createCustomer: (data: CreateStripeCustomerRequest) => Promise<StripeCustomer>
  savePaymentMethod: (customerId: string, paymentMethodId: string) => Promise<StripePaymentMethod>
  getPaymentMethods: (customerId: string) => Promise<StripePaymentMethod[]>
  deletePaymentMethod: (paymentMethodId: string) => Promise<void>
  createRefund: (paymentIntentId: string, amount?: number) => Promise<StripeRefund>
}

export interface CreatePaymentIntentRequest {
  amount: number
  currency: string
  customerId?: string
  paymentMethodId?: string
  metadata?: Record<string, string>
  description?: string
}

export interface StripePaymentIntent {
  id: string
  clientSecret: string
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled'
  amount: number
  currency: string
  metadata?: Record<string, string>
}

export interface CreateStripeCustomerRequest {
  email: string
  name: string
  phone?: string
  metadata?: Record<string, string>
}

export interface StripeCustomer {
  id: string
  email: string
  name: string
  phone?: string
  metadata?: Record<string, string>
}

export interface StripePaymentMethod {
  id: string
  type: 'card'
  card: {
    brand: string
    last4: string
    expMonth: number
    expYear: number
  }
}

export interface StripeRefund {
  id: string
  amount: number
  status: 'pending' | 'succeeded' | 'failed'
  reason?: string
}

// PIX API types
export interface PixApiEndpoints {
  generatePixPayment: (data: GeneratePixRequest) => Promise<PixPaymentResponse>
  checkPixPayment: (pixId: string) => Promise<PixPaymentStatus>
  cancelPixPayment: (pixId: string) => Promise<void>
}

export interface GeneratePixRequest {
  amount: number
  description: string
  expiresIn?: number
  metadata?: Record<string, string>
}

export interface PixPaymentResponse {
  id: string
  qrCode: string
  qrCodeImage: string
  pixKey: string
  amount: number
  expiresAt: string
  status: 'pending' | 'paid' | 'expired' | 'cancelled'
}

export interface PixPaymentStatus {
  id: string
  status: 'pending' | 'paid' | 'expired' | 'cancelled'
  paidAt?: string
  amount: number
}

// Email API types
export interface EmailApiEndpoints {
  sendTransactionalEmail: (data: SendEmailRequest) => Promise<EmailResponse>
  sendBulkEmail: (data: SendBulkEmailRequest) => Promise<EmailResponse>
  getEmailTemplate: (templateId: string) => Promise<EmailTemplate>
  trackEmailDelivery: (emailId: string) => Promise<EmailDeliveryStatus>
}

export interface SendEmailRequest {
  to: string | string[]
  subject: string
  template?: string
  templateData?: Record<string, any>
  html?: string
  text?: string
  attachments?: EmailAttachment[]
}

export interface SendBulkEmailRequest {
  recipients: EmailRecipient[]
  subject: string
  template: string
  templateData?: Record<string, any>
  scheduledAt?: string
}

export interface EmailRecipient {
  email: string
  name?: string
  templateData?: Record<string, any>
}

export interface EmailAttachment {
  filename: string
  content: string
  contentType: string
}

export interface EmailResponse {
  id: string
  status: 'sent' | 'queued' | 'failed'
  message?: string
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  html: string
  text?: string
  variables: string[]
}

export interface EmailDeliveryStatus {
  id: string
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained'
  deliveredAt?: string
  openedAt?: string
  clickedAt?: string
}

// WhatsApp API types
export interface WhatsAppApiEndpoints {
  sendMessage: (data: SendWhatsAppMessageRequest) => Promise<WhatsAppMessageResponse>
  sendTemplate: (data: SendWhatsAppTemplateRequest) => Promise<WhatsAppMessageResponse>
  getMessageStatus: (messageId: string) => Promise<WhatsAppMessageStatus>
}

export interface SendWhatsAppMessageRequest {
  to: string
  message: string
  type?: 'text' | 'image' | 'document'
  mediaUrl?: string
}

export interface SendWhatsAppTemplateRequest {
  to: string
  template: string
  parameters?: string[]
  language?: string
}

export interface WhatsAppMessageResponse {
  id: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  timestamp: string
}

export interface WhatsAppMessageStatus {
  id: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  deliveredAt?: string
  readAt?: string
  error?: string
}

// CEP API types
export interface CepApiEndpoints {
  validateCep: (cep: string) => Promise<CepValidationResponse>
  calculateDeliveryFee: (cep: string) => Promise<DeliveryFeeResponse>
}

export interface CepValidationResponse {
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  isValid: boolean
  deliveryAvailable: boolean
}

export interface DeliveryFeeResponse {
  cep: string
  fee: number
  estimatedDays: number
  zone: string
}

// Analytics API types
export interface AnalyticsApiEndpoints {
  trackEvent: (event: AnalyticsEvent) => Promise<void>
  trackPageView: (page: string, properties?: Record<string, any>) => Promise<void>
  trackPurchase: (purchase: PurchaseEvent) => Promise<void>
  getUserAnalytics: () => Promise<UserAnalytics>
}

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  userId?: string
  timestamp?: string
}

export interface PurchaseEvent {
  orderId: string
  value: number
  currency: string
  items: PurchaseItem[]
}

export interface PurchaseItem {
  productId: string
  name: string
  category: string
  quantity: number
  price: number
}

export interface UserAnalytics {
  userId: string
  totalEvents: number
  lastActivity: string
  favoriteCategories: string[]
  averageOrderValue: number
  conversionRate: number
}