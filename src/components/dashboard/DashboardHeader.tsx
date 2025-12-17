import { Search, Bell, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const DashboardHeader = () => {
  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Admin</span>
        <span className="text-muted-foreground">&gt;</span>
        <span className="font-medium text-foreground">Dashboard</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, faculty, students..."
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Add button */}
        <Button variant="ghost" size="icon">
          <Plus className="w-5 h-5 text-muted-foreground" />
        </Button>

        {/* User profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
          <Avatar className="h-10 w-10 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">A</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
