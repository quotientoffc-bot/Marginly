import { Search, Briefcase, Plus } from "lucide-react";
import CreateForm from "@/components/ui/CreateForm";
import { createProject } from "@/app/dashboard/actions";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function ProjectsPage() {
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
  
  
  let clients: any[] = [];
  if (user) {
    const { data } = await supabase
      .from('clients')
      .select('id, name')
      .eq('user_id', user.id);
    if (data) clients = data;
  }

  let projects: any[] = [];
  if (user) {
    const { data } = await supabase
      .from('projects')
      .select('*, clients(name)')
      .order('created_at', { ascending: false });
    if (data) projects = data;
  }

  
  const projectFields = [
    { name: 'name', label: 'Project Name', type: 'text' },
    { 
      name: 'client_id', 
      label: 'Client', 
      type: 'select', 
      options: clients.map(c => ({ label: c.name, value: c.id }))
    },
    { name: 'budget', label: 'Budget ($)', type: 'number' }
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Projects</h1>
          <p className="text-white/50">Manage active engagements and monitor progress.</p>
        </div>
        <CreateForm title="New Project" buttonLabel="New Project" action={createProject} fields={projectFields} />
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <button className="bg-white/5 border border-white/10 text-white/70 px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
          All Clients
        </button>
        <button className="bg-white/5 border border-white/10 text-white/70 px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
          Active Only
        </button>
      </div>

      <div className="glass-panel border border-white/10 rounded-xl overflow-hidden min-h-[400px] flex flex-col">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 text-[10px] font-bold text-white/30 uppercase tracking-widest">
          <div>PROJECT NAME</div>
          <div>CLIENT</div>
          <div>BUDGET</div>
          <div>TIMELINE</div>
          <div>STATUS</div>
        </div>
        
        {projects.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 mb-4 relative z-10">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1 relative z-10">No projects found</h3>
            <p className="text-sm text-white/40 relative z-10">You don't have any active projects linked to this workspace yet.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {projects.map((project) => (
              <div key={project.id} className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors cursor-pointer">
                <div className="font-medium text-white">{project.name || 'Unnamed Project'}</div>
                <div className="text-white/60">{project.clients?.name || 'Unknown Client'}</div>
                <div className="text-white/80">${project.budget?.toLocaleString() || '0'}</div>
                <div className="text-white/50 text-sm">
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30 bg-blue-500/10 text-blue-400">
                    {project.status || 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
