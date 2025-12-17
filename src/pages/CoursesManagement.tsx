import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseFilters from "@/components/courses/CourseFilters";
import CourseColumn from "@/components/courses/CourseColumn";
import AddCourseModal, { CourseFormData } from "@/components/courses/AddCourseModal";
import { Course } from "@/components/courses/CourseCard";
import { toast } from "@/hooks/use-toast";

const initialCourses: Course[] = [
  { id: "1", code: "FIN-501", title: "Advanced Financial Analytics", faculty: "Dr. Smith", students: 0, status: "draft" },
  { id: "2", code: "MKT-401", title: "Digital Marketing Strategy", faculty: "Prof. Johnson", students: 0, status: "draft" },
  { id: "3", code: "OPS-301", title: "Supply Chain Management", faculty: "Dr. Williams", students: 0, status: "review" },
  { id: "4", code: "FIN-301", title: "Corporate Finance", faculty: "Dr. Brown", students: 45, status: "published" },
  { id: "5", code: "MKT-301", title: "Marketing Management", faculty: "Prof. Davis", students: 52, status: "published" },
  { id: "6", code: "OPS-401", title: "Operations Research", faculty: "Dr. Wilson", students: 38, status: "published" },
  { id: "7", code: "ACC-201", title: "Old Accounting Principles", faculty: "Prof. Taylor", students: 0, status: "archived" },
];

const CoursesManagement = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [department, setDepartment] = useState("all");
  const [level, setLevel] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const draftCourses = courses.filter((c) => c.status === "draft");
  const reviewCourses = courses.filter((c) => c.status === "review");
  const publishedCourses = courses.filter((c) => c.status === "published");
  const archivedCourses = courses.filter((c) => c.status === "archived");

  const handleAddCourse = (data: CourseFormData) => {
    const newCourse: Course = {
      id: Date.now().toString(),
      code: data.code,
      title: data.title,
      faculty: data.faculty,
      students: 0,
      status: "draft",
    };
    setCourses([newCourse, ...courses]);
    toast({
      title: "Course Created",
      description: `${data.title} has been added to drafts.`,
    });
  };

  const handleEditCourse = (course: Course) => {
    toast({
      title: "Edit Course",
      description: `Editing ${course.title}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Courses Management</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your institution's course catalog
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Course
        </Button>
      </div>

      {/* Filters */}
      <CourseFilters
        department={department}
        level={level}
        sortBy={sortBy}
        viewMode={viewMode}
        onDepartmentChange={setDepartment}
        onLevelChange={setLevel}
        onSortChange={setSortBy}
        onViewModeChange={setViewMode}
      />

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        <CourseColumn
          title="Draft"
          count={draftCourses.length}
          courses={draftCourses}
          variant="draft"
          onEditCourse={handleEditCourse}
        />
        <CourseColumn
          title="Under Review"
          count={reviewCourses.length}
          courses={reviewCourses}
          variant="review"
          onEditCourse={handleEditCourse}
        />
        <CourseColumn
          title="Published"
          count={publishedCourses.length}
          courses={publishedCourses}
          variant="published"
          onEditCourse={handleEditCourse}
        />
        <CourseColumn
          title="Archived"
          count={archivedCourses.length}
          courses={archivedCourses}
          variant="archived"
          onEditCourse={handleEditCourse}
        />
      </div>

      {/* Add Course Modal */}
      <AddCourseModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAddCourse}
      />
    </div>
  );
};

export default CoursesManagement;
