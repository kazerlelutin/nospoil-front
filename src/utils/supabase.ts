import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:3000'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'local'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    //@ts-ignore
    fetch: (...args) => fetch(...args),
  },
})
