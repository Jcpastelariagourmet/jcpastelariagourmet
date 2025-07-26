// Auto-generated types from Supabase schema
// This file should be regenerated when schema changes using: npm run db:generate
// Generated on: 2025-07-26T17:50:11.844Z
// Project ID: erfqevqavxguigyxtgfu

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone: string | null
          avatar_url: string | null
          points: number
          level: Database['public']['Enums']['user_level']
          total_spent: number
          orders_count: number
          preferences: Json
          is_active: boolean
          email_verified: boolean
          phone_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone?: string | null
          avatar_url?: string | null
          points?: number
          level?: Database['public']['Enums']['user_level']
          total_spent?: number
          orders_count?: number
          preferences?: Json
          is_active?: boolean
          email_verified?: boolean
          phone_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string | null
          avatar_url?: string | null
          points?: number
          level?: Database['public']['Enums']['user_level']
          total_spent?: number
          orders_count?: number
          preferences?: Json
          is_active?: boolean
          email_verified?: boolean
          phone_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          color: string | null
          order_index: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          color?: string | null
          order_index?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          order_index?: number
          is_active?: boolean
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category_id: string
          image_url: string | null
          images: string[]
          is_available: boolean
          preparation_time: number
          rating: number
          reviews_count: number
          orders_count: number
          nutritional_info: Json
          allergens: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category_id: string
          image_url?: string | null
          images?: string[]
          is_available?: boolean
          preparation_time?: number
          rating?: number
          reviews_count?: number
          orders_count?: number
          nutritional_info?: Json
          allergens?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category_id?: string
          image_url?: string | null
          images?: string[]
          is_available?: boolean
          preparation_time?: number
          rating?: number
          reviews_count?: number
          orders_count?: number
          nutritional_info?: Json
          allergens?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      product_sizes: {
        Row: {
          id: string
          product_id: string
          name: string
          price_modifier: number
          description: string | null
          is_available: boolean
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          price_modifier?: number
          description?: string | null
          is_available?: boolean
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          price_modifier?: number
          description?: string | null
          is_available?: boolean
        }
      }
      product_customizations: {
        Row: {
          id: string
          product_id: string
          name: string
          type: Database['public']['Enums']['customization_type']
          required: boolean
          max_selections: number
          order_index: number
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          type: Database['public']['Enums']['customization_type']
          required?: boolean
          max_selections?: number
          order_index?: number
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          type?: Database['public']['Enums']['customization_type']
          required?: boolean
          max_selections?: number
          order_index?: number
        }
      }
      customization_options: {
        Row: {
          id: string
          customization_id: string
          name: string
          price_modifier: number
          is_available: boolean
          order_index: number
        }
        Insert: {
          id?: string
          customization_id: string
          name: string
          price_modifier?: number
          is_available?: boolean
          order_index?: number
        }
        Update: {
          id?: string
          customization_id?: string
          name?: string
          price_modifier?: number
          is_available?: boolean
          order_index?: number
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          name: string
          street: string
          number: string
          complement: string | null
          neighborhood: string
          city: string
          state: string
          zip_code: string
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          street: string
          number: string
          complement?: string | null
          neighborhood: string
          city: string
          state: string
          zip_code: string
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          street?: string
          number?: string
          complement?: string | null
          neighborhood?: string
          city?: string
          state?: string
          zip_code?: string
          is_default?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          subtotal: number
          delivery_fee: number
          discount: number
          total: number
          delivery_address_id: string | null
          delivery_type: Database['public']['Enums']['delivery_type']
          estimated_delivery_time: string | null
          status: Database['public']['Enums']['order_status']
          payment_status: Database['public']['Enums']['payment_status']
          payment_method: string
          payment_data: Json
          notes: string | null
          created_at: string
          updated_at: string
          delivered_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          subtotal: number
          delivery_fee?: number
          discount?: number
          total: number
          delivery_address_id?: string | null
          delivery_type: Database['public']['Enums']['delivery_type']
          estimated_delivery_time?: string | null
          status?: Database['public']['Enums']['order_status']
          payment_status?: Database['public']['Enums']['payment_status']
          payment_method: string
          payment_data?: Json
          notes?: string | null
          created_at?: string
          updated_at?: string
          delivered_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          subtotal?: number
          delivery_fee?: number
          discount?: number
          total?: number
          delivery_address_id?: string | null
          delivery_type?: Database['public']['Enums']['delivery_type']
          estimated_delivery_time?: string | null
          status?: Database['public']['Enums']['order_status']
          payment_status?: Database['public']['Enums']['payment_status']
          payment_method?: string
          payment_data?: Json
          notes?: string | null
          created_at?: string
          updated_at?: string
          delivered_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          size_id: string | null
          customizations: Json
          notes: string | null
          unit_price: number
          total_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          size_id?: string | null
          customizations?: Json
          notes?: string | null
          unit_price: number
          total_price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          size_id?: string | null
          customizations?: Json
          notes?: string | null
          unit_price?: number
          total_price?: number
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          points_reward: number
          type: Database['public']['Enums']['achievement_type']
          requirements: Json
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          points_reward: number
          type: Database['public']['Enums']['achievement_type']
          requirements: Json
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          points_reward?: number
          type?: Database['public']['Enums']['achievement_type']
          requirements?: Json
          is_active?: boolean
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
          points_earned: number
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
          points_earned: number
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
          points_earned?: number
        }
      }
      challenges: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          points_reward: number
          type: Database['public']['Enums']['challenge_type']
          requirements: Json
          start_date: string
          end_date: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          points_reward: number
          type: Database['public']['Enums']['challenge_type']
          requirements: Json
          start_date: string
          end_date: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          points_reward?: number
          type?: Database['public']['Enums']['challenge_type']
          requirements?: Json
          start_date?: string
          end_date?: string
          is_active?: boolean
          created_at?: string
        }
      }
      user_challenges: {
        Row: {
          id: string
          user_id: string
          challenge_id: string
          progress: number
          completed: boolean
          completed_at: string | null
          points_earned: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          challenge_id: string
          progress?: number
          completed?: boolean
          completed_at?: string | null
          points_earned?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          challenge_id?: string
          progress?: number
          completed?: boolean
          completed_at?: string | null
          points_earned?: number
          created_at?: string
        }
      }
      coupons: {
        Row: {
          id: string
          code: string
          name: string
          description: string | null
          type: Database['public']['Enums']['coupon_type']
          value: number
          minimum_order: number
          maximum_discount: number | null
          usage_limit: number | null
          usage_count: number
          user_limit: number
          valid_from: string
          valid_until: string
          is_active: boolean
          applicable_products: string[]
          applicable_categories: string[]
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          description?: string | null
          type: Database['public']['Enums']['coupon_type']
          value: number
          minimum_order?: number
          maximum_discount?: number | null
          usage_limit?: number | null
          usage_count?: number
          user_limit?: number
          valid_from: string
          valid_until: string
          is_active?: boolean
          applicable_products?: string[]
          applicable_categories?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          description?: string | null
          type?: Database['public']['Enums']['coupon_type']
          value?: number
          minimum_order?: number
          maximum_discount?: number | null
          usage_limit?: number | null
          usage_count?: number
          user_limit?: number
          valid_from?: string
          valid_until?: string
          is_active?: boolean
          applicable_products?: string[]
          applicable_categories?: string[]
          created_at?: string
        }
      }
      user_coupons: {
        Row: {
          id: string
          user_id: string
          coupon_id: string
          used_count: number
          last_used_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          coupon_id: string
          used_count?: number
          last_used_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          coupon_id?: string
          used_count?: number
          last_used_at?: string | null
          created_at?: string
        }
      }
      points_history: {
        Row: {
          id: string
          user_id: string
          points: number
          type: Database['public']['Enums']['points_type']
          description: string
          reference_id: string | null
          reference_type: string | null
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          points: number
          type: Database['public']['Enums']['points_type']
          description: string
          reference_id?: string | null
          reference_type?: string | null
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          points?: number
          type?: Database['public']['Enums']['points_type']
          description?: string
          reference_id?: string | null
          reference_type?: string | null
          expires_at?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          product_id: string
          order_id: string
          rating: number
          comment: string | null
          images: string[]
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          order_id: string
          rating: number
          comment?: string | null
          images?: string[]
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          order_id?: string
          rating?: number
          comment?: string | null
          images?: string[]
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: Database['public']['Enums']['notification_type']
          data: Json
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: Database['public']['Enums']['notification_type']
          data?: Json
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: Database['public']['Enums']['notification_type']
          data?: Json
          read?: boolean
          created_at?: string
        }
      }
      system_settings: {
        Row: {
          key: string
          value: Json
          description: string | null
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          description?: string | null
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          description?: string | null
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_level: 'bronze' | 'silver' | 'gold' | 'diamond'
      order_status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled'
      payment_status: 'pending' | 'processing' | 'paid' | 'failed' | 'refunded'
      delivery_type: 'delivery' | 'pickup'
      customization_type: 'single' | 'multiple'
      achievement_type: 'first_order' | 'orders_count' | 'total_spent' | 'flavor_explorer' | 'loyal_customer' | 'early_bird' | 'night_owl' | 'weekend_warrior'
      challenge_type: 'weekly' | 'monthly' | 'seasonal' | 'special'
      coupon_type: 'percentage' | 'fixed_amount' | 'free_delivery' | 'buy_x_get_y'
      notification_type: 'order_update' | 'promotion' | 'achievement' | 'challenge' | 'system' | 'reminder'
      points_type: 'earned_purchase' | 'earned_achievement' | 'earned_challenge' | 'earned_referral' | 'spent_reward' | 'expired'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
