import { Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EventCalendar = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Event Calendar</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <button className="hover:text-foreground">←</button>
                        <span className="font-medium">January 2024</span>
                        <button className="hover:text-foreground">→</button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                    <CalendarIcon className="w-16 h-16 text-muted-foreground mb-4" />
                    <h4 className="font-semibold text-foreground mb-1">
                        Interactive Calendar
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Click dates to view/add events
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default EventCalendar;
