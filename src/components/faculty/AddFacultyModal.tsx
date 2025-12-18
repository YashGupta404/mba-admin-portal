import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface FacultyFormData {
    fullName: string;
    email: string;
    department: string;
    qualification: string;
    experience: string;
    phone: string;
    bio: string;
    researchAreas: string;
}

interface AddFacultyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: FacultyFormData) => void;
}

const AddFacultyModal = ({
    open,
    onOpenChange,
    onSubmit,
}: AddFacultyModalProps) => {
    const [formData, setFormData] = useState<FacultyFormData>({
        fullName: "",
        email: "",
        department: "",
        qualification: "",
        experience: "",
        phone: "",
        bio: "",
        researchAreas: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            fullName: "",
            email: "",
            department: "",
            qualification: "",
            experience: "",
            phone: "",
            bio: "",
            researchAreas: "",
        });
        onOpenChange(false);
    };

    const handleChange = (
        field: keyof FacultyFormData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Add New Faculty
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4"
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                value={formData.fullName}
                                onChange={(e) => handleChange("fullName", e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select
                                value={formData.department}
                                onValueChange={(value) => handleChange("department", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="finance">Finance</SelectItem>
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                    <SelectItem value="operations">Operations</SelectItem>
                                    <SelectItem value="hr">HR</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="qualification">Qualification</Label>
                            <Input
                                id="qualification"
                                placeholder="e.g., PhD Finance"
                                value={formData.qualification}
                                onChange={(e) => handleChange("qualification", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="experience">Experience (years)</Label>
                            <Input
                                id="experience"
                                type="text"
                                value={formData.experience}
                                onChange={(e) => handleChange("experience", e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            rows={4}
                            value={formData.bio}
                            onChange={(e) => handleChange("bio", e.target.value)}
                            className="resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="researchAreas">Research Areas</Label>
                        <Input
                            id="researchAreas"
                            placeholder="Separate with commas"
                            value={formData.researchAreas}
                            onChange={(e) => handleChange("researchAreas", e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            Add Faculty
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddFacultyModal;
