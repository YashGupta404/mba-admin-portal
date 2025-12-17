import { cn } from "@/lib/utils";
import CourseCard, { Course } from "./CourseCard";

interface CourseColumnProps {
  title: string;
  count: number;
  courses: Course[];
  variant: "draft" | "review" | "published" | "archived";
  onEditCourse: (course: Course) => void;
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

const CourseColumn = ({ title, count, courses, variant, onEditCourse }: CourseColumnProps) => {
  return (
    <div className={cn("rounded-lg p-4 min-w-[280px] flex-1", variantStyles[variant])}>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-medium text-foreground">{title}</h3>
        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", badgeStyles[variant])}>
          {count}
        </span>
      </div>

      <div className="space-y-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onEdit={onEditCourse} />
        ))}
      </div>
    </div>
  );
};

export default CourseColumn;
