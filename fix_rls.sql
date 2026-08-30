DROP POLICY IF EXISTS "Users can view their team members" ON public.team_members;

CREATE POLICY "Users can view their own team membership" 
ON public.team_members FOR SELECT 
USING (
    user_id = auth.uid()
);
