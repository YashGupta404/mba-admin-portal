import { useState } from "react";
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdmissionFunnel from "@/components/admissions/AdmissionFunnel";
import ApplicantCard, { Applicant } from "@/components/admissions/ApplicantCard";
import AdmissionsFilters from "@/components/admissions/AdmissionsFilters";
import { toast } from "@/hooks/use-toast";

const funnelData = [
    { stage: "Applied", count: 1247, conversion: "100% conversion", color: "bg-emerald-500", number: 1 },
    { stage: "Shortlisted", count: 623, conversion: "50% conversion", color: "bg-blue-500", number: 2 },
    { stage: "Interviewed", count: 312, conversion: "25% conversion", color: "bg-orange-500", number: 3 },
    { stage: "Offered", count: 156, conversion: "12.5% conversion", color: "bg-purple-500", number: 4 },
    { stage: "Enrolled", count: 124, conversion: "10% conversion", color: "bg-teal-500", number: 5 },
];

const initialApplicants: Applicant[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        applicationId: "APP-2024-001",
        status: "pending",
        gmatScore: 720,
        experience: "3 years",
        specialization: "Finance",
        appliedDate: "2024-01-15",
        currentStage: "interviewed",
        initials: "SJ",
        initialsColor: "bg-purple-500",
    },
    {
        id: "2",
        name: "Michael Chen",
        applicationId: "APP-2024-002",
        status: "active",
        gmatScore: 680,
        experience: "5 years",
        specialization: "Marketing",
        appliedDate: "2024-01-14",
        currentStage: "shortlisted",
        initials: "MC",
        initialsColor: "bg-emerald-500",
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        applicationId: "APP-2024-003",
        status: "accepted",
        gmatScore: 750,
        experience: "4 years",
        specialization: "Operations",
        appliedDate: "2024-01-13",
        currentStage: "offered",
        initials: "ER",
        initialsColor: "bg-orange-500",
    },
    {
        id: "4",
        name: "David Kim",
        applicationId: "APP-2024-004",
        status: "new",
        gmatScore: 690,
        experience: "2 years",
        specialization: "HR",
        appliedDate: "2024-01-16",
        currentStage: "applied",
        initials: "DK",
        initialsColor: "bg-blue-500",
    },
];

const Admissions = () => {
    const [applicants] = useState<Applicant[]>(initialApplicants);
    const [specialization, setSpecialization] = useState("All Specializations");
    const [stage, setStage] = useState("All Stages");
    const [gmatScore, setGmatScore] = useState("GMAT Score");
    const [sortBy, setSortBy] = useState("Application Date");

    const handleClearFilters = () => {
        setSpecialization("All Specializations");
        setStage("All Stages");
        setGmatScore("GMAT Score");
        setSortBy("Application Date");
        toast({
            title: "Filters Cleared",
            description: "All filters have been reset.",
        });
    };

    const filteredApplicants = applicants.filter((applicant) => {
        const matchesSpecialization =
            specialization === "All Specializations" || applicant.specialization === specialization;
        const matchesStage =
            stage === "All Stages" || applicant.currentStage.toLowerCase() === stage.toLowerCase();
        return matchesSpecialization && matchesStage;
    });

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Admissions Pipeline</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Track and manage student applications
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="bg-red-500 text-white border-red-500 hover:bg-red-600"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Mail className="w-4 h-4 mr-2" />
                        Bulk Email
                    </Button>
                </div>
            </div>

            {/* Funnel */}
            <AdmissionFunnel data={funnelData} />

            {/* Filters */}
            <AdmissionsFilters
                specialization={specialization}
                stage={stage}
                gmatScore={gmatScore}
                sortBy={sortBy}
                onSpecializationChange={setSpecialization}
                onStageChange={setStage}
                onGmatScoreChange={setGmatScore}
                onSortByChange={setSortBy}
                onClearFilters={handleClearFilters}
            />

            {/* Applicant Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredApplicants.map((applicant) => (
                    <ApplicantCard
                        key={applicant.id}
                        applicant={applicant}
                        onViewProfile={() =>
                            toast({ title: "View Profile", description: `Viewing ${applicant.name}'s profile` })
                        }
                        onSchedule={() =>
                            toast({ title: "Schedule", description: `Scheduling meeting with ${applicant.name}` })
                        }
                        onEmail={() =>
                            toast({ title: "Email", description: `Sending email to ${applicant.name}` })
                        }
                    />
                ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
                <Button
                    variant="outline"
                    className="border-border"
                    onClick={() => toast({ title: "Load More", description: "Loading more applicants..." })}
                >
                    Load More Applicants
                </Button>
            </div>
        </div>
    );
};

export default Admissions;
