import { useState } from "react";
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdmissionFunnel from "@/components/admissions/AdmissionFunnel";
import AdmissionFilters from "@/components/admissions/AdmissionFilters";
import ApplicantCard, { Applicant } from "@/components/admissions/ApplicantCard";
import { toast } from "@/hooks/use-toast";

const initialApplicants: Applicant[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        applicationId: "APP-2024-001",
        gmatScore: 720,
        experience: "3 years",
        specialization: "Finance",
        applied: "2024-01-15",
        currentStage: "pending",
        progress: 30,
    },
    {
        id: "2",
        name: "Michael Chen",
        applicationId: "APP-2024-002",
        gmatScore: 680,
        experience: "5 years",
        specialization: "Marketing",
        applied: "2024-01-14",
        currentStage: "active",
        progress: 50,
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        applicationId: "APP-2024-003",
        gmatScore: 750,
        experience: "4 years",
        specialization: "Operations",
        applied: "2024-01-13",
        currentStage: "accepted",
        progress: 100,
    },
    {
        id: "4",
        name: "David Kim",
        applicationId: "APP-2024-004",
        gmatScore: 690,
        experience: "2 years",
        specialization: "HR",
        applied: "2024-01-16",
        currentStage: "new",
        progress: 10,
    },
    {
        id: "5",
        name: "Jessica Lee",
        applicationId: "APP-2024-005",
        gmatScore: 710,
        experience: "6 years",
        specialization: "Finance",
        applied: "2024-01-12",
        currentStage: "shortlisted",
        progress: 60,
    },
    {
        id: "6",
        name: "Robert Taylor",
        applicationId: "APP-2024-006",
        gmatScore: 665,
        experience: "3 years",
        specialization: "Marketing",
        applied: "2024-01-11",
        currentStage: "interviewed",
        progress: 75,
    },
    {
        id: "7",
        name: "Amanda White",
        applicationId: "APP-2024-007",
        gmatScore: 730,
        experience: "7 years",
        specialization: "Operations",
        applied: "2024-01-10",
        currentStage: "offered",
        progress: 90,
    },
    {
        id: "8",
        name: "James Brown",
        applicationId: "APP-2024-008",
        gmatScore: 695,
        experience: "4 years",
        specialization: "Finance",
        applied: "2024-01-09",
        currentStage: "pending",
        progress: 25,
    },
];

const Admissions = () => {
    const [applicants] = useState<Applicant[]>(initialApplicants);
    const [specialization, setSpecialization] = useState("all");
    const [stage, setStage] = useState("all");
    const [gmatScore, setGmatScore] = useState("all");
    const [sortBy, setSortBy] = useState("date");

    const handleViewProfile = (id: string) => {
        const applicant = applicants.find((a) => a.id === id);
        toast({
            title: "View Profile",
            description: `Opening profile for ${applicant?.name}`,
        });
    };

    const filteredApplicants = applicants.filter((applicant) => {
        if (
            specialization !== "all" &&
            applicant.specialization.toLowerCase() !== specialization
        )
            return false;
        if (
            stage !== "all" &&
            applicant.currentStage.toLowerCase() !== stage
        )
            return false;
        if (gmatScore !== "all") {
            const score = applicant.gmatScore;
            if (gmatScore === "700+" && score < 700) return false;
            if (gmatScore === "650-699" && (score < 650 || score >= 700))
                return false;
            if (gmatScore === "600-649" && (score < 600 || score >= 650))
                return false;
            if (gmatScore === "below-600" && score >= 600) return false;
        }
        return true;
    });

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Admissions Pipeline
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Track and manage student applications
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export Data
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Mail className="w-4 h-4" />
                        Bulk Email
                    </Button>
                </div>
            </div>

            {/* Admission Funnel */}
            <AdmissionFunnel />

            {/* Filters */}
            <AdmissionFilters
                specialization={specialization}
                stage={stage}
                gmatScore={gmatScore}
                sortBy={sortBy}
                onSpecializationChange={setSpecialization}
                onStageChange={setStage}
                onGmatScoreChange={setGmatScore}
                onSortByChange={setSortBy}
            />

            {/* Applicants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredApplicants.map((applicant) => (
                    <ApplicantCard
                        key={applicant.id}
                        applicant={applicant}
                        onViewProfile={handleViewProfile}
                    />
                ))}
            </div>

            {/* Load More Button */}
            {filteredApplicants.length > 0 && (
                <div className="flex justify-center pt-4">
                    <Button variant="outline" className="w-full max-w-xs">
                        Load More Applicants
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Admissions;
