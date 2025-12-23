import { GraduationCap, Users, Clock, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Programme {
    id: string;
    name: string;
    description: string;
    duration: string;
    students: number;
    courses: number;
    color: string;
    iconBg: string;
}

interface ProgrammeCardProps {
    programme: Programme;
    onEdit: (id: string) => void;
}

const ProgrammeCard = ({ programme, onEdit }: ProgrammeCardProps) => {
    return (
        <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 group">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", programme.iconBg)}>
                    <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(programme.id)}
                    className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground hover:bg-primary/90 border-0"
                >
                    <Edit className="w-4 h-4" />
                    Edit
                </Button>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground mb-2">{programme.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">{programme.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Clock className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{programme.duration}</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Users className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{programme.students}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <GraduationCap className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{programme.courses}</p>
                    <p className="text-xs text-muted-foreground">Courses</p>
                </div>
            </div>
        </div>
    );
};

export default ProgrammeCard;
