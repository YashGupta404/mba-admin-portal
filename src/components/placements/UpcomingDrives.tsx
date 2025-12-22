import { Calendar, Briefcase, Users, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PlacementDrive {
    id: string;
    company: string;
    date: string;
    roles: string[];
    registrations: number;
    status: "upcoming" | "today" | "completed";
    companyColor: string;
}

interface PlacementDriveCardProps {
    drive: PlacementDrive;
    onViewDetails: (id: string) => void;
    onEdit: (id: string) => void;
}

const statusColors: Record<string, string> = {
    upcoming: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    today: "bg-orange-500/10 text-orange-700 border-orange-200",
    completed: "bg-gray-500/10 text-gray-700 border-gray-200",
};

const PlacementDriveCard = ({
    drive,
    onViewDetails,
    onEdit,
}: PlacementDriveCardProps) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div
                            className={cn(
                                "w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg font-bold",
                                drive.companyColor
                            )}
                        >
                            {drive.company.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">{drive.company}</h4>
                            <Badge className={cn("border text-xs mt-1", statusColors[drive.status])}>
                                {drive.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{drive.date}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Briefcase className="w-4 h-4 mt-0.5" />
                        <span>{drive.roles.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{drive.registrations} registrations</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        onClick={() => onViewDetails(drive.id)}
                    >
                        View Details
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 text-blue-600 hover:bg-blue-50"
                        onClick={() => onEdit(drive.id)}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

interface UpcomingDrivesProps {
    drives: PlacementDrive[];
    onViewDetails: (id: string) => void;
    onEdit: (id: string) => void;
    onScheduleNew?: () => void;
}

const UpcomingDrives = ({
    drives,
    onViewDetails,
    onEdit,
    onScheduleNew,
}: UpcomingDrivesProps) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                    Upcoming Placement Drives
                </h3>
                <select className="text-sm border border-border rounded-md px-3 py-1.5 bg-background">
                    <option>This Month</option>
                    <option>Next Month</option>
                    <option>This Quarter</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drives.map((drive) => (
                    <PlacementDriveCard
                        key={drive.id}
                        drive={drive}
                        onViewDetails={onViewDetails}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default UpcomingDrives;
