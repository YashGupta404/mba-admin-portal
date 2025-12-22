import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Users, Bell, Shield, Plug, Cloud } from "lucide-react";
import GeneralSettings from "@/components/settings/GeneralSettings";
import UserManagement from "@/components/settings/UserManagement";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import IntegrationsSettings from "@/components/settings/IntegrationsSettings";
import BackupSyncSettings from "@/components/settings/BackupSyncSettings";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage your institution's configuration and preferences
                </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-muted p-1 h-auto flex-wrap justify-start gap-1">
                    <TabsTrigger
                        value="general"
                        className="data-[state=active]:bg-background flex items-center gap-2"
                    >
                        <SettingsIcon className="w-4 h-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger
                        value="users"
                        className="data-[state=active]:bg-background flex items-center gap-2"
                    >
                        <Users className="w-4 h-4" />
                        User Management
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="data-[state=active]:bg-background flex items-center gap-2"
                    >
                        <Bell className="w-4 h-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="data-[state=active]:bg-background flex items-center gap-2"
                    >
                        <Shield className="w-4 h-4" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger
                        value="integrations"
                        className="data-[state=active]:bg-background flex items-center gap-2"
                    >
                        <Plug className="w-4 h-4" />
                        Integrations
                    </TabsTrigger>
                    <TabsTrigger
                        value="backup"
                        className="data-[state=active]:bg-background flex items-center gap-2"
                    >
                        <Cloud className="w-4 h-4" />
                        Backup & Sync
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6">
                    <GeneralSettings />
                </TabsContent>

                <TabsContent value="users" className="mt-6">
                    <UserManagement />
                </TabsContent>

                <TabsContent value="notifications" className="mt-6">
                    <NotificationSettings />
                </TabsContent>

                <TabsContent value="security" className="mt-6">
                    <SecuritySettings />
                </TabsContent>

                <TabsContent value="integrations" className="mt-6">
                    <IntegrationsSettings />
                </TabsContent>

                <TabsContent value="backup" className="mt-6">
                    <BackupSyncSettings />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Settings;
