import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changePositive?: boolean;
  icon: LucideIcon;
  iconColorClass: string;
}

const StatCard = ({ title, value, change, changePositive = true, icon: Icon, iconColorClass }: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <p className={cn(
            "text-sm mt-2",
            changePositive ? "text-primary" : "text-destructive"
          )}>
            {changePositive ? "↑" : "↓"} {change}
          </p>
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconColorClass)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
