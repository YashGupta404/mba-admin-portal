import { Search, Plus, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NotificationsDropdown from "./NotificationsDropdown";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  return (
    <header className="h-14 lg:h-16 bg-card border-b border-border px-3 lg:px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Left section - Menu button and Breadcrumb */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden h-9 w-9"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Breadcrumb - hidden on small mobile */}
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Admin</span>
          <span className="text-muted-foreground">&gt;</span>
          <span className="font-medium text-foreground">Dashboard</span>
        </div>
      </div>

      {/* Search - hidden on mobile, shown on tablet+ */}
      <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, faculty, students..."
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Live indicator - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>

        {/* Notifications */}
        <NotificationsDropdown />

        {/* Add button - hidden on mobile */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Plus className="w-5 h-5 text-muted-foreground" />
        </Button>

        {/* User profile */}
        <div className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l border-border">
          {/* User info - hidden on mobile */}
          <div className="hidden lg:block text-right">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
          <Avatar className="h-8 w-8 lg:h-10 lg:w-10 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm lg:text-base">A</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

