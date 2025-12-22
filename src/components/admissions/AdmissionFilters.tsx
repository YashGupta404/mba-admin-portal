import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AdmissionFiltersProps {
    specialization: string;
    stage: string;
    gmatScore: string;
    sortBy: string;
    onSpecializationChange: (value: string) => void;
    onStageChange: (value: string) => void;
    onGmatScoreChange: (value: string) => void;
    onSortByChange: (value: string) => void;
}

const AdmissionFilters = ({
    specialization,
    stage,
    gmatScore,
    sortBy,
    onSpecializationChange,
    onStageChange,
    onGmatScoreChange,
    onSortByChange,
}: AdmissionFiltersProps) => {
    return (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border border-border">
            <Select value={specialization} onValueChange={onSpecializationChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
            </Select>

            <Select value={stage} onValueChange={onStageChange}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interviewed">Interviewed</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                </SelectContent>
            </Select>

            <Select value={gmatScore} onValueChange={onGmatScoreChange}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="GMAT Score" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="700+">700+</SelectItem>
                    <SelectItem value="650-699">650-699</SelectItem>
                    <SelectItem value="600-649">600-649</SelectItem>
                    <SelectItem value="below-600">Below 600</SelectItem>
                </SelectContent>
            </Select>

            <Button variant="link" className="text-primary">
                Clear Filters
            </Button>

            <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={onSortByChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Application Date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date">Application Date</SelectItem>
                        <SelectItem value="gmat">GMAT Score</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="experience">Experience</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default AdmissionFilters;
