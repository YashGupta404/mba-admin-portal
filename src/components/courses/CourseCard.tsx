import { MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Course {
  id: string;
  code: string;
  title: string;
  faculty: string;
  students: number;
  status: "draft" | "review" | "published" | "archived";
}

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
}

const CourseCard = ({ course, onEdit }: CourseCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          {course.code}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <h4 className="font-medium text-foreground text-sm leading-tight">{course.title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{course.faculty}</p>
        <p className="text-xs text-muted-foreground">{course.students} students</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-primary border-primary/30 hover:bg-primary/10 text-xs h-8"
          onClick={() => onEdit(course)}
        >
          Edit
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
