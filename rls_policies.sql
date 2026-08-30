-- Row Level Security (RLS) Setup Script
-- Please run this directly in your Supabase SQL Editor.

-- 1. Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE scope_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- 2. Create Policies for profiles (users can only read/update their own profile)
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING ( auth.uid() = id );

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING ( auth.uid() = id );

-- 3. Create generic policies for other tables assuming they have a 'user_id' column
CREATE POLICY "Users can access own support messages" 
ON support_messages FOR ALL 
USING ( auth.uid() = user_id );

CREATE POLICY "Users can access own clients" 
ON clients FOR ALL 
USING ( auth.uid() = user_id );

CREATE POLICY "Users can access own projects" 
ON projects FOR ALL 
USING ( auth.uid() = user_id );

CREATE POLICY "Users can access own scope changes" 
ON scope_changes FOR ALL 
USING ( auth.uid() = user_id );

CREATE POLICY "Users can access own tasks" 
ON tasks FOR ALL 
USING ( auth.uid() = user_id );

CREATE POLICY "Users can access own organizations" 
ON organizations FOR ALL 
USING ( auth.uid() = user_id ); 
