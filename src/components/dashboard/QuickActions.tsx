import { Plus, UserPlus, FileText, Calendar, FileBarChart, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { icon: Plus, label: "Add Course", iconColor: "icon-blue" },
  { icon: UserPlus, label: "New Faculty", iconColor: "icon-green" },
  { icon: FileText, label: "Review Applications", iconColor: "icon-orange" },
  { icon: Calendar, label: "Schedule Event", iconColor: "icon-green" },
  { icon: FileBarChart, label: "Generate Report", iconColor: "icon-orange" },
  { icon: Upload, label: "Bulk Upload", iconColor: "icon-cyan" },
];

const QuickActions = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
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
