import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCalendar from "@/components/student-life/EventCalendar";
import EventCategories from "@/components/student-life/EventCategories";
import EventCard, { Event } from "@/components/student-life/EventCard";
import CreateEventModal, {
    EventFormData,
} from "@/components/student-life/CreateEventModal";
import { toast } from "@/hooks/use-toast";

const initialEvents: Event[] = [
    {
        id: "1",
        title: "Annual Business Fest",
        description:
            "Three-day business festival with competitions and workshops",
        date: "2024-01-20",
        time: "09:00 AM",
        attendees: 450,
        category: "cultural",
        status: "upcoming",
        location: "Main Auditorium",
    },
    {
        id: "2",
        title: "Guest Lecture: Digital Transformation",
        description: "Industry expert shares insights on digital transformation strategies",
        date: "2024-01-18",
        time: "02:00 PM",
        attendees: 120,
        category: "academic",
        status: "upcoming",
        location: "Lecture Hall 3",
    },
    {
        id: "3",
        title: "Sports Tournament",
        description: "Inter-batch cricket and football tournament",
        date: "2024-01-22",
        time: "10:00 AM",
        attendees: 200,
        category: "sports",
        status: "upcoming",
        location: "Sports Complex",
    },
    {
        id: "4",
        title: "Career Fair 2024",
        description: "Meet recruiters from top companies",
        date: "2024-01-25",
        time: "09:00 AM",
        attendees: 300,
        category: "career",
        status: "upcoming",
        location: "Convention Center",
    },
    {
        id: "5",
        title: "Alumni Networking Night",
        description: "Connect with successful alumni and expand your network",
        date: "2024-01-28",
        time: "06:00 PM",
        attendees: 150,
        category: "networking",
        status: "upcoming",
        location: "Rooftop Lounge",
    },
    {
        id: "6",
        title: "Cultural Evening",
        description: "Celebrate diversity with music, dance, and food",
        date: "2024-01-15",
        time: "05:00 PM",
        attendees: 250,
        category: "cultural",
        status: "upcoming",
        location: "Open Air Theatre",
    },
];

const StudentLife = () => {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const handleCreateEvent = (data: EventFormData) => {
        const newEvent: Event = {
            id: Date.now().toString(),
            title: data.title,
            description: data.description,
            date: data.date,
            time: data.time,
            attendees: parseInt(data.expectedAttendees) || 0,
            category: data.category as Event["category"],
            status: "upcoming",
            location: data.location,
        };
        setEvents([newEvent, ...events]);
        toast({
            title: "Event Created",
            description: `${data.title} has been added successfully.`,
        });
    };

    const handleViewDetails = (id: string) => {
        const event = events.find((e) => e.id === id);
        toast({
            title: "View Event Details",
            description: `Opening details for ${event?.title}`,
        });
    };

    const handleEditEvent = (id: string) => {
        const event = events.find((e) => e.id === id);
        toast({
            title: "Edit Event",
            description: `Editing ${event?.title}`,
        });
    };

    const handleDeleteEvent = (id: string) => {
        const event = events.find((e) => e.id === id);
        setEvents(events.filter((e) => e.id !== id));
        toast({
            title: "Event Deleted",
            description: `${event?.title} has been removed.`,
            variant: "destructive",
        });
    };

    const filteredEvents =
        selectedCategory === "all"
            ? events
            : events.filter((e) => e.category === selectedCategory);

    const categoryCounts = {
        all: events.length,
        academic: events.filter((e) => e.category === "academic").length,
        cultural: events.filter((e) => e.category === "cultural").length,
        sports: events.filter((e) => e.category === "sports").length,
        career: events.filter((e) => e.category === "career").length,
        networking: events.filter((e) => e.category === "networking").length,
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Student Life & Events
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage campus events and student activities
                    </p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Event
                </Button>
            </div>

            {/* Event Calendar */}
            <EventCalendar />

            {/* Event Categories */}
            <EventCategories
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categoryCounts={categoryCounts}
            />

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onViewDetails={handleViewDetails}
                        onEdit={handleEditEvent}
                        onDelete={handleDeleteEvent}
                    />
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <p className="text-muted-foreground">No events found in this category</p>
                </div>
            )}

            {/* Create Event Modal */}
            <CreateEventModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleCreateEvent}
            />
        </div>
    );
};

export default StudentLife;
