import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "New admission application",
    description: "John Doe applied for MBA Program",
    time: "2 minutes ago",
  },
  {
    id: "2",
    title: "Course updated",
    description: "Marketing Management syllabus updated",
    time: "1 hour ago",
  },
  {
    id: "3",
    title: "Placement drive scheduled",
    description: "Google recruitment drive on Dec 15",
    time: "3 hours ago",
  },
];

const NotificationsDropdown = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0 bg-card border-border"
        sideOffset={8}
      >
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Notifications</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <h4 className="text-sm font-medium text-foreground">
                {notification.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {notification.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {notification.time}
              </p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsDropdown;
