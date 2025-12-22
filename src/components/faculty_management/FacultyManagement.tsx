import { useState, useEffect } from "react";
import { Plus, Download, Filter, Edit, Eye, Trash2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FacultyModal from "./AddFacultyModal";
import DeleteFacultyDialog from "./DeleteFacultyDialog";
import { toast } from "@/hooks/use-toast";
import {
    Faculty,
    FacultyInput,
    fetchAllFaculty,
    createFaculty,
    updateFaculty,
    deleteFaculty,
} from "@/services/facultyApi";

const specializations = [
    "All Specializations",
    "Marketing",
    "Finance",
    "Human Resource Management",
    "Operations Management",
    "Strategy",
    "Economics",
    "Business Analytics",
];

const FacultyManagement = () => {
    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [specialization, setSpecialization] = useState("All Specializations");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

    // Delete confirmation state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [facultyToDelete, setFacultyToDelete] = useState<Faculty | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch faculty from backend on mount
    const loadFaculty = async () => {
        setIsLoading(true);
        try {
            const data = await fetchAllFaculty();
            setFaculty(data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load faculty. Make sure the backend is running.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadFaculty();
    }, []);

    // Filter faculty by specialization
    const filteredFaculty = faculty.filter((f) => {
        return (
            specialization === "All Specializations" ||
            f.specialization === specialization
        );
    });

    // Handle Add/Edit faculty
    const handleSubmitFaculty = async (data: FacultyInput) => {
        setIsSubmitting(true);
        try {
            if (editingFaculty) {
                // Update existing faculty
                await updateFaculty(data.id, data);
                toast({
                    title: "Faculty Updated",
                    description: `${data.name} has been updated successfully.`,
                });
            } else {
                // Create new faculty
                await createFaculty(data);
                toast({
                    title: "Faculty Added",
                    description: `${data.name} has been added successfully.`,
                });
            }
            setIsModalOpen(false);
            setEditingFaculty(null);
            await loadFaculty(); // Refresh list
        } catch (error) {
            toast({
                title: "Error",
                description: editingFaculty
                    ? "Failed to update faculty."
                    : "Failed to add faculty.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Edit button click
    const handleEditClick = (member: Faculty) => {
        setEditingFaculty(member);
        setIsModalOpen(true);
    };

    // Handle Delete button click
    const handleDeleteClick = (member: Faculty) => {
        setFacultyToDelete(member);
        setDeleteDialogOpen(true);
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        if (!facultyToDelete) return;

        setIsDeleting(true);
        try {
            await deleteFaculty(facultyToDelete.id);
            toast({
                title: "Faculty Deleted",
                description: `${facultyToDelete.name} has been deleted successfully.`,
            });
            setDeleteDialogOpen(false);
            setFacultyToDelete(null);
            await loadFaculty(); // Refresh list
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete faculty.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    // Handle modal close
    const handleModalOpenChange = (open: boolean) => {
        setIsModalOpen(open);
        if (!open) {
            setEditingFaculty(null);
        }
    };

    // Selection handlers
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(filteredFaculty.map((f) => f.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
            setSelectedIds(selectedIds.filter((i) => i !== id));
        }
    };

    // Get initials from name
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 3);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Faculty Management
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage faculty members and their assignments
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={loadFaculty}
                        disabled={isLoading}
                        className="border-border"
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Faculty
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
                <Select value={specialization} onValueChange={setSpecialization}>
                    <SelectTrigger className="w-[200px] bg-background border-border">
                        <SelectValue placeholder="All Specializations" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                        {specializations.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                                {spec}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {filteredFaculty.length} faculty member{filteredFaculty.length !== 1 ? "s" : ""}
                    </span>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Loading faculty...</span>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && faculty.length === 0 && (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <p className="text-muted-foreground mb-4">
                        No faculty members found in the database.
                    </p>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Faculty
                    </Button>
                </div>
            )}

            {/* Table */}
            {!isLoading && faculty.length > 0 && (
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr className="text-left text-sm text-muted-foreground">
                                <th className="p-4 w-12">
                                    <Checkbox
                                        checked={
                                            selectedIds.length === filteredFaculty.length &&
                                            filteredFaculty.length > 0
                                        }
                                        onCheckedChange={handleSelectAll}
                                    />
                                </th>
                                <th className="p-4 font-medium">FACULTY</th>
                                <th className="p-4 font-medium">TITLE</th>
                                <th className="p-4 font-medium">SPECIALIZATION</th>
                                <th className="p-4 font-medium">PUBLICATIONS</th>
                                <th className="p-4 font-medium">STUDENTS</th>
                                <th className="p-4 font-medium">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFaculty.map((member) => (
                                <tr
                                    key={member.id}
                                    className="border-t border-border hover:bg-muted/30 transition-colors"
                                >
                                    <td className="p-4">
                                        <Checkbox
                                            checked={selectedIds.includes(member.id)}
                                            onCheckedChange={(checked) =>
                                                handleSelectOne(member.id, checked as boolean)
                                            }
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-semibold">
                                                    {getInitials(member.name)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-foreground">{member.name}</p>
                                                <p className="text-sm text-muted-foreground">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-foreground">{member.title}</td>
                                    <td className="p-4 text-foreground">{member.specialization}</td>
                                    <td className="p-4 text-foreground text-center">
                                        {member.publications || 0}
                                    </td>
                                    <td className="p-4 text-foreground text-center">
                                        {member.students || 0}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                onClick={() => handleEditClick(member)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                onClick={() =>
                                                    toast({
                                                        title: "View Profile",
                                                        description: `Viewing ${member.name}'s profile`,
                                                    })
                                                }
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                onClick={() => handleDeleteClick(member)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add/Edit Faculty Modal */}
            <FacultyModal
                open={isModalOpen}
                onOpenChange={handleModalOpenChange}
                onSubmit={handleSubmitFaculty}
                editingFaculty={editingFaculty}
                isSubmitting={isSubmitting}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteFacultyDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                facultyName={facultyToDelete?.name || ""}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default FacultyManagement;
