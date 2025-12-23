import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsTab from "@/components/student-life/EventsTab";
import FacilitiesTab from "@/components/student-life/FacilitiesTab";

const StudentLife = () => {
    const [activeTab, setActiveTab] = useState("events");

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-foreground">
                    Student Life Management
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage campus events, activities, and facilities
                </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="events">Events & Activities</TabsTrigger>
                    <TabsTrigger value="facilities">Campus Facilities</TabsTrigger>
                </TabsList>

                <TabsContent value="events" className="mt-6">
                    <EventsTab />
                </TabsContent>

                <TabsContent value="facilities" className="mt-6">
                    <FacilitiesTab />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default StudentLife;
