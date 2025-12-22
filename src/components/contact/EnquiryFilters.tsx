import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const EnquiryFilters = ({
  status,
  priority,
  source,
  searchQuery,
  onStatusChange,
  onPriorityChange,
  onSourceChange,
  onSearchChange,

}) => {
  

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border border-border">
      {/* Status Filter */}
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

      {/* Priority Filter */}
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

      {/* Source Filter */}
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

      {/* Search */}
      <form className="relative flex-1 min-w-[250px]">
        <button
          type="submit"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-auto h-auto text-muted-foreground"
        >
          <Search className="h-4 w-4" />
        </button>
        <Input
          placeholder="Search enquiries..."
          name="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </form>
    </div>
  );
};

export default EnquiryFilters;
