import { 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileText, 
  ShieldAlert,
  Briefcase
} from "lucide-react";
import DashboardCharts from "@/components/DashboardCharts";
import MagicBento from "@/components/MagicBento";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-medium tracking-tight">Dashboard</h1>
        <p className="text-white/50 mt-1">Here is your business at a glance.</p>
      </header>

      {/* Needs Attention Area */}
      <section>
        <h2 className="text-sm font-medium tracking-widest uppercase text-white/40 mb-4">Needs Attention</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-panel p-5 squircle-sm border-orange-500/20 relative overflow-hidden group hover:border-orange-500/40 transition-colors cursor-pointer">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/50"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="text-xs text-white/40 font-medium">Just now</span>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">Scope Creep Detected</h3>
            <p className="text-white/60 text-xs line-clamp-2">Client requested "one more revision round" on Project Alpha. Unpaid effort estimated at 4 hrs.</p>
          </div>

          <div className="glass-panel p-5 squircle-sm border-blue-500/20 relative overflow-hidden group hover:border-blue-500/40 transition-colors cursor-pointer">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs text-white/40 font-medium">2 hrs ago</span>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">Quote Awaiting Approval</h3>
            <p className="text-white/60 text-xs line-clamp-2">Web Design project for Acme Corp viewed 3 times but not signed.</p>
          </div>

          <div className="glass-panel p-5 squircle-sm border-white/10 relative overflow-hidden group hover:border-white/30 transition-colors cursor-pointer">
            <div className="absolute top-0 left-0 w-1 h-full bg-white/20"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="text-xs text-white/40 font-medium">Yesterday</span>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">Unquoted Lead</h3>
            <p className="text-white/60 text-xs line-clamp-2">New inquiry from Sarah Jenkins regarding marketing retainers.</p>
          </div>
        </div>
      </section>

      {/* Stats Area */}
      <section>
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
            { label: "Approved Revenue", value: "$45,200", trend: "+12%", icon: DollarSign },
            { label: "Active Projects", value: "14", trend: "Steady", icon: Briefcase },
            { label: "Unpaid Work Prevented", value: "$3,450", trend: "This month", icon: ShieldAlert, color: "text-green-400" },
            { label: "Pending Quotes", value: "6", trend: "$12,000 potential", icon: Clock },
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
        
        <DashboardCharts />
        <div className="h-32 w-full"></div>
      </section>
    </div>
  );
}