// Supabase client configuration
import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Check if we have valid Supabase configuration
const hasValidSupabaseConfig = supabaseUrl !== 'your_supabase_project_url' && 
                               supabaseUrl !== 'https://placeholder.supabase.co' &&
                               supabaseAnonKey !== 'your_supabase_anon_key' &&
                               supabaseAnonKey !== 'placeholder-key'

// Create a single supabase client for interacting with your database
export const supabase = hasValidSupabaseConfig ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
}) : null

// Client component client (for use in client components)
export const createSupabaseClient = () => hasValidSupabaseConfig ? createClientComponentClient<Database>() : null

// Type-safe database helpers
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Commonly used types
export type User = Tables<'users'>
export type Product = Tables<'products'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
export type Category = Tables<'categories'>
export type Address = Tables<'addresses'>
export type Review = Tables<'reviews'>
export type Achievement = Tables<'achievements'>
export type Challenge = Tables<'challenges'>
export type Coupon = Tables<'coupons'>
export type Notification = Tables<'notifications'>

// Enum types
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

// Database query helpers
export const db = supabase ? {
  // Users
  users: () => supabase.from('users'),
  
  // Products
  products: () => supabase.from('products'),
  categories: () => supabase.from('categories'),
  productSizes: () => supabase.from('product_sizes'),
  productCustomizations: () => supabase.from('product_customizations'),
  customizationOptions: () => supabase.from('customization_options'),
  
  // Orders
  orders: () => supabase.from('orders'),
  orderItems: () => supabase.from('order_items'),
  
  // Addresses
  addresses: () => supabase.from('addresses'),
  
  // Reviews
  reviews: () => supabase.from('reviews'),
  
  // Gamification
  achievements: () => supabase.from('achievements'),
  userAchievements: () => supabase.from('user_achievements'),
  challenges: () => supabase.from('challenges'),
  userChallenges: () => supabase.from('user_challenges'),
  pointsHistory: () => supabase.from('points_history'),
  
  // Coupons
  coupons: () => supabase.from('coupons'),
  userCoupons: () => supabase.from('user_coupons'),
  
  // Notifications
  notifications: () => supabase.from('notifications'),
  
  // System
  systemSettings: () => supabase.from('system_settings')
} : null

// Auth helpers
export const auth = supabase ? {
  signUp: (email: string, password: string, options?: { data?: any }) =>
    supabase.auth.signUp({ email, password, options }),
  
  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),
  
  signOut: () => supabase.auth.signOut(),
  
  getUser: () => supabase.auth.getUser(),
  
  getSession: () => supabase.auth.getSession(),
  
  onAuthStateChange: (callback: (event: string, session: any) => void) =>
    supabase.auth.onAuthStateChange(callback),
  
  resetPassword: (email: string) =>
    supabase.auth.resetPasswordForEmail(email),
  
  updatePassword: (password: string) =>
    supabase.auth.updateUser({ password })
} : null

// Storage helpers
export const storage = supabase ? {
  upload: (bucket: string, path: string, file: File) =>
    supabase.storage.from(bucket).upload(path, file),
  
  download: (bucket: string, path: string) =>
    supabase.storage.from(bucket).download(path),
  
  getPublicUrl: (bucket: string, path: string) =>
    supabase.storage.from(bucket).getPublicUrl(path),
  
  remove: (bucket: string, paths: string[]) =>
    supabase.storage.from(bucket).remove(paths)
} : null

// Realtime helpers
export const realtime = supabase ? {
  subscribe: (table: string, callback: (payload: any) => void) =>
    supabase
      .channel(`public:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe(),
  
  unsubscribe: (channel: any) => supabase.removeChannel(channel)
} : null

// Export flag to check if Supabase is configured
export const isSupabaseConfigured = hasValidSupabaseConfig

export default supabase