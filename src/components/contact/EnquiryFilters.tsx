import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface EnquiryFiltersProps {
    status: string;
    priority: string;
    source: string;
    searchQuery: string;
    onStatusChange: (value: string) => void;
    onPriorityChange: (value: string) => void;
    onSourceChange: (value: string) => void;
    onSearchChange: (value: string) => void;
}

const EnquiryFilters = ({
    status,
    priority,
    source,
    searchQuery,
    onStatusChange,
    onPriorityChange,
    onSourceChange,
    onSearchChange,
}: EnquiryFiltersProps) => {
    return (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border border-border">
            <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                </SelectContent>
            </Select>

            <Select value={priority} onValueChange={onPriorityChange}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                </SelectContent>
            </Select>

            <Select value={source} onValueChange={onSourceChange}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                </SelectContent>
            </Select>

            <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search enquiries..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9"
                />
            </div>
        </div>
    );
};

export default EnquiryFilters;
