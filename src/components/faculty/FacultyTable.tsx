import { useState } from "react";
import { Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  courses: number;
  papers: number;
  rating: number;
  status: "active" | "inactive";
  experience: string;
  qualification: string;
}

interface FacultyTableProps {
  faculty: Faculty[];
  onEdit: (faculty: Faculty) => void;
  onDelete: (id: string) => void;
}

const FacultyTable = ({ faculty, onEdit, onDelete }: FacultyTableProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(
      selectedIds.length === faculty.length ? [] : faculty.map((f) => f.id)
    );
  };

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
      "bg-teal-500",
      "bg-green-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedIds.length === faculty.length}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>FACULTY</TableHead>
            <TableHead>DEPARTMENT</TableHead>
            <TableHead>COURSES</TableHead>
            <TableHead>PAPERS</TableHead>
            <TableHead>RATING</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead className="text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faculty.map((member) => (
            <TableRow key={member.id} className="hover:bg-muted/30">
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(member.id)}
                  onCheckedChange={() => toggleSelect(member.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className={`${getAvatarColor(member.name)} h-10 w-10`}>
                    <AvatarFallback className="text-white font-semibold">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">
                      {member.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {member.email}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {member.qualification} • {member.experience}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {member.department}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {member.courses}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {member.papers}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-foreground">
                    {member.rating}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(member.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={member.status === "active" ? "default" : "secondary"}
                  className={
                    member.status === "active"
                      ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                      : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                  }
                >
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => onEdit(member)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                    onClick={() => onDelete(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FacultyTable;
