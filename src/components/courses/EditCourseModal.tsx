import { useState, useEffect } from "react";
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
import { Course } from "./CourseCard";

interface EditCourseModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (id: string, data: Partial<CourseEditData>) => void;
    course: Course | null;
    fullCourseData?: any; // Full course data from API
}

export interface CourseEditData {
    courseName: string;
    courseCode: string;
    department: string;
    instructorName: string;
    description: string;
    credits: number;
    semester: number;
    maxCapacity: number;
    level: string;
    status: string;
}

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

const levels = ["Foundation", "Core", "Advanced", "Elective"];
const semesters = ["1", "2", "3", "4"];
const statuses = ["Draft", "Under Review", "Published", "Archived"];

const EditCourseModal = ({
    open,
    onOpenChange,
    onSubmit,
    course,
    fullCourseData
}: EditCourseModalProps) => {
    const [formData, setFormData] = useState<CourseEditData>({
        courseName: "",
        courseCode: "",
        department: "",
        instructorName: "",
        description: "",
        credits: 3,
        semester: 1,
        maxCapacity: 60,
        level: "Core",
        status: "Draft",
    });

    useEffect(() => {
        if (course && open) {
            // If we have full course data from API, use it
            if (fullCourseData) {
                setFormData({
                    courseName: fullCourseData.courseName || course.title,
                    courseCode: fullCourseData.courseCode || course.code,
                    department: fullCourseData.department || "",
                    instructorName: fullCourseData.instructorName || course.faculty,
                    description: fullCourseData.description || "",
                    credits: fullCourseData.credits || 3,
                    semester: fullCourseData.semester || 1,
                    maxCapacity: fullCourseData.maxCapacity || 60,
                    level: fullCourseData.level || "Core",
                    status: fullCourseData.status || "Draft",
                });
            } else {
                // Use basic course data
                setFormData({
                    courseName: course.title,
                    courseCode: course.code,
                    department: "",
                    instructorName: course.faculty,
                    description: "",
                    credits: 3,
                    semester: 1,
                    maxCapacity: 60,
                    level: "Core",
                    status: course.status === 'draft' ? 'Draft' :
                        course.status === 'review' ? 'Under Review' :
                            course.status === 'published' ? 'Published' : 'Archived',
                });
            }
        }
    }, [course, fullCourseData, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (course) {
            onSubmit(course.id, formData);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-card border-border max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-foreground">Edit Course</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Course Title and Code */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="courseName" className="text-foreground">
                                Course Title *
                            </Label>
                            <Input
                                id="courseName"
                                value={formData.courseName}
                                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                                className="bg-background border-border"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="courseCode" className="text-foreground">
                                Course Code *
                            </Label>
                            <Input
                                id="courseCode"
                                value={formData.courseCode}
                                onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
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
                                value={formData.instructorName}
                                onValueChange={(value) => setFormData({ ...formData, instructorName: value })}
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
                            >
                                <SelectTrigger className="bg-background border-border">
                                    <SelectValue />
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
                                value={formData.semester.toString()}
                                onValueChange={(value) => setFormData({ ...formData, semester: parseInt(value) })}
                            >
                                <SelectTrigger className="bg-background border-border">
                                    <SelectValue />
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

                    {/* Status */}
                    <div className="space-y-2">
                        <Label className="text-foreground">Status *</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => setFormData({ ...formData, status: value })}
                        >
                            <SelectTrigger className="bg-background border-border">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                                {statuses.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-foreground">
                            Description
                        </Label>
                        <Textarea
                            id="description"
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
                                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
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
                                onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) })}
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
                            Update Course
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditCourseModal;
