import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Facility } from "./FacilityCard";

export interface FacilityFormData {
    title: string;
    details: string;
}

interface CreateFacilityModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: FacilityFormData) => void;
    editingFacility?: Facility | null;
}

const CreateFacilityModal = ({
    open,
    onOpenChange,
    onSubmit,
    editingFacility,
}: CreateFacilityModalProps) => {
    const [formData, setFormData] = useState<FacilityFormData>({
        title: "",
        details: "",
    });

    useEffect(() => {
        if (editingFacility) {
            setFormData({
                title: editingFacility.title,
                details: editingFacility.details,
            });
        } else {
            setFormData({
                title: "",
                details: "",
            });
        }
    }, [editingFacility, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            title: "",
            details: "",
        });
        onOpenChange(false);
    };

    const handleChange = (field: keyof FacilityFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        {editingFacility ? "Edit Facility" : "Add New Facility"}
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

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Facility Name *</Label>
                        <Input
                            id="title"
                            placeholder="e.g., Modern Campus"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="details">Description *</Label>
                        <Textarea
                            id="details"
                            rows={5}
                            placeholder="Describe the facility..."
                            value={formData.details}
                            onChange={(e) => handleChange("details", e.target.value)}
                            className="resize-none"
                            required
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
                            {editingFacility ? "Update Facility" : "Add Facility"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateFacilityModal;
