import { MoreHorizontal, Eye, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

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
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, newStatus: string) => void;
}

const CourseCard = ({ course, onEdit, onDelete, onStatusChange }: CourseCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(course.id);
    setShowDeleteDialog(false);
  };

  const handleStatusChange = (newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(course.id, newStatus);
    }
  };

  return (
    <>
      <div
        className="bg-card border border-border rounded-lg p-4 space-y-3 cursor-move hover:shadow-md transition-shadow"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('courseId', course.id);
          e.dataTransfer.setData('currentStatus', course.status);
        }}
      >
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
              <DropdownMenuItem onClick={() => onEdit(course)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { }}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {course.status !== 'published' && (
                <DropdownMenuItem onClick={() => handleStatusChange('published')}>
                  Publish
                </DropdownMenuItem>
              )}
              {course.status !== 'archived' && (
                <DropdownMenuItem onClick={() => handleStatusChange('archived')}>
                  Archive
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
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
            <Edit2 className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{course.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CourseCard;
