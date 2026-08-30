import { CalendarDays, Filter, CalendarPlus } from "lucide-react";
import RadialGlowButton from "@/components/ui/radial-glow-button";

export default function CalendarPage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Calendar</h1>
          <p className="text-white/50">Schedule milestones, client meetings, and deadlines.</p>
        </div>
        <button className="bg-white/5 border border-white/10 text-white/70 px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter Events
        </button>
      </div>

      <div className="glass-panel border border-white/10 rounded-xl overflow-hidden min-h-[500px] flex flex-col">
        {/* Calendar Header (Days) */}
        <div className="grid grid-cols-7 gap-4 p-4 border-b border-white/5 text-[10px] font-bold text-white/30 uppercase tracking-widest text-center">
          <div>SUN</div>
          <div>MON</div>
          <div>TUE</div>
          <div>WED</div>
          <div>THU</div>
          <div>FRI</div>
          <div>SAT</div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 mb-4 relative z-10">
            <CalendarDays className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1 relative z-10">No upcoming events</h3>
          <p className="text-sm text-white/40 mb-8 relative z-10">Your schedule is completely clear for the current timeframe.</p>
          
          <RadialGlowButton className="relative z-10">
            <div className="flex items-center justify-center gap-2 px-2">
              <CalendarPlus className="w-4 h-4" />
              <span>Connect Google Calendar</span>
            </div>
          </RadialGlowButton>
        </div>
      </div>
    </div>
  );
}
