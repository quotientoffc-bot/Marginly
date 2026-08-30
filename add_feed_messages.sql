CREATE TABLE IF NOT EXISTS public.feed_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    sender_name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'user' CHECK (type IN ('user', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.feed_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view team messages" 
ON public.feed_messages FOR SELECT 
USING (
    team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert team messages" 
ON public.feed_messages FOR INSERT 
WITH CHECK (
    team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    )
);
