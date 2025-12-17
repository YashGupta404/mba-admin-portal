import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CourseFiltersProps {
  department: string;
  level: string;
  sortBy: string;
  viewMode: "grid" | "list";
  onDepartmentChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onViewModeChange: (value: "grid" | "list") => void;
}

const CourseFilters = ({
  department,
  level,
  sortBy,
  viewMode,
  onDepartmentChange,
  onLevelChange,
  onSortChange,
  onViewModeChange,
}: CourseFiltersProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Select value={department} onValueChange={onDepartmentChange}>
          <SelectTrigger className="w-[160px] bg-background border-border">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
          </SelectContent>
        </Select>

        <Select value={level} onValueChange={onLevelChange}>
          <SelectTrigger className="w-[130px] bg-background border-border">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="100">100 Level</SelectItem>
            <SelectItem value="200">200 Level</SelectItem>
            <SelectItem value="300">300 Level</SelectItem>
            <SelectItem value="400">400 Level</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[160px] bg-background border-border">
            <SelectValue placeholder="Recently Updated" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="recent">Recently Updated</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="enrollment">Enrollment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            viewMode === "grid" && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          onClick={() => onViewModeChange("grid")}
        >
          <LayoutGrid className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            viewMode === "list" && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          onClick={() => onViewModeChange("list")}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CourseFilters;
