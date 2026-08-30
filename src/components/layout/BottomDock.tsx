"use client";

import { usePathname, useRouter } from "next/navigation";
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
  PlaySquare,
  Terminal,
  MessageSquare
} from "lucide-react";
import GlassDock from "@/components/ui/glass-dock";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clientNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Team Feed", href: "/dashboard/feed", icon: MessageSquare },
  { name: "Requests", href: "/dashboard/requests", icon: Inbox },
  { name: "Quotes", href: "/dashboard/quotes", icon: FileText },
  { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { name: "Scope Monitor", href: "/dashboard/scope-monitor", icon: ShieldAlert },
  { name: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
  { name: "Integrations", href: "/dashboard/integrations", icon: Blocks },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const managerNavigation = [
  { name: "Admin Console", href: "/dashboard", icon: ShieldAlert },
  { name: "Client Database", href: "/dashboard/clients", icon: Users },
  { name: "Security Logs", href: "/dashboard/logs", icon: Terminal },
  { name: "System Config", href: "/dashboard/settings", icon: Settings },
];

export default function BottomDock() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState("client");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleRoleCheck = async () => {
      let savedRole = localStorage.getItem("user_role");
      if (typeof window !== 'undefined' && window.location.search.includes('force_role=manager')) {
        savedRole = 'manager';
      } else if (typeof window !== 'undefined' && window.location.search.includes('force_role=client')) {
        savedRole = 'client';
      }
      
      if (savedRole === 'manager') {
        const { createClient } = await import("@/lib/supabase-client");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        const isFounder = user?.email === 'niravphil@gmail.com' || user?.email?.includes('mohammed');
        if (!isFounder) {
          savedRole = 'client';
        }
      }
      
      if (savedRole) setRole(savedRole);
    };
    
    handleRoleCheck();
    setMounted(true);
    
    // Listen for custom event in case page changes it
    window.addEventListener('role_updated', handleRoleCheck);
    return () => window.removeEventListener('role_updated', handleRoleCheck);
  }, [pathname]);

  // Show nothing until mounted to prevent hydration errors
  if (!mounted) return null;

  const currentNav = role === "client" ? clientNavigation : managerNavigation;

  const dockItems = currentNav.map(item => ({
    title: item.name,
    icon: item.icon,
    onClick: () => router.push(item.href)
  }));

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <GlassDock items={dockItems} />
    </div>
  );
}
