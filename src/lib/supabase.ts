import { createClient } from "@supabase/supabase-js"

// Use defaults to avoid build errors when env vars are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder"

// Only create client if URL is valid
export const supabase = 
  process.env.NEXT_PUBLIC_SUPABASE_URL 
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    : { 
        auth: { 
          getSession: () => Promise.resolve({ data: { session: null }, error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Set up Supabase first") }),
          signUp: () => Promise.resolve({ data: null, error: new Error("Set up Supabase first") }),
          signOut: () => Promise.resolve({ error: null }),
        } 
      }

export type Generation = {
  id: string
  generation_id: string
  name: string
  business_type: string
  custom_business_type?: string
  location: string
  requested_lead_count: number
  generated_lead_count: number
  objectives: string[]
  custom_objective?: string
  status: "generating" | "completed" | "failed" | "partial"
  created_at: string
  updated_at: string
  user_id: string
}

export type Lead = {
  id: string
  generation_id: string
  business_name: string
  category: string
  address: string
  city: string
  state: string
  country: string
  postal_code: string
  phone?: string
  website?: string
  business_email?: string
  google_maps_url?: string
  google_place_id?: string
  rating?: number
  review_count?: number
  opening_hours?: string
  business_status?: string
  crm_status: "New" | "Contacted" | "Follow Up" | "Interested" | "Meeting" | "Proposal" | "Won" | "Lost"
  notes?: string
  created_at: string
  updated_at: string
  user_id: string
}

export type LeadNote = {
  id: string
  lead_id: string
  content: string
  created_at: string
  user_id: string
}

export type LeadTask = {
  id: string
  lead_id: string
  title: string
  description?: string
  due_date?: string
  priority: "low" | "medium" | "high"
  completed: boolean
  created_at: string
  updated_at: string
  user_id: string
}

export type GenerationExport = {
  id: string
  generation_id: string
  file_name: string
  file_type: "csv" | "google_sheets"
  destination?: string
  rows_exported: number
  status: "pending" | "completed" | "failed"
  error_message?: string
  created_at: string
  user_id: string
}