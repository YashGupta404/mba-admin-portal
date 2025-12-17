import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  BookOpen,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  Briefcase,
  Calendar,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutGrid, label: "Overview", path: "/dashboard" },
  { icon: BookOpen, label: "Courses Management", path: "/dashboard/courses" },
  { icon: Users, label: "Faculty Management", path: "/dashboard/faculty" },
  { icon: UserPlus, label: "Admissions", path: "/dashboard/admissions" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  { icon: Briefcase, label: "Placements", path: "/dashboard/placements" },
  { icon: Calendar, label: "Student Life", path: "/dashboard/student-life" },
  { icon: Mail, label: "Contact & Enquiry", path: "/dashboard/contact" },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar flex flex-col transition-all duration-300 sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-sidebar-accent flex items-center justify-center flex-shrink-0">
          <div className="flex gap-0.5">
            <div className="w-1 h-2.5 bg-sidebar-foreground rounded-sm"></div>
            <div className="w-1 h-4 bg-primary rounded-sm"></div>
            <div className="w-1 h-3 bg-sidebar-foreground rounded-sm"></div>
          </div>
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h2 className="text-sidebar-foreground font-semibold text-sm">MBA Institute</h2>
            <p className="text-sidebar-muted text-xs">Admin Panel</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary-foreground")} />
              {!collapsed && (
                <span className="text-sm font-medium truncate animate-fade-in">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Real-time sync indicator */}
      <div className={cn(
        "p-4 border-t border-sidebar-border",
        collapsed && "flex justify-center"
      )}>
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent",
          collapsed && "px-2"
        )}>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          {!collapsed && (
            <span className="text-sidebar-foreground text-xs font-medium">Real-time sync active</span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
