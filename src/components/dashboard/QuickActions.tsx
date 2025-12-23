import { Plus, UserPlus, FileText, Calendar, FileBarChart, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const actions = [
  { icon: Plus, label: "Add Course", iconColor: "icon-blue", route: "/dashboard/courses" },
  { icon: UserPlus, label: "New Faculty", iconColor: "icon-green", route: "/dashboard/faculty" },
  { icon: FileText, label: "Review Applications", iconColor: "icon-orange", route: "/dashboard/admissions" },
  { icon: Calendar, label: "Schedule Event", iconColor: "icon-green", route: null },
  { icon: FileBarChart, label: "Generate Report", iconColor: "icon-orange", route: "/dashboard/analytics" },
  { icon: Upload, label: "Bulk Upload", iconColor: "icon-cyan", route: null },
];

const QuickActions = () => {
  const navigate = useNavigate();

  const handleClick = (action: typeof actions[0]) => {
    if (action.route) {
      navigate(action.route);
    } else {
      toast({
        title: action.label,
        description: `${action.label} feature coming soon!`,
      });
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => handleClick(action)}
              className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-muted/50 transition-all duration-200 group"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", action.iconColor)}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-foreground text-center">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
