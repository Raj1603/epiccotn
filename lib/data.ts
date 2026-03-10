// Re-export types for backward compatibility locally if needed, 
// though files should update to import from @/lib/types
export type { Product, Category, ColorVariant } from "@/lib/types"

// DEPRECATED: Navigation and Notifications are now fetched from Supabase via lib/fetchers.ts
// See supabase_setup_v2.sql to seed the data.

