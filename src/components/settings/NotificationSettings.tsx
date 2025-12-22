import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
}

const NotificationSettings = () => {
    const [notifications, setNotifications] = useState<NotificationSetting[]>([
        {
            id: "new-applications",
            title: "New Applications",
            description: "Get notified when new students apply",
            enabled: true,
        },
        {
            id: "course-updates",
            title: "Course Updates",
            description: "Notifications for course modifications",
            enabled: true,
        },
        {
            id: "system-alerts",
            title: "System Alerts",
            description: "Important system notifications",
            enabled: true,
        },
        {
            id: "weekly-reports",
            title: "Weekly Reports",
            description: "Automated weekly summary reports",
            enabled: false,
        },
    ]);

    const handleToggle = (id: string) => {
        setNotifications(
            notifications.map((notif) =>
                notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
            )
        );
    };

    const handleSaveChanges = () => {
        toast({
            title: "Notification Preferences Saved",
            description: "Your notification settings have been updated.",
        });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>

            <div className="space-y-4">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
                    >
                        <div className="flex-1">
                            <h4 className="font-medium text-foreground mb-1">{notif.title}</h4>
                            <p className="text-sm text-muted-foreground">{notif.description}</p>
                        </div>
                        <Switch
                            checked={notif.enabled}
                            onCheckedChange={() => handleToggle(notif.id)}
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={handleSaveChanges}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default NotificationSettings;
