#!/usr/bin/env node

/**
 * Type generation script for JC Pastelaria Gourmet
 * This script generates TypeScript types from Supabase schema
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '../.env.local')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    const lines = envContent.split('\n')
    
    lines.forEach(line => {
      const trimmedLine = line.trim()
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=')
          process.env[key] = value
        }
      }
    })
  }
}

// Load environment variables
loadEnvFile()

// Configuration
const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const TYPES_OUTPUT_PATH = path.join(__dirname, '../src/types/supabase.ts')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logError(message) {
  log(`❌ ${message}`, 'red')
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green')
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue')
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow')
}

async function generateSupabaseTypes() {
  try {
    logInfo('Starting Supabase type generation...')

    // Check if project ID is configured
    if (!SUPABASE_PROJECT_ID) {
      logError('SUPABASE_PROJECT_ID environment variable is not set')
      logInfo('Please set it in your .env.local file or run:')
      log('export SUPABASE_PROJECT_ID=your-project-id', 'cyan')
      process.exit(1)
    }

    // Try to use Supabase CLI if available
    try {
      execSync('supabase --version', { stdio: 'pipe' })
      
      // Generate types using Supabase CLI
      logInfo('Generating types from Supabase schema using CLI...')
      const command = `supabase gen types typescript --project-id ${SUPABASE_PROJECT_ID}`
      
      const output = execSync(command, { encoding: 'utf8' })
      
      // Add header comment to generated types
      const header = `// Auto-generated types from Supabase schema
// This file should be regenerated when schema changes using: npm run db:generate
// Generated on: ${new Date().toISOString()}

`
      
      const finalOutput = header + output
      
      // Write to file
      fs.writeFileSync(TYPES_OUTPUT_PATH, finalOutput)
      
      logSuccess(`Types generated successfully at ${TYPES_OUTPUT_PATH}`)
      
    } catch (cliError) {
      logWarning('Supabase CLI not available, generating types from schema files...')
      await generateTypesFromSchema()
    }

  } catch (error) {
    logError('Type generation failed:')
    log(error.message, 'red')
    process.exit(1)
  }
}

async function generateTypesFromSchema() {
  logInfo('Generating types from existing schema files...')
  
  const schemaPath = path.join(__dirname, '../supabase')
  const migrationFiles = [
    '001_create_enums.sql',
    '002_create_main_tables.sql', 
    '003_create_gamification_tables.sql',
    '004_create_support_tables.sql'
  ]
  
  // Read schema summary for reference
  const schemaSummaryPath = path.join(schemaPath, 'SCHEMA_SUMMARY.md')
  let schemaInfo = ''
  
  if (fs.existsSync(schemaSummaryPath)) {
    schemaInfo = fs.readFileSync(schemaSummaryPath, 'utf8')
    logInfo('Using schema summary for type generation')
  }
  
  // Generate comprehensive types based on the schema
  const generatedTypes = `// Auto-generated types from Supabase schema
// This file should be regenerated when schema changes using: npm run db:generate
// Generated on: ${new Date().toISOString()}
// Project ID: ${SUPABASE_PROJECT_ID}

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
`

  fs.writeFileSync(TYPES_OUTPUT_PATH, generatedTypes)
  logSuccess(`Types generated from schema files at ${TYPES_OUTPUT_PATH}`)
}

async function generateFallbackTypes() {
  const fallbackTypes = `// Fallback types - replace with actual Supabase generated types
// Run 'npm run db:generate' when Supabase is properly configured

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
      // Add your table types here
      [key: string]: {
        Row: Record<string, any>
        Insert: Record<string, any>
        Update: Record<string, any>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
`

  fs.writeFileSync(TYPES_OUTPUT_PATH, fallbackTypes)
  logWarning('Fallback types written. Please configure Supabase and regenerate.')
}

async function validateTypes() {
  try {
    logInfo('Validating generated types...')
    
    // Check if TypeScript can compile the types
    execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe' })
    
    logSuccess('Type validation passed')
    
  } catch (error) {
    logWarning('Type validation failed - there might be TypeScript errors')
    log('Run "npm run type-check" for detailed error information', 'cyan')
  }
}

async function updatePackageJson() {
  const packageJsonPath = path.join(__dirname, '../package.json')
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    
    // Ensure the db:generate script exists
    if (!packageJson.scripts['db:generate']) {
      packageJson.scripts['db:generate'] = 'node scripts/generate-types.js'
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
      logInfo('Added db:generate script to package.json')
    }
    
  } catch (error) {
    logWarning('Could not update package.json')
  }
}

// Main execution
async function main() {
  log('🚀 JC Pastelaria Gourmet - Type Generation', 'bright')
  log('==========================================', 'bright')
  
  await updatePackageJson()
  await generateSupabaseTypes()
  await validateTypes()
  
  log('==========================================', 'bright')
  logSuccess('Type generation completed!')
  
  logInfo('Next steps:')
  log('1. Review the generated types in src/types/supabase.ts', 'cyan')
  log('2. Run "npm run type-check" to validate all types', 'cyan')
  log('3. Update your components to use the new types', 'cyan')
}

// Handle CLI arguments
const args = process.argv.slice(2)

if (args.includes('--help') || args.includes('-h')) {
  log('JC Pastelaria Gourmet - Type Generation Script', 'bright')
  log('')
  log('Usage: node scripts/generate-types.js [options]', 'cyan')
  log('')
  log('Options:')
  log('  --help, -h     Show this help message')
  log('  --validate     Only validate existing types')
  log('  --fallback     Generate fallback types only')
  log('')
  log('Environment variables:')
  log('  SUPABASE_PROJECT_ID    Your Supabase project ID')
  log('  SUPABASE_ANON_KEY      Your Supabase anonymous key')
  process.exit(0)
}

if (args.includes('--validate')) {
  validateTypes().then(() => process.exit(0))
} else if (args.includes('--fallback')) {
  generateFallbackTypes().then(() => process.exit(0))
} else {
  main().catch((error) => {
    logError('Script failed:')
    log(error.message, 'red')
    process.exit(1)
  })
}