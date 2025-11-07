import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  is_premium: boolean
  premium_expires_at: string | null
  subscription_id: string | null
  created_at: string
  updated_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  lesson_id: string
  completed: boolean
  completed_at: string | null
  progress_percentage: number
  created_at: string
  updated_at: string
}