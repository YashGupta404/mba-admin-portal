import { FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Applicant {
    id: string;
    name: string;
    applicationId: string;
    gmatScore: number;
    experience: string;
    specialization: string;
    applied: string;
    currentStage: string;
    progress: number;
}

interface ApplicantCardProps {
    applicant: Applicant;
    onViewProfile: (id: string) => void;
}

const stageColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    active: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    shortlisted: "bg-blue-500/10 text-blue-700 border-blue-200",
    interviewed: "bg-orange-500/10 text-orange-700 border-orange-200",
    offered: "bg-purple-500/10 text-purple-700 border-purple-200",
    accepted: "bg-green-500/10 text-green-700 border-green-200",
    new: "bg-cyan-500/10 text-cyan-700 border-cyan-200",
};

const progressColors: Record<string, string> = {
    pending: "bg-yellow-500",
    active: "bg-emerald-500",
    shortlisted: "bg-blue-500",
    interviewed: "bg-orange-500",
    offered: "bg-purple-500",
    accepted: "bg-green-500",
    new: "bg-cyan-500",
};

const ApplicantCard = ({ applicant, onViewProfile }: ApplicantCardProps) => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const getAvatarColor = (name: string) => {
        const colors = [
            "bg-emerald-500",
            "bg-cyan-500",
            "bg-blue-500",
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Avatar className={`${getAvatarColor(applicant.name)} h-12 w-12`}>
                        <AvatarFallback className="text-white font-semibold text-lg">
                            {getInitials(applicant.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="font-semibold text-foreground">{applicant.name}</h4>
                        <p className="text-xs text-muted-foreground">
                            {applicant.applicationId}
                        </p>
                    </div>
                </div>
                <Badge
                    className={cn(
                        "border",
                        stageColors[applicant.currentStage.toLowerCase()] ||
                        stageColors.pending
                    )}
                >
                    {applicant.currentStage}
                </Badge>
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GMAT Score:</span>
                    <span className="font-semibold text-foreground">
                        {applicant.gmatScore}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium text-foreground">
                        {applicant.experience}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Specialization:</span>
                    <span className="font-medium text-foreground">
                        {applicant.specialization}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Applied:</span>
                    <span className="font-medium text-foreground">
                        {applicant.applied}
                    </span>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Current Stage:</span>
                    <span className="font-medium">{applicant.currentStage}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                    <div
                        className={cn(
                            "h-2 rounded-full transition-all",
                            progressColors[applicant.currentStage.toLowerCase()] ||
                            progressColors.pending
                        )}
                        style={{ width: `${applicant.progress}%` }}
                    />
                </div>
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => onViewProfile(applicant.id)}
                >
                    <FileText className="w-4 h-4" />
                    View Profile
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-orange-600 border-orange-200 hover:bg-orange-50"
                >
                    <Mail className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default ApplicantCard;
