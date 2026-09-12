import re

with open('src/app/actions.ts', 'r') as f:
    content = f.read()

# Add createClient for service role
import_str = "import { createServerClient } from '@supabase/ssr';"
new_import_str = "import { createServerClient } from '@supabase/ssr';\nimport { createClient } from '@supabase/supabase-js';"

if "import { createClient } from '@supabase/supabase-js';" not in content:
    content = content.replace(import_str, new_import_str)

new_action = """
export async function checkTeamPasswordUnique(password: string) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { data, error } = await supabaseAdmin
      .from('teams')
      .select('id')
      .eq('team_password', password)
      .limit(1);
      
    if (error) throw error;
    
    if (data && data.length > 0) {
      return { unique: false };
    }
    
    return { unique: true };
  } catch (err: any) {
    console.error("Error checking team password:", err);
    return { error: err.message };
  }
}
"""

if "checkTeamPasswordUnique" not in content:
    content += new_action

with open('src/app/actions.ts', 'w') as f:
    f.write(content)
