import { UserPlus, BookOpen, Briefcase, Users, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    icon: UserPlus,
    iconColor: "icon-green",
    title: "New admission application from Sarah Johnson",
    time: "2 minutes ago",
  },
  {
    icon: BookOpen,
    iconColor: "icon-blue",
    title: "Marketing Management course updated by Dr. Smith",
    time: "15 minutes ago",
  },
  {
    icon: Briefcase,
    iconColor: "icon-orange",
    title: "Google placement drive scheduled for Dec 15",
    time: "1 hour ago",
  },
  {
    icon: Users,
    iconColor: "icon-green",
    title: "New faculty member Prof. Williams joined",
    time: "2 hours ago",
  },
  {
    icon: Calendar,
    iconColor: "icon-pink",
    title: "Annual fest registration opened",
    time: "3 hours ago",
  },
];

const RecentActivities = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
        <button className="text-sm text-primary font-medium hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", activity.iconColor)}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;
