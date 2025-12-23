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

export interface EventFormData {
    title: string;
    date: string;
    time: string;
    category: string;
    status: string;
    expectedAttendees: string;
    description: string;
    location: string;
    image?: string;
}

interface CreateEventModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: EventFormData) => void;
}

const CreateEventModal = ({
    open,
    onOpenChange,
    onSubmit,
}: CreateEventModalProps) => {
    const [formData, setFormData] = useState<EventFormData>({
        title: "",
        date: "",
        time: "",
        category: "",
        status: "upcoming",
        expectedAttendees: "",
        description: "",
        location: "",
        image: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            title: "",
            date: "",
            time: "",
            category: "",
            status: "upcoming",
            expectedAttendees: "",
            description: "",
            location: "",
            image: "",
        });
        onOpenChange(false);
    };

    const handleChange = (field: keyof EventFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Create New Event
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
                        <Label htmlFor="title">Event Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleChange("date", e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input
                                id="time"
                                type="time"
                                value={formData.time}
                                onChange={(e) => handleChange("time", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => handleChange("category", value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="academic">Academic</SelectItem>
                                    <SelectItem value="cultural">Cultural</SelectItem>
                                    <SelectItem value="sports">Sports</SelectItem>
                                    <SelectItem value="career">Career</SelectItem>
                                    <SelectItem value="networking">Networking</SelectItem>
                                    <SelectItem value="social">Social</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status *</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => handleChange("status", value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="ongoing">Ongoing</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="attendees">Expected Attendees</Label>
                        <Input
                            id="attendees"
                            type="number"
                            value={formData.expectedAttendees}
                            onChange={(e) => handleChange("expectedAttendees", e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Venue *</Label>
                        <Input
                            id="location"
                            placeholder="e.g., Main Auditorium"
                            value={formData.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL (optional)</Label>
                        <Input
                            id="image"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={formData.image}
                            onChange={(e) => handleChange("image", e.target.value)}
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
                            Create Event
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEventModal;
