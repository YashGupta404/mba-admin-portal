import { LayoutGrid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  searchQuery: string;
  onDepartmentChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onViewModeChange: (value: "grid" | "list") => void;
  onSearchChange: (value: string) => void;
}

const CourseFilters = ({
  department,
  level,
  sortBy,
  viewMode,
  searchQuery,
  onDepartmentChange,
  onLevelChange,
  onSortChange,
  onViewModeChange,
  onSearchChange,
}: CourseFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search courses by name or code..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background border-border"
        />
      </div>

      {/* Filters Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={department} onValueChange={onDepartmentChange}>
            <SelectTrigger className="w-[200px] bg-background border-border">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Finance & Strategy">Finance & Strategy</SelectItem>
              <SelectItem value="Marketing & Analytics">Marketing & Analytics</SelectItem>
              <SelectItem value="Technology & Innovation">Technology & Innovation</SelectItem>
              <SelectItem value="Operations & Supply Chain">Operations & Supply Chain</SelectItem>
              <SelectItem value="Business Analytics">Business Analytics</SelectItem>
              <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
              <SelectItem value="Human Resources">Human Resources</SelectItem>
              <SelectItem value="General Management">General Management</SelectItem>
            </SelectContent>
          </Select>

          <Select value={level} onValueChange={onLevelChange}>
            <SelectTrigger className="w-[140px] bg-background border-border">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Foundation">Foundation</SelectItem>
              <SelectItem value="Core">Core</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Elective">Elective</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[160px] bg-background border-border">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="recent">Recently Updated</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="enrollment">Enrollment</SelectItem>
              <SelectItem value="code">Course Code</SelectItem>
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
    </div>
  );
};

export default CourseFilters;
