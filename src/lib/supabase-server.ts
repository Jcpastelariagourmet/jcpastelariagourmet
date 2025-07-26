// Supabase server client configuration
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'

// Server component client (for use in server components)
export const createSupabaseServerClient = () => createServerComponentClient<Database>({ cookies })

export default createSupabaseServerClient;