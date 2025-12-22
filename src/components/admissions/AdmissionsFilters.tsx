import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AdmissionsFiltersProps {
    specialization: string;
    stage: string;
    gmatScore: string;
    sortBy: string;
    onSpecializationChange: (value: string) => void;
    onStageChange: (value: string) => void;
    onGmatScoreChange: (value: string) => void;
    onSortByChange: (value: string) => void;
    onClearFilters: () => void;
}

const specializations = ["All Specializations", "Finance", "Marketing", "Operations", "HR", "Strategy"];
const stages = ["All Stages", "Applied", "Shortlisted", "Interviewed", "Offered", "Enrolled"];
const gmatScores = ["GMAT Score", "700+", "650-699", "600-649", "Below 600"];
const sortOptions = ["Application Date", "GMAT Score", "Name", "Experience"];

const AdmissionsFilters = ({
    specialization,
    stage,
    gmatScore,
    sortBy,
    onSpecializationChange,
    onStageChange,
    onGmatScoreChange,
    onSortByChange,
    onClearFilters,
}: AdmissionsFiltersProps) => {
    return (
        <div className="flex items-center gap-4 flex-wrap">
            <Select value={specialization} onValueChange={onSpecializationChange}>
                <SelectTrigger className="w-[180px] bg-background border-border">
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

            <Select value={stage} onValueChange={onStageChange}>
                <SelectTrigger className="w-[140px] bg-background border-border">
                    <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                    {stages.map((s) => (
                        <SelectItem key={s} value={s}>
                            {s}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={gmatScore} onValueChange={onGmatScoreChange}>
                <SelectTrigger className="w-[140px] bg-background border-border">
                    <SelectValue placeholder="GMAT Score" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                    {gmatScores.map((score) => (
                        <SelectItem key={score} value={score}>
                            {score}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button
                variant="link"
                className="text-primary px-0"
                onClick={onClearFilters}
            >
                Clear Filters
            </Button>

            <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={onSortByChange}>
                    <SelectTrigger className="w-[160px] bg-background border-border">
                        <SelectValue placeholder="Application Date" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                        {sortOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default AdmissionsFilters;
