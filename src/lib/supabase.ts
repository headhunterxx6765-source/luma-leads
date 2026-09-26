import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create mock supabase for demo mode (when env vars are not set)
function createDemoSupabase(): SupabaseClient {
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: (_callback: any, handler: any) => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signInWithPassword: (_creds: any) => Promise.resolve({ data: null, error: null }),
      signUp: (_creds: any) => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
    // Add other methods as needed for build compatibility
    from: (_table: string) => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ error: null }),
      update: () => ({ error: null }),
      delete: () => ({ error: null }),
      eq: () => ({ data: [], error: null }),
      single: () => ({ data: null, error: null }),
      maybeSingle: () => ({ data: null, error: null }),
      order: () => ({ data: [], error: null }),
      limit: () => ({ data: [], error: null }),
    }),
  } as unknown as SupabaseClient
}

export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createDemoSupabase()

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