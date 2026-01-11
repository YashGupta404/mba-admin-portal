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
  sort,
  source,
  searchQuery,
  onStatusChange,
  onsortChange,
  onSourceChange,
  onSearchChange,

}) => {
  

  return (
    <div className="flex flex-col gap-3 p-3 sm:p-4 bg-card rounded-lg border border-border">
      {/* Search - Full width on mobile, at top for better UX */}
      <form className="relative w-full order-first sm:order-none">
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
          className="w-full pl-9 text-xs sm:text-sm"
        />
      </form>

      {/* Filters - Grid on mobile, flex row on desktop */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-2 sm:gap-4">
        {/* Status Filter */}
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full text-xs sm:text-sm sm:w-[150px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="responded">Responded</SelectItem>
          </SelectContent>
        </Select>

        {/* sort Filter */}
        <Select value={sort} onValueChange={onsortChange}>
          <SelectTrigger className="w-full text-xs sm:text-sm sm:w-[150px]">
            <SelectValue placeholder="All sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sort</SelectItem>
            <SelectItem value="datenewest">Date: Newest</SelectItem>
            <SelectItem value="dateoldest">Date: Oldest</SelectItem>
          </SelectContent>
        </Select>

        {/* Source Filter */}
        {/* <Select value={source} onValueChange={onSourceChange}>
          <SelectTrigger className="w-full text-xs sm:text-sm sm:w-[150px]">
            <SelectValue placeholder="All Sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="social-media">Social Media</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
    </div>
  );
};

export default EnquiryFilters;
