import BottomDock from "@/components/layout/BottomDock";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Multiplayer Check: Ensure the user belongs to a team workspace
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Check if they are in a team
  const { data: teamMember } = await supabase
    .from('team_members')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!teamMember) {
    redirect('/onboarding');
  }
  return (
    <div className="flex h-screen w-full relative">
      <div className="bg-glow top-0 left-[20%] opacity-50"></div>
      <div className="bg-glow bottom-0 right-[10%] opacity-30"></div>
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto z-10 relative">
        <div className="p-8 pb-72 w-full max-w-7xl mx-auto min-h-full relative">
          {children}
        </div>
      </main>
      
      <BottomDock />
    </div>
  );
}
