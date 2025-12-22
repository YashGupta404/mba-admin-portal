import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import FacultyTable, { Faculty } from "@/components/faculty/FacultyTable";
import FacultyFilters from "@/components/faculty/FacultyFilters";
import AddFacultyModal, {
    FacultyFormData,
} from "@/components/faculty/AddFacultyModal";
import { toast } from "@/hooks/use-toast";

const initialFaculty: Faculty[] = [
    {
        id: "1",
        name: "Dr. John Smith",
        email: "john.smith@mba.edu",
        department: "Finance",
        courses: 3,
        papers: 15,
        rating: 4.8,
        status: "active",
        experience: "12 years",
        qualification: "PhD Finance",
    },
    {
        id: "2",
        name: "Prof. Sarah Johnson",
        email: "sarah.johnson@mba.edu",
        department: "Marketing",
        courses: 4,
        papers: 22,
        rating: 4.9,
        status: "active",
        experience: "8 years",
        qualification: "PhD Marketing",
    },
    {
        id: "3",
        name: "Dr. Michael Williams",
        email: "michael.williams@mba.edu",
        department: "Operations",
        courses: 2,
        papers: 18,
        rating: 4.7,
        status: "active",
        experience: "15 years",
        qualification: "PhD Operations",
    },
    {
        id: "4",
        name: "Prof. Emily Brown",
        email: "emily.brown@mba.edu",
        department: "HR",
        courses: 3,
        papers: 12,
        rating: 4.6,
        status: "active",
        experience: "10 years",
        qualification: "PhD HR",
    },
    {
        id: "5",
        name: "Dr. David Davis",
        email: "david.davis@mba.edu",
        department: "Finance",
        courses: 2,
        papers: 8,
        rating: 4.5,
        status: "inactive",
        experience: "6 years",
        qualification: "PhD Finance",
    },
];

const FacultyManagement = () => {
    const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [department, setDepartment] = useState("all");
    const [status, setStatus] = useState("all");
    const [experience, setExperience] = useState([0, 20]);

    const handleAddFaculty = (data: FacultyFormData) => {
        const newFaculty: Faculty = {
            id: Date.now().toString(),
            name: data.fullName,
            email: data.email,
            department: data.department.charAt(0).toUpperCase() + data.department.slice(1),
            courses: 0,
            papers: 0,
            rating: 0,
            status: "active",
            experience: `${data.experience} years`,
            qualification: data.qualification,
        };
        setFaculty([newFaculty, ...faculty]);
        toast({
            title: "Faculty Added",
            description: `${data.fullName} has been added successfully.`,
        });
    };

    const handleEditFaculty = (member: Faculty) => {
        toast({
            title: "Edit Faculty",
            description: `Editing ${member.name}`,
        });
    };

    const handleDeleteFaculty = (id: string) => {
        const member = faculty.find((f) => f.id === id);
        setFaculty(faculty.filter((f) => f.id !== id));
        toast({
            title: "Faculty Deleted",
            description: `${member?.name} has been removed.`,
            variant: "destructive",
        });
    };

    const filteredFaculty = faculty.filter((member) => {
        if (department !== "all" && member.department.toLowerCase() !== department)
            return false;
        if (status !== "all" && member.status !== status) return false;
        const exp = parseInt(member.experience);
        if (exp < experience[0] || exp > experience[1]) return false;
        return true;
    });

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
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Faculty
                </Button>
            </div>

            {/* Filters */}
            <FacultyFilters
                department={department}
                status={status}
                experience={experience}
                onDepartmentChange={setDepartment}
                onStatusChange={setStatus}
                onExperienceChange={setExperience}
            />

            {/* Table */}
            <FacultyTable
                faculty={filteredFaculty}
                onEdit={handleEditFaculty}
                onDelete={handleDeleteFaculty}
            />

            {/* Add Faculty Modal */}
            <AddFacultyModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleAddFaculty}
            />
        </div>
    );
};

export default FacultyManagement;
