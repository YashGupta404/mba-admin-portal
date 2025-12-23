import { useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseFilters from "@/components/courses/CourseFilters";
import CourseColumn from "@/components/courses/CourseColumn";
import AddCourseModal, { CourseFormData } from "@/components/courses/AddCourseModal";
import ProgrammeCard, { Programme } from "@/components/courses/ProgrammeCard";
import { Course } from "@/components/courses/CourseCard";
import { toast } from "@/hooks/use-toast";

const programmes: Programme[] = [
  {
    id: "mba-fulltime",
    name: "MBA Full Time",
    description: "Intensive 2-year immersive program with hands-on learning, internships, and global exposure for career transformation.",
    duration: "2 Years",
    students: 320,
    courses: 32,
    color: "emerald",
    iconBg: "bg-emerald-500",
  },
  {
    id: "mba-executive",
    name: "MBA Executive",
    description: "Premium executive education for senior professionals. Weekend classes with industry projects and leadership focus.",
    duration: "18 Months",
    students: 180,
    courses: 20,
    color: "purple",
    iconBg: "bg-purple-500",
  },
  {
    id: "mba-online",
    name: "MBA Online",
    description: "Flexible online learning designed for working professionals. Learn at your own pace with live sessions and recorded content.",
    duration: "2 Years",
    students: 450,
    courses: 24,
    color: "blue",
    iconBg: "bg-blue-500",
  },
];

const coursesByProgramme: Record<string, Course[]> = {
  "mba-online": [
    { id: "1", code: "ONL-501", title: "Digital Business Strategy", faculty: "Dr. Smith", students: 85, status: "published" },
    { id: "2", code: "ONL-401", title: "E-Commerce Management", faculty: "Prof. Johnson", students: 72, status: "published" },
    { id: "3", code: "ONL-301", title: "Virtual Team Leadership", faculty: "Dr. Williams", students: 0, status: "draft" },
  ],
  "mba-fulltime": [
    { id: "4", code: "FIN-501", title: "Advanced Financial Analytics", faculty: "Dr. Smith", students: 0, status: "draft" },
    { id: "5", code: "MKT-401", title: "Digital Marketing Strategy", faculty: "Prof. Johnson", students: 0, status: "draft" },
    { id: "6", code: "OPS-301", title: "Supply Chain Management", faculty: "Dr. Williams", students: 0, status: "review" },
    { id: "7", code: "FIN-301", title: "Corporate Finance", faculty: "Dr. Brown", students: 45, status: "published" },
    { id: "8", code: "MKT-301", title: "Marketing Management", faculty: "Prof. Davis", students: 52, status: "published" },
    { id: "9", code: "OPS-401", title: "Operations Research", faculty: "Dr. Wilson", students: 38, status: "published" },
    { id: "10", code: "ACC-201", title: "Old Accounting Principles", faculty: "Prof. Taylor", students: 0, status: "archived" },
  ],
  "mba-executive": [
    { id: "11", code: "EXE-601", title: "Strategic Leadership", faculty: "Dr. Anderson", students: 35, status: "published" },
    { id: "12", code: "EXE-501", title: "Corporate Governance", faculty: "Prof. Martinez", students: 28, status: "published" },
    { id: "13", code: "EXE-401", title: "Change Management", faculty: "Dr. Lee", students: 0, status: "review" },
  ],
};

const CoursesManagement = () => {
  const [selectedProgramme, setSelectedProgramme] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [department, setDepartment] = useState("all");
  const [level, setLevel] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSelectProgramme = (programmeId: string) => {
    setSelectedProgramme(programmeId);
    setCourses(coursesByProgramme[programmeId] || []);
    const programme = programmes.find(p => p.id === programmeId);
    toast({
      title: "Programme Selected",
      description: `Now viewing courses for ${programme?.name}`,
    });
  };

  const handleBackToProgrammes = () => {
    setSelectedProgramme(null);
    setCourses([]);
  };

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

  const selectedProgrammeData = programmes.find(p => p.id === selectedProgramme);

  // Programme Selection View
  if (!selectedProgramme) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Courses Management</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Select a programme to manage its courses
            </p>
          </div>
        </div>

        {/* Programme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((programme) => (
            <ProgrammeCard
              key={programme.id}
              programme={programme}
              onEdit={handleSelectProgramme}
            />
          ))}
        </div>
      </div>
    );
  }

  // Courses View (after selecting a programme)
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBackToProgrammes}
            className="h-10 w-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {selectedProgrammeData?.name} - Courses
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage courses for {selectedProgrammeData?.name}
            </p>
          </div>
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
