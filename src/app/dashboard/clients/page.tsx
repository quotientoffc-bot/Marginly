"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Activity, Users, Plus } from "lucide-react";
import { getAdminTelemetry } from "@/app/actions";
import GenerateButton from "@/components/ui/generate-button";

export default function ClientsPage() {
  const [role, setRole] = useState<string>("client");
  const [adminClients, setAdminClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem("user_role") || "client";
    setRole(savedRole);

    async function loadData() {
      if (savedRole === "manager") {
        const telemetry = await getAdminTelemetry();
        setAdminClients(telemetry.recentClients || []);
      }
      setLoading(false);
    }
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center -mt-20">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
      </div>
    );
  }

  // CLIENT VIEW (The Agency User viewing their own clients)
  if (role === "client") {
    return (
      <div className="max-w-6xl mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-white mb-2">My Clients</h1>
            <p className="text-white/50">Manage the clients your agency is working with.</p>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/90 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search your clients..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <button className="bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="glass-panel squircle-lg p-12 border border-dashed border-white/10 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-medium text-white mb-2">No Clients Yet</h2>
          <p className="text-white/40 max-w-sm mb-6">You haven't added any clients to your agency workspace yet. Add your first client to start creating projects and quotes.</p>
          <button className="bg-white/10 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-white/20 transition-all border border-white/10">
            Create First Client
          </button>
        </div>
      </div>
    );
  }

  // MANAGER VIEW (Mohammed Sir viewing the platform telemetry)
  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Clientele Analytics</h1>
        <p className="text-white/50">Track how your customers are utilizing the Marginly platform.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 pb-10">
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="glass-panel squircle-md p-6 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity className="w-48 h-48 text-purple-500" />
            </div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Activity className="w-4 h-4 text-purple-500" />
              </div>
              <h2 className="font-medium text-white">AI Upscale Engine</h2>
            </div>
            
            <p className="text-sm text-white/60 leading-relaxed mb-6 relative z-10">
              <strong className="text-white">{adminClients[0]?.name || 'System'}</strong> has high AI parsing utilization. Ready for automated upsell sequence.
            </p>

            <GenerateButton 
              defaultText="Trigger AI Upsell" 
              generatingText="Triggering..." 
              className="w-full relative z-10"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="space-y-4">
            {adminClients.length > 0 ? adminClients.map((client: any) => {
              const health = client.status === 'Active' ? 'Healthy' : 'Pending';
              
              return (
                <div key={client.id} className="glass-panel squircle-md p-6 border border-white/5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">{client.name}</h3>
                      <p className="text-sm text-white/50">{client.email} • Signed up {new Date(client.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      health === 'Pending' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                      'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                      {health}
                    </span>
                  </div>
                </div>
              );
            }) : (
              <div className="py-12 text-center text-white/50 border border-dashed border-white/10 rounded-2xl">
                No active clientele found in Supabase database.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
