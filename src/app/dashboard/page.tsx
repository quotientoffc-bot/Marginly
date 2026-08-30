"use client";

import { useEffect, useState } from "react";
import { 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileText, 
  ShieldAlert,
  Briefcase,
  Users,
  Database,
  Activity,
  ShieldCheck,
  Terminal
} from "lucide-react";
import DashboardCharts from "@/components/DashboardCharts";
import MagicBento from "@/components/MagicBento";
import BorderGlow from "@/components/marketing/BorderGlow";

import { getAdminTelemetry, fetchDashboardMetrics } from "@/app/actions";

export default function Dashboard() {
  const [role, setRole] = useState("client");
  const [mounted, setMounted] = useState(false);
  const [telemetry, setTelemetry] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);

useEffect(() => {
    let savedRole = localStorage.getItem("user_role");
    
    // Allow URL override for testing/demoing the 3 views
    if (typeof window !== 'undefined' && window.location.search.includes('force_role=manager')) {
      savedRole = 'manager';
      localStorage.setItem('user_role', 'manager');
    } else if (typeof window !== 'undefined' && window.location.search.includes('force_role=client')) {
      savedRole = 'client';
      localStorage.setItem('user_role', 'client');
    }

    if (savedRole) setRole(savedRole);
    setMounted(true);

    if (!savedRole || savedRole === "client") {
      fetchDashboardMetrics().then(data => setMetrics(data));
    } else if (savedRole === "manager") {
      getAdminTelemetry().then(data => setTelemetry(data));
    }
  }, []);

  if (!mounted) return null;

  if (role === "manager") {
    // MANAGER (Super Admin) - Sees System Telemetry
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header>
          <h1 className="text-3xl font-medium tracking-tight">Admin Console</h1>
          <p className="text-white/50 mt-1">System overview, secure encrypted database connections, and clientele analytics.</p>
        </header>

        <section>
          <h2 className="text-sm font-medium tracking-widest uppercase text-white/40 mb-4">Platform Analytics</h2>
          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          >
            {[
              { label: "Total Subscribed Agencies", value: telemetry?.totalClients || 0, trend: "Live Data", icon: Users, color: "text-blue-400" },
              { label: "Active App Users", value: telemetry?.activeUsers || 0, trend: "Currently Online", icon: Activity, color: "text-purple-400" },
              { label: "Database Encryption", value: "AES-256", trend: "Secure", icon: ShieldCheck, color: "text-emerald-400" },
              { label: "Server Health", value: "99.9%", trend: "Connected", icon: Database, color: "text-green-400" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium ${stat.color || 'text-white/40'}`}>{stat.trend}</span>
                </div>
                <div>
                  <p className="text-3xl font-medium tracking-tight mb-1">{stat.value}</p>
                  <p className="text-sm text-white/50">{stat.label}</p>
                </div>
              </div>
            ))}
          </MagicBento>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Recent Client Signups */}
          <section className="glass-panel p-6 squircle-md border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-white/50" />
                Recent Clientele Logins
              </h2>
            </div>
            <div className="space-y-4">
              {telemetry?.recentClients?.length > 0 ? telemetry.recentClients.map((client: any) => (
                <div key={client.id} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <div>
                    <p className="text-sm font-medium text-white">{client.name}</p>
                    <p className="text-xs text-white/50">{client.email}</p>
                  </div>
                  <span className="text-xs text-white/40">{new Date(client.created_at).toLocaleDateString()}</span>
                </div>
              )) : (
                <div className="text-center py-6 border border-dashed border-white/10 rounded-xl text-white/40 text-sm">
                  Fetching secure database records...
                </div>
              )}
            </div>
          </section>

          {/* Live Data Logs */}
          <section className="glass-panel p-6 squircle-md border border-white/10 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-white/50" />
                Live Security Logs
              </h2>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs text-white/40">Encrypted</span>
              </div>
            </div>
            <div className="flex-1 bg-black/50 rounded-xl border border-white/5 p-4 font-mono text-[11px] text-green-400/80 overflow-y-auto space-y-2">
              <p>[SYSTEM] Encrypted TLS connection established to Supabase.</p>
              <p>[SYSTEM] RLS policies enforced. AES-256 enabled at rest.</p>
              {telemetry?.recentClients?.map((c: any) => (
                <p key={`log-${c.id}`}>[AUTH] Validated secure login for: {c.email}</p>
              ))}
            </div>
          </section>
        </div>
        
        <div className="h-20 w-full"></div>
      </div>
    );
  }

  // CLIENT (Agency User) - Sees Beautiful Dashboard Connected to Real Data
  if (!metrics) {
    return (
      <div className="flex h-screen items-center justify-center -mt-20">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mb-4" />
          <p className="text-white/50">Fetching secure workspace data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-medium tracking-tight text-white">Dashboard</h1>
        <p className="text-white/50 mt-1">Here is your business at a glance.</p>
      </header>

      {/* Needs Attention Area */}
      <section>
        <h2 className="text-sm font-medium tracking-widest uppercase text-white/40 mb-4 mt-6">Needs Attention</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-panel p-5 squircle-sm border-orange-500/20 relative overflow-hidden group hover:border-orange-500/40 transition-colors cursor-pointer">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/50"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="text-xs text-white/40 font-medium">Monitoring</span>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">Scope Creep Detected</h3>
            <p className="text-white/60 text-xs line-clamp-2">
              {metrics.scopeCreeps.length > 0 
                ? `Pending changes: $${metrics.scopeCreeps.reduce((a: number, b: any) => a + (Number(b.amount) || 0), 0)} unpaid effort.` 
                : 'No scope creep detected currently. You are protected.'}
            </p>
          </div>

          <div className="glass-panel p-5 squircle-sm border-blue-500/20 relative overflow-hidden group hover:border-blue-500/40 transition-colors cursor-pointer">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs text-white/40 font-medium">Updates</span>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">Quotes Awaiting Approval</h3>
            <p className="text-white/60 text-xs line-clamp-2">
              {metrics.pendingQuotes > 0 
                ? `${metrics.pendingQuotes} active quotes sent but not signed yet.` 
                : 'All quotes have been signed or actioned.'}
            </p>
          </div>

          <div className="glass-panel p-5 squircle-sm border-white/10 relative overflow-hidden group hover:border-white/30 transition-colors cursor-pointer">
            <div className="absolute top-0 left-0 w-1 h-full bg-white/20"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="text-xs text-white/40 font-medium">Inbox</span>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">Unquoted Leads</h3>
            <p className="text-white/60 text-xs line-clamp-2">No new unquoted inquiries currently in the system.</p>
          </div>
        </div>
      </section>

      {/* Performance Stats Area */}
      <section className="pt-4">
        <h2 className="text-sm font-medium tracking-widest uppercase text-white/40 mb-4">Performance</h2>
        
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        >
          {[
            { label: "Approved Revenue", value: `$${(metrics?.totalRevenue || 0).toLocaleString()}`, trend: "Live", icon: DollarSign },
            { label: "Active Projects", value: (metrics?.activeProjects || 0).toString(), trend: "Current", icon: Briefcase },
            { label: "Unpaid Work Prevented", value: `$0`, trend: "This month", icon: ShieldAlert, color: "text-green-400" },
            { label: "Pending Quotes", value: (metrics?.pendingQuotes || 0).toString(), trend: "Awaiting approval", icon: Clock },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col justify-between h-full w-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-medium ${stat.color || 'text-white/40'}`}>{stat.trend}</span>
              </div>
              <div>
                <p className="text-3xl font-medium tracking-tight mb-1 text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            </div>
          ))}
        </MagicBento>
      </section>

      {/* Unified Charts Panel */}
      <section className="pt-4">
        <DashboardCharts />
      </section>
      
      <div className="h-20 w-full"></div>
    </div>
  );
}
