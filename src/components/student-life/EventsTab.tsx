import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCalendar from "./EventCalendar";
import EventCategories from "./EventCategories";
import EventCard, { Event } from "./EventCard";
import CreateEventModal, { EventFormData } from "./CreateEventModal";
import { toast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

const API_URL = API_BASE_URL;

const EventsTab = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);

    // Fetch events from API
    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/student-life`);
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            } else {
                toast({
                    title: "Error",
                    description: "Failed to fetch events",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            toast({
                title: "Error",
                description: "Failed to connect to server",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCreateEvent = async (data: EventFormData) => {
        try {
            const newId = Math.max(...events.map((e) => e.id), 0) + 1;
            const newEvent = {
                id: newId,
                title: data.title,
                description: data.description,
                category: data.category,
                date: data.date,
                time: data.time,
                venue: data.location,
                status: data.status || "upcoming",
                attendees: parseInt(data.expectedAttendees) || 0,
                image: data.image || "",
            };

            const response = await fetch(`${API_URL}/api/student-life`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                await fetchEvents();
                toast({
                    title: "Event Created",
                    description: `${data.title} has been added successfully.`,
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to create event",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error creating event:", error);
            toast({
                title: "Error",
                description: "Failed to create event",
                variant: "destructive",
            });
        }
    };

    const handleViewDetails = (id: number) => {
        const event = events.find((e) => e.id === id);
        toast({
            title: "View Event Details",
            description: `Opening details for ${event?.title}`,
        });
    };

    const handleEditEvent = (id: number) => {
        const event = events.find((e) => e.id === id);
        toast({
            title: "Edit Event",
            description: `Editing ${event?.title}`,
        });
    };

    const handleDeleteEvent = async (id: number) => {
        try {
            const event = events.find((e) => e.id === id);
            const response = await fetch(`${API_URL}/api/student-life/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchEvents();
                toast({
                    title: "Event Deleted",
                    description: `${event?.title} has been removed.`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to delete event",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            toast({
                title: "Error",
                description: "Failed to delete event",
                variant: "destructive",
            });
        }
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

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">Loading events...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-foreground">
                        Events & Activities
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage campus events and student activities
                    </p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Event
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
                    <p className="text-muted-foreground">
                        No events found in this category
                    </p>
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

export default EventsTab;
