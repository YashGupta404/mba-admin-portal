import { Calendar, Users, Clock, MapPin, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    attendees: number;
    category: "academic" | "cultural" | "sports" | "career" | "networking" | "social";
    status: "upcoming" | "ongoing" | "completed" | "cancelled";
    image?: string;
    venue?: string;
}

interface EventCardProps {
    event: Event;
    onViewDetails: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const categoryColors: Record<string, string> = {
    academic: "bg-blue-500/10 text-blue-700 border-blue-200",
    cultural: "bg-purple-500/10 text-purple-700 border-purple-200",
    sports: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    career: "bg-orange-500/10 text-orange-700 border-orange-200",
    networking: "bg-pink-500/10 text-pink-700 border-pink-200",
    social: "bg-red-500/10 text-red-700 border-red-200",
};

const statusColors: Record<string, string> = {
    upcoming: "bg-emerald-500 text-white",
    ongoing: "bg-yellow-500 text-white",
    completed: "bg-gray-500 text-white",
    cancelled: "bg-red-500 text-white",
};

const EventCard = ({ event, onViewDetails, onEdit, onDelete }: EventCardProps) => {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Event Image */}
            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-gray-400" />
                    </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className={cn("border", categoryColors[event.category])}>
                        {event.category}
                    </Badge>
                    <Badge className={statusColors[event.status]}>
                        {event.status}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-5">
                <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
                    {event.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {event.description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                    </div>
                    {event.venue && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{event.venue}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attendees</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        onClick={() => onViewDetails(event.id)}
                    >
                        View Details
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 text-blue-600 hover:bg-blue-50"
                        onClick={() => onEdit(event.id)}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 text-red-600 hover:bg-red-50"
                        onClick={() => onDelete(event.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default EventCard;
