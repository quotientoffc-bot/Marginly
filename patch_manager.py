import re

with open('src/app/dashboard/page.tsx', 'r') as f:
    content = f.read()

# Replace useState("manager") with useState("client")
content = content.replace('useState("manager")', 'useState("client")')

# Inject new analytics into Manager view
manager_ui = """
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel squircle p-6 border border-white/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-blue-400">Live Data</span>
          </div>
          <h3 className="text-3xl font-medium text-white tracking-tight mb-1">{telemetry?.totalClients || 0}</h3>
          <p className="text-sm text-white/50">Total Subscribed Agencies</p>
        </div>

        <div className="glass-panel squircle p-6 border border-white/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-purple-400">Currently Online</span>
          </div>
          <h3 className="text-3xl font-medium text-white tracking-tight mb-1">{telemetry?.activeUsers || 0}</h3>
          <p className="text-sm text-white/50">Active App Users</p>
        </div>

        <div className="glass-panel squircle p-6 border border-white/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-green-400">Platform GMV</span>
          </div>
          <h3 className="text-3xl font-medium text-white tracking-tight mb-1">${(telemetry?.totalRevenue || 0).toLocaleString()}</h3>
          <p className="text-sm text-white/50">Total Quotes & Projects</p>
        </div>

        <div className="glass-panel squircle p-6 border border-white/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-orange-400">Scope Creep</span>
          </div>
          <h3 className="text-3xl font-medium text-white tracking-tight mb-1">{telemetry?.totalScopeChanges || 0}</h3>
          <p className="text-sm text-white/50">Flagged Changes</p>
        </div>
      </div>
"""

# Replace the 4-card grid in the manager section
content = re.sub(r'<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">.*?</div>\n      </div>\n\n      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-32">', manager_ui + '\n      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-32">', content, flags=re.DOTALL)

with open('src/app/dashboard/page.tsx', 'w') as f:
    f.write(content)
