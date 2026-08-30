import { Search, Inbox, Filter } from "lucide-react";

export default function RequestsPage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Requests Inbox</h1>
          <p className="text-white/50">Manage incoming client requests and turn them into actionable tasks.</p>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search requests..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <button className="bg-white/5 border border-white/10 text-white/70 px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          All Sources
        </button>
        <button className="bg-white/5 border border-white/10 text-white/70 px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
          Unread
        </button>
      </div>

      <div className="glass-panel border border-white/10 rounded-xl overflow-hidden min-h-[400px] flex flex-col">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 text-[10px] font-bold text-white/30 uppercase tracking-widest">
          <div>CLIENT</div>
          <div>SUBJECT</div>
          <div>SOURCE</div>
          <div>DATE</div>
          <div>STATUS</div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 mb-4 relative z-10">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1 relative z-10">Inbox zero!</h3>
          <p className="text-sm text-white/40 relative z-10">You're all caught up. There are no new client requests at this time.</p>
        </div>
      </div>
    </div>
  );
}
