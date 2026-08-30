import { ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase";
import GenerateButton from "@/components/ui/generate-button";

export default async function ScopeMonitorPage() {
  const { data: creeps } = await supabaseAdmin
    .from('scope_changes')
    .select('*')
    .eq('status', 'Pending Client Approval');

  const activeCreep = creeps && creeps.length > 0 ? creeps[0] : null;

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Scope Monitor</h1>
        <p className="text-white/50">AI-powered detection of unpaid work and out-of-bounds requests.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Active Alert Panel */}
        <div className="flex-1">
          {activeCreep ? (
            <div className="glass-panel squircle-lg p-6 border border-orange-500/20 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500/5">
                <ShieldAlert className="w-64 h-64" />
              </div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-white">Critical Scope Creep</h2>
                  <p className="text-white/50 text-sm">Project: {activeCreep.project_id || 'Unknown Project'}</p>
                </div>
              </div>

              <div className="bg-black/40 rounded-xl p-5 mb-6 border border-white/5 relative z-10">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Client Request (Parsed from Email):</p>
                <p className="text-white/90 italic font-serif text-lg leading-relaxed">
                  "{activeCreep.title}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Estimated Extra Effort</p>
                  <p className="text-lg font-medium text-white">Pending Review</p>
                </div>
                <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                  <p className="text-[10px] font-bold text-orange-400/60 uppercase tracking-widest mb-1">Recommended Quote</p>
                  <p className="text-lg font-medium text-orange-400">${activeCreep.amount}</p>
                </div>
              </div>

              <div className="flex gap-4 relative z-10 items-center">
                <div className="flex-1">
                  <GenerateButton 
                    defaultText="Draft Change Order" 
                    generatingText="Drafting..." 
                    className="w-full h-12 rounded-xl"
                  />
                </div>
                <button className="flex-1 bg-black text-white/70 font-medium py-3 rounded-xl border border-white/10 hover:text-white transition-colors h-12">
                  Dismiss Warning
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel squircle-lg p-12 border border-white/10 text-center flex flex-col items-center justify-center h-[400px]">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-medium text-white mb-2">System Secure</h2>
              <p className="text-white/40 max-w-sm mb-8">No active scope creep detected. Your AI monitor is constantly analyzing incoming requests.</p>
              
              <div className="w-64">
                <GenerateButton 
                  defaultText="Draft Manual Change Order" 
                  generatingText="Drafting..." 
                  className="w-full h-12 rounded-xl"
                />
              </div>
            </div>
          )}
        </div>

        {/* History Panel */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <h3 className="text-sm font-bold text-white/80 mb-4">Recent Analyses</h3>
          <div className="space-y-4">
            <div className="glass-panel rounded-xl p-4 border border-green-500/20 bg-green-500/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white text-sm">System Init - AI Online</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">SECURE</span>
              </div>
              <p className="text-xs text-white/60 mb-3 italic">
                "Ready to scan incoming communications for out-of-scope work."
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-green-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>Monitoring active channels.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
