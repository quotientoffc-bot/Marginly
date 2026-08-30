"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Inbox, 
  Briefcase, 
  FileText, 
  Users, 
  Settings,
  ShieldAlert,
  CalendarDays,
  Blocks,
  PlaySquare
} from "lucide-react";
import clsx from "clsx";

import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Requests", href: "/dashboard/requests", icon: Inbox },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Quotes", href: "/dashboard/quotes", icon: FileText },
  { name: "User Analytics", href: "/dashboard/projects", icon: Briefcase },
  { name: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
  { name: "Integrations", href: "/dashboard/integrations", icon: Blocks },
  { name: "Support", href: "/dashboard/support", icon: PlaySquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  // MOCK AUTH: In a real app, this comes from Supabase auth session (e.g., user.role === 'admin')
  const isManager = true; 

  const visibleNavigation = navigation.filter(item => {
    // Only allow managers to see the internal Clients CRM
    if (item.name === "Clients" && !isManager) return false;
    return true;
  });

  return (
    <div className="w-64 h-screen flex-shrink-0 border-r border-white/5 bg-black/20 backdrop-blur-3xl flex flex-col pt-8 pb-4 px-4 sticky top-0">
      <div className="flex items-center px-2 mb-10">
        <img src="/logo.jpg" alt="Marginly" className="w-8 h-8 rounded-xl object-cover mr-3 border border-white/20" />
        <span className="text-xl font-medium tracking-wide text-white">Marginly</span>
      </div>

      <nav className="flex-1 space-y-2">
        {visibleNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
                isActive 
                  ? "bg-white/10 text-white shadow-sm border border-white/5" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-white/50 group-hover:text-white/80")} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/5">
        <Link
          href="/settings"
          className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 group"
        >
          <Settings className="w-5 h-5 text-white/50 group-hover:text-white/80" />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        <div className="mt-4 px-3 flex items-center space-x-3 bg-white/5 p-2 rounded-xl border border-white/5">
          <img src="/logo.jpg" alt="Marginly" className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-white/20" />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-white truncate">Marginly Admin</span>
            <span className="text-[10px] text-white/40 uppercase tracking-wider truncate">System Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
