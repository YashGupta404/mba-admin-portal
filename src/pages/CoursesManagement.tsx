import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft, Settings, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import AddCourseModal, { CourseFormData } from "@/components/courses/AddCourseModal";
import EditCourseModal from "@/components/courses/EditCourseModal";
import ProgramSettingsModal from "@/components/courses/ProgramSettingsModal";
import ProgrammeCard, { Programme } from "@/components/courses/ProgrammeCard";
import { toast } from "@/hooks/use-toast";
import { programsApi, coursesApi, type Program, type Course as APICourse } from "@/services/coursesApi";

interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  level: string;
  credits: number;
  faculty: string;
  students: number;
  status: string;
}

const CoursesManagement = () => {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [selectedProgramme, setSelectedProgramme] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProgramSettingsOpen, setIsProgramSettingsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch programs on mount
  useEffect(() => {
    fetchPrograms();
  }, []);

  // Fetch courses when programme is selected
  useEffect(() => {
    if (selectedProgramme) {
      fetchCourses(selectedProgramme);
    }
  }, [selectedProgramme]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const data = await programsApi.getAll();

      const transformedProgrammes: Programme[] = data.map((program: Program) => ({
        id: program.programId,
        name: program.name,
        description: program.description,
        overviewText: program.description || "", // ✅ Program Overview
        duration: program.duration.value,
        students: program.intake.value,
        courses: 0,
        color: getColorForProgramme(program.programId),
        iconBg: getIconBgForProgramme(program.programId),
      }));

      setProgrammes(transformedProgrammes);
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast({
        title: "Error",
        description: "Failed to load programmes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async (programId: string) => {
    try {
      setLoading(true);
      const data = await coursesApi.getAll({ programId });

      const transformedCourses: Course[] = data.map((course: APICourse) => ({
        id: course._id,
        code: course.courseCode,
        title: course.courseName,
        department: course.department,
        level: course.level,
        credits: course.credits,
        faculty: course.instructorName,
        students: course.enrolledStudents,
        status: course.status,
      }));

      setCourses(transformedCourses);

      setProgrammes(prev =>
        prev.map(p =>
          p.id === programId ? { ...p, courses: transformedCourses.length } : p
        )
      );
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast({
        title: "Error",
        description: "Failed to load courses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getColorForProgramme = (programId: string): string => {
    const colors: Record<string, string> = {
      "mba-fulltime": "emerald",
      "mba-executive": "purple",
      "mba-online": "blue",
    };
    return colors[programId] || "gray";
  };

  const getIconBgForProgramme = (programId: string): string => {
    const colors: Record<string, string> = {
      "mba-fulltime": "bg-emerald-500",
      "mba-executive": "bg-purple-500",
      "mba-online": "bg-blue-500",
    };
    return colors[programId] || "bg-gray-500";
  };

  const handleSelectProgramme = (programmeId: string) => {
    setSelectedProgramme(programmeId);
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

  const handleAddCourse = async (data: CourseFormData) => {
    try {
      if (!selectedProgramme) return;

      const newCourse = {
        courseCode: data.code,
        courseName: data.title,
        programId: selectedProgramme,
        department: data.department || "General Management",
        level: data.level as "Foundation" | "Core" | "Advanced" | "Elective",
        credits: parseInt(data.credits) || 3,
        description: data.description || "",
        instructorName: data.faculty,
        semester: parseInt(data.semester) || 1,
        enrolledStudents: 0,
        maxCapacity: parseInt(data.maxCapacity) || 60,
        status: "Draft" as const,
        prerequisites: [],
        learningOutcomes: [],
        assessmentMethods: [],
      };

      await coursesApi.create(newCourse);

      toast({
        title: "Course Created",
        description: `${data.title} has been added successfully.`,
      });

      fetchCourses(selectedProgramme);
    } catch (error) {
      console.error("Error creating course:", error);
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsEditModalOpen(true);
  };

  const handleUpdateCourse = async (id: string, data: any) => {
    try {
      await coursesApi.update(id, data);
      toast({
        title: "Course Updated",
        description: "Course has been updated successfully.",
      });
      if (selectedProgramme) fetchCourses(selectedProgramme);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update course.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCourse = async () => {
    try {
      if (!deletingCourse) return;
      await coursesApi.delete(deletingCourse.id);
      toast({
        title: "Course Deleted",
        description: "Course has been deleted successfully.",
      });
      if (selectedProgramme) fetchCourses(selectedProgramme);
      setDeletingCourse(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete course.",
        variant: "destructive",
      });
    }
  };

  const selectedProgrammeData = programmes.find(p => p.id === selectedProgramme);

  if (loading && programmes.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading programmes...</p>
        </div>
      </div>
    );
  }

  // Programme Selection View
  if (!selectedProgramme) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Courses Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map(programme => (
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

  // Courses View
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
     

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleBackToProgrammes}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">
              {selectedProgrammeData?.name} - Courses
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage courses • {courses.length} courses
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setIsProgramSettingsOpen(true)}>
          <Settings className="w-4 h-4 mr-2" />
          Program Settings
        </Button>
      </div>

      {/* ✅ Program Overview Admin Preview */}
      {selectedProgrammeData?.overviewText && (
        <Card className="p-4 bg-muted/30">
          <h3 className="text-sm font-semibold mb-2">
            Program Overview (Admin Preview)
          </h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {selectedProgrammeData.overviewText}
          </p>
        </Card>
      )}

      {/* Courses Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Code</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map(course => (
              <TableRow key={course.id}>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.department}</TableCell>
                <TableCell>{course.level}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.faculty}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEditCourse(course)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeletingCourse(course)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <AddCourseModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSubmit={handleAddCourse} />
      <EditCourseModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} onSubmit={handleUpdateCourse} course={editingCourse} />

      {selectedProgramme && (
        <ProgramSettingsModal
          open={isProgramSettingsOpen}
          onOpenChange={setIsProgramSettingsOpen}
          programId={selectedProgramme}
          onSave={() => toast({ title: "Saved", description: "Program updated" })}
        />
      )}

      <AlertDialog open={!!deletingCourse} onOpenChange={() => setDeletingCourse(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deletingCourse?.title}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCourse}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CoursesManagement;
