import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CourseFormData) => void;
}

export interface CourseFormData {
  title: string;
  code: string;
  department: string;
  faculty: string;
  description: string;
  credits: string;
  semester: string;
  maxCapacity: string;
  level: string;
}

// Updated departments to match backend
const departments = [
  "Finance & Strategy",
  "Marketing & Analytics",
  "Technology & Innovation",
  "Operations & Supply Chain",
  "Business Analytics",
  "Entrepreneurship",
  "Human Resources",
  "General Management",
];

const facultyMembers = [
  "Dr. Smith",
  "Dr. Brown",
  "Dr. Williams",
  "Prof. Johnson",
  "Prof. Davis",
  "Prof. Taylor",
  "Dr. Wilson",
  "Dr. Anderson",
  "Prof. Martinez",
  "Dr. Lee",
];

const levels = [
  "Foundation",
  "Core",
  "Advanced",
  "Elective",
];

const semesters = ["1", "2", "3", "4"];

const AddCourseModal = ({ open, onOpenChange, onSubmit }: AddCourseModalProps) => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    code: "",
    department: "",
    faculty: "",
    description: "",
    credits: "3",
    semester: "1",
    maxCapacity: "60",
    level: "Core",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      code: "",
      department: "",
      faculty: "",
      description: "",
      credits: "3",
      semester: "1",
      maxCapacity: "60",
      level: "Core",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Course</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Title and Code */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">
                Course Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., Corporate Finance"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code" className="text-foreground">
                Course Code *
              </Label>
              <Input
                id="code"
                placeholder="e.g., FIN-301"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>
          </div>

          {/* Department and Faculty */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
                required
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Faculty *</Label>
              <Select
                value={formData.faculty}
                onValueChange={(value) => setFormData({ ...formData, faculty: value })}
                required
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select Faculty" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {facultyMembers.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Level and Semester */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Level *</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => setFormData({ ...formData, level: value })}
                required
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Semester *</Label>
              <Select
                value={formData.semester}
                onValueChange={(value) => setFormData({ ...formData, semester: value })}
                required
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {semesters.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of the course..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background border-border min-h-[100px]"
            />
          </div>

          {/* Credits and Max Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="credits" className="text-foreground">
                Credits *
              </Label>
              <Input
                id="credits"
                type="number"
                min="1"
                max="6"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxCapacity" className="text-foreground">
                Max Capacity *
              </Label>
              <Input
                id="maxCapacity"
                type="number"
                min="1"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground">
              Create Course
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseModal;
