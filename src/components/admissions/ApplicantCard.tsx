import { Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface Applicant {
    id: string;
    name: string;
    applicationId: string;
    status: "pending" | "active" | "accepted" | "new";
    gmatScore: number;
    experience: string;
    specialization: string;
    appliedDate: string;
    currentStage: "applied" | "shortlisted" | "interviewed" | "offered" | "enrolled";
    initials: string;
    initialsColor: string;
}

interface ApplicantCardProps {
    applicant: Applicant;
    onViewProfile?: () => void;
    onSchedule?: () => void;
    onEmail?: () => void;
}

const stageProgress: Record<string, number> = {
    applied: 20,
    shortlisted: 40,
    interviewed: 60,
    offered: 80,
    enrolled: 100,
};

const stageColors: Record<string, string> = {
    applied: "bg-emerald-500",
    shortlisted: "bg-blue-500",
    interviewed: "bg-red-500",
    offered: "bg-orange-500",
    enrolled: "bg-emerald-500",
};

const statusStyles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    active: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    accepted: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    new: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

const ApplicantCard = ({ applicant, onViewProfile, onSchedule, onEmail }: ApplicantCardProps) => {
    return (
        <div className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-full ${applicant.initialsColor} flex items-center justify-center text-white text-sm font-semibold`}
                    >
                        {applicant.initials}
                    </div>
                    <div>
                        <p className="font-medium text-foreground">{applicant.name}</p>
                        <p className="text-xs text-muted-foreground">{applicant.applicationId}</p>
                    </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[applicant.status]}`}>
                    {applicant.status}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-2.5 text-sm mb-4">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">GMAT Score:</span>
                    <span className="text-foreground font-medium">{applicant.gmatScore}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="text-foreground font-medium">{applicant.experience}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Specialization:</span>
                    <span className="text-foreground font-medium">{applicant.specialization}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Applied:</span>
                    <span className="text-foreground font-medium">{applicant.appliedDate}</span>
                </div>
            </div>

            {/* Current Stage */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Current Stage:</span>
                    <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${applicant.currentStage === "enrolled" || applicant.currentStage === "offered"
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                : applicant.currentStage === "shortlisted"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    : applicant.currentStage === "interviewed"
                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            }`}
                    >
                        {applicant.currentStage}
                    </span>
                </div>
                <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                        className={`absolute left-0 top-0 h-full rounded-full transition-all ${stageColors[applicant.currentStage]}`}
                        style={{ width: `${stageProgress[applicant.currentStage]}%` }}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-primary border-primary hover:bg-primary/10"
                    onClick={onViewProfile}
                >
                    View Profile
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={onSchedule}
                >
                    <Calendar className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={onEmail}
                >
                    <Mail className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default ApplicantCard;
