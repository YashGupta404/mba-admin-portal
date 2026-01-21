import { LucideIcon, Edit2, Trash2, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  id?: string;
  title: string;
  value: string;
  change: string;
  changePositive?: boolean;
  icon: LucideIcon;
  iconColorClass: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const StatCard = ({
  title,
  value,
  change,
  changePositive = true,
  icon: Icon,
  iconColorClass,
  onEdit,
  onDelete
}: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow duration-200 relative">
      {/* Edit/Delete Actions - Always visible at bottom right */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
          onClick={onEdit}
        >
          <Edit2 className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={onDelete}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

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
