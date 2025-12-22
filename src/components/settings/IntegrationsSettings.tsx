import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Calendar, Database } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Integration {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    enabled: boolean;
    apiKey?: string;
}

const IntegrationsSettings = () => {
    const [integrations, setIntegrations] = useState<Integration[]>([
        {
            id: "email",
            name: "Email Service",
            description: "SMTP integration for email notifications",
            icon: <Mail className="w-5 h-5 text-blue-600" />,
            enabled: true,
            apiKey: "smtp-key-****-****-****",
        },
        {
            id: "slack",
            name: "Slack",
            description: "Team communication and notifications",
            icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
            enabled: false,
        },
        {
            id: "calendar",
            name: "Google Calendar",
            description: "Sync events and schedules",
            icon: <Calendar className="w-5 h-5 text-emerald-600" />,
            enabled: true,
            apiKey: "gcal-key-****-****-****",
        },
        {
            id: "storage",
            name: "Cloud Storage",
            description: "AWS S3 for file storage",
            icon: <Database className="w-5 h-5 text-orange-600" />,
            enabled: true,
            apiKey: "aws-key-****-****-****",
        },
    ]);

    const handleToggle = (id: string) => {
        setIntegrations(
            integrations.map((integration) =>
                integration.id === id ? { ...integration, enabled: !integration.enabled } : integration
            )
        );
    };

    const handleSaveChanges = () => {
        toast({
            title: "Integrations Updated",
            description: "Your integration settings have been saved.",
        });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Integrations</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                    <div
                        key={integration.id}
                        className="p-4 bg-card rounded-lg border border-border"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                    {integration.icon}
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">{integration.name}</h4>
                                    <p className="text-xs text-muted-foreground">{integration.description}</p>
                                </div>
                            </div>
                            <Switch
                                checked={integration.enabled}
                                onCheckedChange={() => handleToggle(integration.id)}
                            />
                        </div>
                        {integration.enabled && integration.apiKey && (
                            <div className="space-y-2 mt-3 pt-3 border-t border-border">
                                <Label className="text-xs text-muted-foreground">API Key</Label>
                                <Input
                                    value={integration.apiKey}
                                    readOnly
                                    className="bg-background border-border text-sm"
                                />
                            </div>
                        )}
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

export default IntegrationsSettings;
