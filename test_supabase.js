require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSupabase() {
  console.log("Testing Supabase connection...");
  
  // 1. Check Teams Table
  const { data: teamsData, error: teamsError } = await supabase.from('teams').select('id').limit(1);
  if (teamsError) {
    console.error("❌ ERROR: 'teams' table check failed:", teamsError.message);
  } else {
    console.log("✅ 'teams' table exists and is accessible.");
  }

  // 2. Check Team Members Table
  const { data: membersData, error: membersError } = await supabase.from('team_members').select('id').limit(1);
  if (membersError) {
    console.error("❌ ERROR: 'team_members' table check failed:", membersError.message);
  } else {
    console.log("✅ 'team_members' table exists and is accessible.");
  }
  
  // 3. Check Tasks Table
  const { data: tasksData, error: tasksError } = await supabase.from('tasks').select('id').limit(1);
  if (tasksError) {
    console.error("❌ ERROR: 'tasks' table check failed:", tasksError.message);
  } else {
    console.log("✅ 'tasks' table exists and is accessible.");
  }

  // 4. Check RPC Function
  const { data: rpcData, error: rpcError } = await supabase.rpc('join_team', { p_team_password: 'fake' });
  if (rpcError && !rpcError.message.includes('You must be logged in')) {
     // If the function doesn't exist, it usually says "Could not find the function..."
     console.error("❌ ERROR: 'join_team' RPC check failed:", rpcError.message);
  } else {
     console.log("✅ 'join_team' RPC function exists and is responsive.");
  }
}

checkSupabase();
