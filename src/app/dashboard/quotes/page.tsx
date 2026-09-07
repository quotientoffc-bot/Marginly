import { Search, FileText, Plus } from "lucide-react";
import CreateForm from "@/components/ui/CreateForm";
import { createQuote } from "@/app/dashboard/actions";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function QuotesPage() {
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
  
  
  let projects: any[] = [];
  if (user) {
    const { data } = await supabase
      .from('projects')
      .select('id, name')
      .eq('user_id', user.id);
    if (data) projects = data;
  }

  let quotes: any[] = [];
  if (user) {
    const { data } = await supabase
      .from('quotes')
      .select('*, projects(name, clients(name))')
      .order('created_at', { ascending: false });
    if (data) quotes = data;
  }

  
  const quoteFields = [
    { 
      name: 'project_id', 
      label: 'Project', 
      type: 'select', 
      options: projects.map(p => ({ label: p.name, value: p.id }))
    },
    { name: 'amount', label: 'Amount ($)', type: 'number' },
    { 
      name: 'type', 
      label: 'Quote Type', 
      type: 'select', 
      options: [
        { label: 'Standard Quote', value: 'Standard Quote' },
        { label: 'Change Order', value: 'Change Order' },
        { label: 'Retainer', value: 'Retainer' }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Quotes & Change Orders</h1>
          <p className="text-white/50">Manage proposals and turn extra requests into paid work.</p>
        </div>
        <CreateForm title="New Quote" buttonLabel="New Quote" action={createQuote} fields={quoteFields} />
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search quotes..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <button className="bg-white/5 border border-white/10 text-white/70 px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
          All Types
        </button>
        <button className="bg-white/5 border border-white/10 text-white/70 px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
          All Statuses
        </button>
      </div>

      <div className="glass-panel border border-white/10 rounded-xl overflow-hidden min-h-[400px] flex flex-col">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 text-[10px] font-bold text-white/30 uppercase tracking-widest">
          <div>ID</div>
          <div>PROJECT / CLIENT</div>
          <div>AMOUNT</div>
          <div>TYPE</div>
          <div>STATUS</div>
        </div>
        
        {quotes.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 mb-4 relative z-10">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1 relative z-10">No quotes found</h3>
            <p className="text-sm text-white/40 relative z-10">You haven't generated any quotes or change orders yet.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {quotes.map((quote) => (
              <div key={quote.id} className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors cursor-pointer">
                <div className="font-mono text-white/70 text-sm">{quote.id.substring(0, 8)}</div>
                <div>
                  <div className="text-white text-sm font-medium">{quote.projects?.name || 'Unknown Project'}</div>
                  <div className="text-white/40 text-xs">{quote.projects?.clients?.name || 'Unknown Client'}</div>
                </div>
                <div className="text-white/80">${quote.amount?.toLocaleString() || '0'}</div>
                <div className="text-white/60 text-sm">{quote.type || 'Standard Quote'}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${quote.status === 'Approved' ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-orange-500/30 bg-orange-500/10 text-orange-400'}`}>
                    {quote.status || 'Pending'}
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
