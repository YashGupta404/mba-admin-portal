import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Faculty, FacultyInput, getNextFacultyId } from "@/services/facultyApi";

interface FacultyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: FacultyInput) => Promise<void>;
    editingFaculty?: Faculty | null;
    isSubmitting?: boolean;
}

const specializations = [
    "Marketing",
    "Finance",
    "Human Resource Management",
    "Operations Management",
    "Strategy",
    "Economics",
    "Business Analytics",
    "Entrepreneurship",
    "Information Technology",
];

const FacultyModal = ({
    open,
    onOpenChange,
    onSubmit,
    editingFaculty,
    isSubmitting = false,
}: FacultyModalProps) => {
    const [formData, setFormData] = useState<FacultyInput>({
        id: 0,
        name: "",
        title: "",
        specialization: "",
        email: "",
        image: "",
        bio: "",
        achievements: "",
        linkedin: "",
        publications: 0,
        students: 0,
        qualifications: [],
        researchAreas: [],
        currentProjects: [],
    });

    const [qualificationsInput, setQualificationsInput] = useState("");
    const [researchAreasInput, setResearchAreasInput] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Reset form when modal opens/closes or editing faculty changes
    useEffect(() => {
        if (open) {
            if (editingFaculty) {
                setFormData({
                    ...editingFaculty,
                });
                setQualificationsInput(editingFaculty.qualifications?.join(", ") || "");
                setResearchAreasInput(editingFaculty.researchAreas?.join(", ") || "");
            } else {
                // Generate next ID for new faculty
                getNextFacultyId().then((nextId) => {
                    setFormData({
                        id: nextId,
                        name: "",
                        title: "",
                        specialization: "",
                        email: "",
                        image: "",
                        bio: "",
                        achievements: "",
                        linkedin: "",
                        publications: 0,
                        students: 0,
                        qualifications: [],
                        researchAreas: [],
                        currentProjects: [],
                    });
                });
                setQualificationsInput("");
                setResearchAreasInput("");
            }
            setErrors({});
        }
    }, [open, editingFaculty]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Parse comma-separated inputs to arrays
        const dataToSubmit: FacultyInput = {
            ...formData,
            qualifications: qualificationsInput
                .split(",")
                .map((q) => q.trim())
                .filter((q) => q.length > 0),
            researchAreas: researchAreasInput
                .split(",")
                .map((r) => r.trim())
                .filter((r) => r.length > 0),
        };

        await onSubmit(dataToSubmit);
    };

    const addProject = () => {
        setFormData({
            ...formData,
            currentProjects: [
                ...(formData.currentProjects || []),
                { name: "", status: "Ongoing" },
            ],
        });
    };

    const updateProject = (index: number, field: "name" | "status", value: string) => {
        const projects = [...(formData.currentProjects || [])];
        projects[index] = { ...projects[index], [field]: value };
        setFormData({ ...formData, currentProjects: projects });
    };

    const removeProject = (index: number) => {
        const projects = [...(formData.currentProjects || [])];
        projects.splice(index, 1);
        setFormData({ ...formData, currentProjects: projects });
    };

    const isEditing = !!editingFaculty;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-card border-border p-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-foreground">
                        {isEditing ? "Edit Faculty" : "Add New Faculty"}
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[calc(90vh-120px)] px-6">
                    <form onSubmit={handleSubmit} className="space-y-4 pb-6">
                        {/* ID (readonly for edit mode) */}
                        <div className="space-y-2">
                            <Label htmlFor="id" className="text-foreground">
                                Faculty ID
                            </Label>
                            <Input
                                id="id"
                                type="number"
                                value={formData.id}
                                disabled
                                className="bg-muted border-border"
                            />
                            <p className="text-xs text-muted-foreground">Auto-generated</p>
                        </div>

                        {/* Required Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-foreground">
                                    Full Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Dr. Rajesh Kumar"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`bg-background border-border ${errors.name ? "border-destructive" : ""}`}
                                />
                                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-foreground">
                                    Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Professor, Associate Professor..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={`bg-background border-border ${errors.title ? "border-destructive" : ""}`}
                                />
                                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="specialization" className="text-foreground">
                                    Specialization <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="specialization"
                                    placeholder="Marketing, Finance, HR..."
                                    value={formData.specialization}
                                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                    className={`bg-background border-border ${errors.specialization ? "border-destructive" : ""}`}
                                    list="specializations"
                                />
                                <datalist id="specializations">
                                    {specializations.map((s) => (
                                        <option key={s} value={s} />
                                    ))}
                                </datalist>
                                {errors.specialization && (
                                    <p className="text-xs text-destructive">{errors.specialization}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground">
                                    Email <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="faculty@college.edu"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`bg-background border-border ${errors.email ? "border-destructive" : ""}`}
                                />
                                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Optional Fields */}
                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-foreground">
                                Profile Image URL
                            </Label>
                            <Input
                                id="image"
                                placeholder="https://example.com/photo.jpg"
                                value={formData.image || ""}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="bg-background border-border"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio" className="text-foreground">
                                Biography
                            </Label>
                            <Textarea
                                id="bio"
                                placeholder="Brief description of the faculty member..."
                                value={formData.bio || ""}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="bg-background border-border min-h-[80px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="achievements" className="text-foreground">
                                Achievements
                            </Label>
                            <Textarea
                                id="achievements"
                                placeholder="Awards, honors, recognitions..."
                                value={formData.achievements || ""}
                                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                                className="bg-background border-border min-h-[60px]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="linkedin" className="text-foreground">
                                    LinkedIn URL
                                </Label>
                                <Input
                                    id="linkedin"
                                    placeholder="https://linkedin.com/in/..."
                                    value={formData.linkedin || ""}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    className="bg-background border-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="publications" className="text-foreground">
                                    Publications Count
                                </Label>
                                <Input
                                    id="publications"
                                    type="number"
                                    min="0"
                                    value={formData.publications || 0}
                                    onChange={(e) =>
                                        setFormData({ ...formData, publications: parseInt(e.target.value) || 0 })
                                    }
                                    className="bg-background border-border"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="students" className="text-foreground">
                                Students Mentored
                            </Label>
                            <Input
                                id="students"
                                type="number"
                                min="0"
                                value={formData.students || 0}
                                onChange={(e) =>
                                    setFormData({ ...formData, students: parseInt(e.target.value) || 0 })
                                }
                                className="bg-background border-border"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="qualifications" className="text-foreground">
                                Qualifications
                            </Label>
                            <Input
                                id="qualifications"
                                placeholder="Ph.D., MBA, B.Tech (comma-separated)"
                                value={qualificationsInput}
                                onChange={(e) => setQualificationsInput(e.target.value)}
                                className="bg-background border-border"
                            />
                            <p className="text-xs text-muted-foreground">Separate with commas</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="researchAreas" className="text-foreground">
                                Research Areas
                            </Label>
                            <Input
                                id="researchAreas"
                                placeholder="Consumer Behavior, Branding... (comma-separated)"
                                value={researchAreasInput}
                                onChange={(e) => setResearchAreasInput(e.target.value)}
                                className="bg-background border-border"
                            />
                            <p className="text-xs text-muted-foreground">Separate with commas</p>
                        </div>

                        {/* Current Projects */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-foreground">Current Projects</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addProject}
                                    className="border-border"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Project
                                </Button>
                            </div>
                            {formData.currentProjects?.map((project, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        placeholder="Project name"
                                        value={project.name}
                                        onChange={(e) => updateProject(index, "name", e.target.value)}
                                        className="bg-background border-border flex-1"
                                    />
                                    <select
                                        value={project.status}
                                        onChange={(e) => updateProject(index, "status", e.target.value)}
                                        className="bg-background border border-border rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Planned">Planned</option>
                                    </select>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeProject(index)}
                                        className="text-destructive hover:text-destructive/80"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-border">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="border-border"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-primary text-primary-foreground"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? isEditing
                                        ? "Updating..."
                                        : "Adding..."
                                    : isEditing
                                        ? "Update Faculty"
                                        : "Add Faculty"}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default FacultyModal;
