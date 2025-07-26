// Enhanced database types with relationships and computed fields
import { Database, Tables, Enums } from './supabase'

// Re-export Supabase enums for convenience
export type UserLevel = Enums<'user_level'>
export type OrderStatus = Enums<'order_status'>
export type PaymentStatus = Enums<'payment_status'>
export type DeliveryType = Enums<'delivery_type'>
export type CustomizationType = Enums<'customization_type'>
export type AchievementType = Enums<'achievement_type'>
export type ChallengeType = Enums<'challenge_type'>
export type CouponType = Enums<'coupon_type'>
export type NotificationType = Enums<'notification_type'>
export type PointsType = Enums<'points_type'>

// Base database types
export type DbUser = Tables<'users'>
export type DbCategory = Tables<'categories'>
export type DbProduct = Tables<'products'>
export type DbProductSize = Tables<'product_sizes'>
export type DbProductCustomization = Tables<'product_customizations'>
export type DbCustomizationOption = Tables<'customization_options'>
export type DbAddress = Tables<'addresses'>
export type DbOrder = Tables<'orders'>
export type DbOrderItem = Tables<'order_items'>
export type DbAchievement = Tables<'achievements'>
export type DbUserAchievement = Tables<'user_achievements'>
export type DbChallenge = Tables<'challenges'>
export type DbUserChallenge = Tables<'user_challenges'>
export type DbCoupon = Tables<'coupons'>
export type DbUserCoupon = Tables<'user_coupons'>
export type DbPointsHistory = Tables<'points_history'>
export type DbReview = Tables<'reviews'>
export type DbNotification = Tables<'notifications'>
export type DbSystemSettings = Tables<'system_settings'>

// Enhanced types with relationships and computed fields
export interface User extends DbUser {
  addresses?: Address[]
  achievements?: UserAchievement[]
  challenges?: UserChallenge[]
  coupons?: UserCoupon[]
  orders?: Order[]
  reviews?: Review[]
  notifications?: Notification[]
  pointsHistory?: PointsHistory[]
  
  // Computed fields
  nextLevelPoints?: number
  levelProgress?: number
  expiringPoints?: number
  availableCoupons?: UserCoupon[]
  unreadNotifications?: number
}

export interface Category extends DbCategory {
  products?: Product[]
  productsCount?: number
}

export interface Product extends DbProduct {
  category?: Category
  sizes?: ProductSize[]
  customizations?: ProductCustomization[]
  reviews?: Review[]
  
  // Computed fields
  averageRating?: number
  isPopular?: boolean
  isNew?: boolean
  discountedPrice?: number
  finalPrice?: number
}

export interface ProductSize extends DbProductSize {
  product?: Product
}

export interface ProductCustomization extends DbProductCustomization {
  product?: Product
  options?: CustomizationOption[]
}

export interface CustomizationOption extends DbCustomizationOption {
  customization?: ProductCustomization
}

export interface Address extends DbAddress {
  user?: User
  orders?: Order[]
  
  // Computed fields
  fullAddress?: string
  isInDeliveryArea?: boolean
  deliveryFee?: number
}

export interface Order extends DbOrder {
  user?: User
  items?: OrderItem[]
  deliveryAddress?: Address
  appliedCoupons?: UserCoupon[]
  
  // Computed fields
  itemsCount?: number
  estimatedDeliveryMinutes?: number
  canBeCancelled?: boolean
  statusHistory?: OrderStatusHistory[]
}

export interface OrderItem extends DbOrderItem {
  order?: Order
  product?: Product
  size?: ProductSize
  selectedCustomizations?: SelectedCustomization[]
}

export interface Achievement extends DbAchievement {
  userAchievements?: UserAchievement[]
  
  // Computed fields
  unlockedByUsersCount?: number
  completionRate?: number
}

export interface UserAchievement extends DbUserAchievement {
  user?: User
  achievement?: Achievement
}

export interface Challenge extends DbChallenge {
  userChallenges?: UserChallenge[]
  
  // Computed fields
  participantsCount?: number
  completionRate?: number
  timeRemaining?: number
  isActive?: boolean
}

export interface UserChallenge extends DbUserChallenge {
  user?: User
  challenge?: Challenge
  
  // Computed fields
  progressPercentage?: number
  isCompleted?: boolean
  canComplete?: boolean
}

export interface Coupon extends DbCoupon {
  userCoupons?: UserCoupon[]
  
  // Computed fields
  isValid?: boolean
  isExpired?: boolean
  remainingUses?: number
  discountAmount?: number
}

export interface UserCoupon extends DbUserCoupon {
  user?: User
  coupon?: Coupon
  
  // Computed fields
  canUse?: boolean
  remainingUses?: number
}

export interface PointsHistory extends DbPointsHistory {
  user?: User
  
  // Computed fields
  isExpired?: boolean
  daysUntilExpiry?: number
}

export interface Review extends DbReview {
  user?: User
  product?: Product
  order?: Order
  
  // Computed fields
  isHelpful?: boolean
  helpfulCount?: number
}

export interface Notification extends DbNotification {
  user?: User
  
  // Computed fields
  isRecent?: boolean
  timeAgo?: string
}

export interface SystemSettings extends DbSystemSettings {
  // Computed fields
  parsedValue?: any
}

// Additional computed types
export interface OrderStatusHistory {
  status: OrderStatus
  timestamp: string
  notes?: string
}

export interface SelectedCustomization {
  customizationId: string
  customizationName: string
  optionIds: string[]
  optionNames: string[]
  totalPriceModifier: number
}

export interface UserStats {
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  favoriteCategory?: string
  favoriteProduct?: string
  pointsEarned: number
  pointsSpent: number
  achievementsUnlocked: number
  challengesCompleted: number
  reviewsWritten: number
  loyaltyLevel: UserLevel
  memberSince: string
}

export interface ProductStats {
  totalOrders: number
  totalRevenue: number
  averageRating: number
  reviewsCount: number
  popularityRank?: number
  conversionRate?: number
}

export interface CategoryStats {
  productsCount: number
  totalOrders: number
  totalRevenue: number
  averageRating: number
  popularityRank?: number
}

// Level configuration
export interface LevelConfig {
  level: UserLevel
  minPoints: number
  maxPoints: number
  benefits: LevelBenefit[]
  color: string
  icon: string
  name: string
}

export interface LevelBenefit {
  type: 'discount' | 'free_delivery' | 'early_access' | 'bonus_points' | 'special_offers'
  value: number | string
  description: string
}

// Nutritional information structure
export interface NutritionalInfo {
  calories?: number
  protein?: number
  carbohydrates?: number
  fat?: number
  fiber?: number
  sodium?: number
  sugar?: number
  servingSize?: string
  servingsPerContainer?: number
}

// User preferences structure
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

// Payment data structures
export interface PaymentData {
  method: 'pix' | 'credit_card' | 'debit_card' | 'cash' | 'points'
  pixData?: PixPaymentData
  cardData?: CardPaymentData
  pointsData?: PointsPaymentData
}

export interface PixPaymentData {
  qrCode: string
  pixKey: string
  expiresAt: string
  amount: number
}

export interface CardPaymentData {
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  holderName: string
  installments?: number
}

export interface PointsPaymentData {
  pointsUsed: number
  remainingBalance: number
  conversionRate: number
}

// Achievement and challenge requirements
export interface AchievementRequirement {
  type: 'orders_count' | 'total_spent' | 'products_tried' | 'consecutive_days' | 'time_based' | 'category_specific'
  value: number
  timeframe?: string
  categoryId?: string
  productIds?: string[]
  conditions?: Record<string, any>
}

export interface ChallengeRequirement {
  type: 'orders_count' | 'total_spent' | 'products_tried' | 'daily_active' | 'referrals' | 'reviews'
  target: number
  timeframe: string
  conditions?: Record<string, any>
  rewards?: ChallengeReward[]
}

export interface ChallengeReward {
  type: 'points' | 'coupon' | 'badge' | 'level_boost'
  value: number | string
  description: string
}