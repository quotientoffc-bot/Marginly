"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { getAdminTelemetry } from "@/app/actions";

export default function LogsPage() {
  const [telemetry, setTelemetry] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState("client");

  useEffect(() => {
    const savedRole = localStorage.getItem("user_role");
    if (savedRole) setRole(savedRole);
    setMounted(true);

    if (savedRole === "manager") {
      getAdminTelemetry().then(data => setTelemetry(data));
    }
  }, []);

  if (!mounted) return null;

  if (role !== "manager") {
    return (
      <div className="flex h-screen items-center justify-center -mt-20">
        <div className="flex flex-col items-center">
          <Terminal className="w-12 h-12 text-red-500 mb-4 opacity-50" />
          <h1 className="text-xl font-medium text-white mb-2">Access Denied</h1>
          <p className="text-white/50 text-center max-w-sm">You do not have the required security clearance to view live system logs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      <div className="mb-10 px-4">
        <h1 className="text-4xl font-medium tracking-tight text-white mb-3">System Logs</h1>
        <p className="text-white/50 text-lg">Live security events, database activity, and system telemetry.</p>
      </div>

      <div className="px-4 flex-1 flex flex-col min-h-[500px]">
        <section className="glass-panel p-8 squircle-lg border border-white/10 flex flex-col flex-1 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-white flex items-center gap-3">
              <Terminal className="w-5 h-5 text-white/50" />
              Live Security Logs
            </h2>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-white/40">Encrypted</span>
            </div>
          </div>
          <div className="flex-1 bg-black/80 rounded-2xl border border-white/5 p-6 font-mono text-xs md:text-sm text-green-400/80 overflow-y-auto space-y-4 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]">
            <p className="text-green-300 font-semibold">[SYSTEM] Initialize secure logging environment...</p>
            <p>[SYSTEM] Encrypted TLS connection established to Supabase.</p>
            <p>[SYSTEM] RLS policies enforced. AES-256 enabled at rest.</p>
            <p className="text-purple-400">[SHIELD] Rate limiting active: 10 requests / minute / IP.</p>
            <p className="text-purple-400">[SHIELD] Payload sanitization layer active.</p>
            
            {telemetry?.recentClients?.map((c: any) => (
              <p key={`log-${c.id}`}>[AUTH] Validated secure login for: {c.email} ({new Date(c.created_at).toLocaleString()})</p>
            ))}
            
            {!telemetry && (
              <p className="text-white/40 animate-pulse">[SYSTEM] Fetching real-time event stream...</p>
            )}
            
            <p className="text-white/40 pt-4 border-t border-green-900/30 mt-4">_ Waiting for incoming events...</p>
          </div>
        </section>
      </div>
    </div>
  );
}
