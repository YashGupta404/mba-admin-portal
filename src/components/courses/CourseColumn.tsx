import { cn } from "@/lib/utils";
import CourseCard, { Course } from "./CourseCard";
import { useState } from "react";

interface CourseColumnProps {
  title: string;
  count: number;
  courses: Course[];
  variant: "draft" | "review" | "published" | "archived";
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

const variantStyles = {
  draft: "bg-muted/50",
  review: "bg-amber-50 dark:bg-amber-950/20",
  published: "bg-emerald-50 dark:bg-emerald-950/20",
  archived: "bg-rose-50 dark:bg-rose-950/20",
};

const badgeStyles = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
  published: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
  archived: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400",
};

const CourseColumn = ({
  title,
  count,
  courses,
  variant,
  onEditCourse,
  onDeleteCourse,
  onStatusChange
}: CourseColumnProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const courseId = e.dataTransfer.getData('courseId');
    const currentStatus = e.dataTransfer.getData('currentStatus');

    // Map variant to status
    const statusMap: Record<string, string> = {
      'draft': 'Draft',
      'review': 'Under Review',
      'published': 'Published',
      'archived': 'Archived'
    };

    const newStatus = statusMap[variant];

    if (courseId && currentStatus !== variant) {
      onStatusChange(courseId, newStatus);
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg p-4 min-w-[280px] flex-1 transition-all",
        variantStyles[variant],
        isDragOver && "ring-2 ring-primary ring-offset-2"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-medium text-foreground">{title}</h3>
        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", badgeStyles[variant])}>
          {count}
        </span>
      </div>

      <div className="space-y-3 min-h-[200px]">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={onEditCourse}
            onDelete={onDeleteCourse}
            onStatusChange={onStatusChange}
          />
        ))}
        {courses.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No courses in {title.toLowerCase()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseColumn;
