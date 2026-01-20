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
  X,
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
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close mobile sidebar on navigation
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "h-screen bg-sidebar flex flex-col transition-all duration-300 z-50",
          // Desktop styles
          "hidden lg:flex lg:sticky lg:top-0",
          collapsed ? "lg:w-16" : "lg:w-64",
          // Mobile styles - slide in from left
          mobileOpen && "fixed inset-y-0 left-0 flex w-72 lg:hidden"
        )}
      >
        {/* Header */}
        <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
          {/* Logo - Fixed path for production */}
          <img
            src="/mba_logo.png"
            alt="MBA Logo"
            className="h-8 w-8 object-contain flex-shrink-0"
          />

          {/* Brand text */}
          {(!collapsed || mobileOpen) && (
            <div className="animate-fade-in leading-tight flex-1 min-w-0">
              <h2 className="text-sidebar-foreground font-semibold text-sm truncate">
                Institute of Engineering & Management
              </h2>
              <p className="text-sidebar-muted text-xs">Admin Panel</p>
            </div>
          )}

          {/* Close button for mobile */}
          {mobileOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          {/* Collapse toggle - desktop only */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hidden lg:flex ml-auto text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
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
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary-foreground")} />
                {(!collapsed || mobileOpen) && (
                  <span className="text-sm font-medium truncate animate-fade-in">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Real-time sync indicator */}
        <div className={cn(
          "p-4 border-t border-sidebar-border",
          collapsed && !mobileOpen && "flex justify-center"
        )}>
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent",
            collapsed && !mobileOpen && "px-2"
          )}>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            {(!collapsed || mobileOpen) && (
              <span className="text-sidebar-foreground text-xs font-medium">Real-time sync active</span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;

