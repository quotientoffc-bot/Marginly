"use client";

import { useState } from "react";
import { 
  MessageCircle, Mail, MessageSquare, GitBranch, Layout, Box, 
  Calendar, HardDrive, FileText, Video, BrainCircuit, Users,
  Terminal, Server, FileDigit, Smartphone, X, CheckCircle2, Loader2
} from "lucide-react";
import RadialGlowButton from "@/components/ui/radial-glow-button";
import { motion, AnimatePresence } from "framer-motion";

const INTEGRATIONS = [
  { id: 'custom-ai', icon: BrainCircuit, color: "text-purple-400", name: "Custom AI Model", desc: "OPENAI / ANTHROPIC / LOCAL. Bring your own API key." },
  { id: 'gmail', icon: Mail, color: "text-red-400", name: "Gmail", desc: "Sync emails and automatically parse scope from client threads." },
  { id: 'slack', icon: MessageSquare, color: "text-green-400", name: "Slack", desc: "Receive real-time alerts for scope creep directly in channels." },
  { id: 'zoom', icon: Video, color: "text-blue-500", name: "Zoom", desc: "Auto-record and transcribe client meetings for scope analysis." },
  { id: 'github', icon: GitBranch, color: "text-gray-400", name: "GitHub", desc: "Track developer velocity against approved change orders." },
  { id: 'figma', icon: Layout, color: "text-white", name: "Figma", desc: "Detect design scope changes from new frames and pages." },
  { id: 'monday', icon: null, color: "text-red-500", name: "Monday.com", desc: "Two-way sync tasks, budgets, and change orders with Monday." },
  { id: 'calendar', icon: Calendar, color: "text-blue-400", name: "Google Calendar", desc: "Schedule meetings and sync milestone deadlines." },
  { id: 'drive', icon: HardDrive, color: "text-yellow-400", name: "Google Drive", desc: "Attach files and documentation to change orders." },
  { id: 'docs', icon: FileText, color: "text-blue-300", name: "Google Docs", desc: "Generate and sync change order PDFs." },
];

export default function IntegrationsPage() {
  const [selected, setSelected] = useState<any>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      if (selected) {
        setConnected(prev => [...prev, selected.id]);
      }
      setTimeout(() => setSelected(null), 1000);
    }, 1500);
  };

  const getStatus = (id: string) => connected.includes(id) ? "Connected" : "Connect";

  const renderTile = (integration: any, className: string, customContent?: React.ReactNode) => {
    const isConnected = connected.includes(integration.id);
    const Icon = integration.icon;

    return (
      <div 
        key={integration.id + Math.random()} 
        onClick={() => setSelected(integration)}
        className={`relative ${className} bg-white/5 rounded-2xl border ${isConnected ? 'border-green-500/50 bg-green-500/5' : 'border-white/5 hover:bg-white/10'} transition-all cursor-pointer overflow-hidden group`}
      >
        {isConnected && (
          <div className="absolute top-2 right-2">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
          </div>
        )}
        {customContent ? customContent : (
          Icon && <Icon className={`w-6 h-6 ${integration.color} ${isConnected ? 'opacity-50' : 'group-hover:scale-110 transition-transform'}`} />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-start mb-16 px-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Integrations</h1>
          <p className="text-white/50">Connect Marginly to your favorite tools.</p>
        </div>
        <RadialGlowButton>Request App</RadialGlowButton>
      </div>

      <div className="flex-1 relative pb-32 flex flex-col items-center px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

        <h2 className="text-[100px] lg:text-[120px] font-medium tracking-tight text-white mb-12 leading-none relative z-10 text-center">
          CONNECT
        </h2>

        {/* Integration Grid matching screenshot layout */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2 md:gap-4 relative z-10 w-full max-w-4xl mx-auto">
          {/* Row 1 */}
          {renderTile(INTEGRATIONS[0], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[1], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[2], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[3], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[4], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[5], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[6], "aspect-[1/1.5] row-span-2 flex flex-col items-center justify-center", (
            <>
              <div className="flex gap-1 mb-4 group-hover:scale-110 transition-transform">
                <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
                <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
              </div>
              <p className="text-[9px] font-bold text-white uppercase tracking-wider text-center">Connect<br/>Monday.com</p>
            </>
          ))}

          {/* Row 2 */}
          {renderTile(INTEGRATIONS[7], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[8], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[9], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[3], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[0], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[1], "aspect-square flex items-center justify-center")}

          {/* Row 3 */}
          {renderTile(INTEGRATIONS[3], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[4], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[0], "col-span-2 aspect-[2/1] p-4 flex flex-col justify-center", (
            <>
              <BrainCircuit className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Custom AI Model</p>
              <p className="text-[9px] text-white/50">OPENAI / ANTHROPIC / LOCAL</p>
              <p className="text-[9px] text-white/40 mt-1 truncate">Bring your own API key to power the Marginly...</p>
            </>
          ))}
          {renderTile(INTEGRATIONS[1], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[2], "aspect-square flex items-center justify-center")}
          {renderTile(INTEGRATIONS[8], "aspect-square flex items-center justify-center")}
        </div>
      </div>

      {/* Connection Modal Overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8 pb-0 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {selected.icon ? (
                    <selected.icon className={`w-10 h-10 ${selected.color}`} />
                  ) : (
                    <div className="flex gap-1.5">
                      <div className="w-2 h-8 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-5 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-8 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-medium text-white mb-2">Connect {selected.name}</h3>
                <p className="text-white/50 text-sm mb-8">{selected.desc}</p>
              </div>

              <div className="bg-black/20 p-6 border-t border-white/5">
                {connected.includes(selected.id) ? (
                  <div className="w-full py-3.5 bg-green-500/10 text-green-400 font-medium rounded-xl flex items-center justify-center gap-2 border border-green-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                    Integration Active
                  </div>
                ) : (
                  <button 
                    onClick={handleConnect}
                    disabled={connecting}
                    className="w-full py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {connecting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      `Connect to ${selected.name}`
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
