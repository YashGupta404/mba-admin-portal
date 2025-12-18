import { Download, Filter, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface FacultyFiltersProps {
    department: string;
    status: string;
    experience: number[];
    onDepartmentChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onExperienceChange: (value: number[]) => void;
}

const FacultyFilters = ({
    department,
    status,
    experience,
    onDepartmentChange,
    onStatusChange,
    onExperienceChange,
}: FacultyFiltersProps) => {
    return (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border border-border">
            <Select value={department} onValueChange={onDepartmentChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
            </Select>

            <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
            </Select>

            <div className="flex items-center gap-3 flex-1 min-w-[250px]">
                <Label className="text-sm text-muted-foreground whitespace-nowrap">
                    Experience:
                </Label>
                <Slider
                    value={experience}
                    onValueChange={onExperienceChange}
                    max={20}
                    step={1}
                    className="flex-1"
                />
                <span className="text-sm font-medium text-foreground min-w-[80px]">
                    {experience[0]}-{experience[1]} years
                </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    More Filters
                </Button>
            </div>
        </div>
    );
};

export default FacultyFilters;
