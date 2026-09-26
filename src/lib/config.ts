// Demo mode credentials - replace with real Supabase credentials in production
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJleHAiOjE5OTk5OTk5OTl9.CXx0Z1ZaUHpYX2Q0R1Y3NkF5a1F5cVVmWjJnY0R6Y2VfXzBfLQ"

// Check if we're in "demo mode" (no real credentials)
export const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"