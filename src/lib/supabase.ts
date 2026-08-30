import { createClient } from '@supabase/supabase-js';

// By removing "NEXT_PUBLIC_", these keys are strictly locked to the secure server backend
// and can NEVER be accessed or seen by the users' browsers.
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// We use the Service Role Key to give you (the manager) full admin access,
// while keeping the database completely hidden from the frontend users.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
