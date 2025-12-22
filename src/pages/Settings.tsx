import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
    const [notifications, setNotifications] = useState({
        newApplications: true,
        courseUpdates: true,
        systemAlerts: true,
        weeklyReports: false,
    });

    const [passwordPolicy, setPasswordPolicy] = useState({
        minLength: true,
        uppercase: true,
        numbers: true,
        specialChars: false,
    });

    const [sessionSettings, setSessionSettings] = useState({
        timeout: "30",
        forceLogout: true,
    });

    const handleSaveChanges = () => {
        toast({
            title: "Settings Saved",
            description: "Your settings have been updated successfully.",
        });
    };

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
            <Tabs defaultValue="general" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="user-management">User Management</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    <TabsTrigger value="backup">Backup & Sync</TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Institution Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="institutionName">Institution Name</Label>
                                    <Input id="institutionName" defaultValue="MBA Institute" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website URL</Label>
                                    <Input
                                        id="website"
                                        type="url"
                                        defaultValue="https://mba-institute.edu"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Contact Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        defaultValue="admin@mba-institute.edu"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <textarea
                                    id="address"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none"
                                    defaultValue="123 Education Street, Academic City, AC 12345"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Academic Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="academicYear">Academic Year</Label>
                                    <Select defaultValue="2024-2025">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2024-2025">2024-2025</SelectItem>
                                            <SelectItem value="2023-2024">2023-2024</SelectItem>
                                            <SelectItem value="2025-2026">2025-2026</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Default Currency</Label>
                                    <Select defaultValue="usd">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="usd">USD ($)</SelectItem>
                                            <SelectItem value="eur">EUR (€)</SelectItem>
                                            <SelectItem value="gbp">GBP (£)</SelectItem>
                                            <SelectItem value="inr">INR (₹)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Time Zone</Label>
                                    <Select defaultValue="utc-5">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc-5">UTC-5 (Eastern Time)</SelectItem>
                                            <SelectItem value="utc-8">UTC-8 (Pacific Time)</SelectItem>
                                            <SelectItem value="utc-6">UTC-6 (Central Time)</SelectItem>
                                            <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Select defaultValue="english">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="english">English</SelectItem>
                                            <SelectItem value="spanish">Spanish</SelectItem>
                                            <SelectItem value="french">French</SelectItem>
                                            <SelectItem value="german">German</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* User Management Tab */}
                <TabsContent value="user-management" className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">User Roles & Permissions</h3>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            + Add User
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Super Admin */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Super Admin</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Full system access and control
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-emerald-600">✓</span>
                                        <span>All permissions</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-emerald-600">✓</span>
                                        <span>User management</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-emerald-600">✓</span>
                                        <span>System settings</span>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground pt-2">
                                    2 users assigned
                                </p>
                            </CardContent>
                        </Card>

                        {/* Admin */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Admin</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Manage courses and faculty
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-emerald-600">✓</span>
                                        <span>Course management</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-emerald-600">✓</span>
                                        <span>Faculty management</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-emerald-600">✓</span>
                                        <span>System settings</span>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground pt-2">
                                    5 users assigned
                                </p>
                            </CardContent>
                        </Card>

                        {/* Faculty */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Faculty</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Manage assigned courses only
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-emerald-600">✓</span>
                                        <span>View courses</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-emerald-600">✓</span>
                                        <span>Update content</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-emerald-600">✓</span>
                                        <span>User management</span>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground pt-2">
                                    156 users assigned
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-foreground">New Applications</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified when new students apply
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.newApplications}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, newApplications: checked })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-foreground">Course Updates</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Notifications for course modifications
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.courseUpdates}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, courseUpdates: checked })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-foreground">System Alerts</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Important system notifications
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.systemAlerts}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, systemAlerts: checked })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-foreground">Weekly Reports</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Automated weekly summary reports
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.weeklyReports}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, weeklyReports: checked })
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="font-semibold mb-4">Password Policy</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="minLength"
                                            checked={passwordPolicy.minLength}
                                            onCheckedChange={(checked) =>
                                                setPasswordPolicy({
                                                    ...passwordPolicy,
                                                    minLength: checked as boolean,
                                                })
                                            }
                                        />
                                        <label htmlFor="minLength" className="text-sm">
                                            Minimum 8 characters
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="uppercase"
                                            checked={passwordPolicy.uppercase}
                                            onCheckedChange={(checked) =>
                                                setPasswordPolicy({
                                                    ...passwordPolicy,
                                                    uppercase: checked as boolean,
                                                })
                                            }
                                        />
                                        <label htmlFor="uppercase" className="text-sm">
                                            Require uppercase letters
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="numbers"
                                            checked={passwordPolicy.numbers}
                                            onCheckedChange={(checked) =>
                                                setPasswordPolicy({
                                                    ...passwordPolicy,
                                                    numbers: checked as boolean,
                                                })
                                            }
                                        />
                                        <label htmlFor="numbers" className="text-sm">
                                            Require numbers
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="specialChars"
                                            checked={passwordPolicy.specialChars}
                                            onCheckedChange={(checked) =>
                                                setPasswordPolicy({
                                                    ...passwordPolicy,
                                                    specialChars: checked as boolean,
                                                })
                                            }
                                        />
                                        <label htmlFor="specialChars" className="text-sm">
                                            Require special characters
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-4">Session Management</h4>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="sessionTimeout">Session Timeout</Label>
                                        <Select
                                            value={sessionSettings.timeout}
                                            onValueChange={(value) =>
                                                setSessionSettings({ ...sessionSettings, timeout: value })
                                            }
                                        >
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="15">15 minutes</SelectItem>
                                                <SelectItem value="30">30 minutes</SelectItem>
                                                <SelectItem value="60">1 hour</SelectItem>
                                                <SelectItem value="120">2 hours</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="forceLogout"
                                            checked={sessionSettings.forceLogout}
                                            onCheckedChange={(checked) =>
                                                setSessionSettings({
                                                    ...sessionSettings,
                                                    forceLogout: checked as boolean,
                                                })
                                            }
                                        />
                                        <label htmlFor="forceLogout" className="text-sm">
                                            Force logout on browser close
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Integrations Tab */}
                <TabsContent value="integrations" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Third-party Integrations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                                        <span className="text-white text-xl">📧</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">Email Service</h4>
                                        <p className="text-sm text-muted-foreground">
                                            SMTP configuration
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                                        Connected
                                    </Badge>
                                    <Button variant="outline" size="sm">
                                        Configure
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                                        <span className="text-white text-xl">☁️</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">Cloud Storage</h4>
                                        <p className="text-sm text-muted-foreground">
                                            File backup service
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-gray-500/10 text-gray-700 border-gray-200">
                                        Not Connected
                                    </Badge>
                                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
                                        Connect
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Backup & Sync Tab */}
                <TabsContent value="backup" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Backup & Synchronization</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 bg-emerald-500/10 border border-emerald-200 rounded-lg">
                                <h4 className="font-semibold text-emerald-700 mb-1">
                                    Real-time Sync Active
                                </h4>
                                <p className="text-sm text-emerald-600">
                                    All changes are automatically synchronized
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-4">Backup Schedule</h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="frequency">Frequency</Label>
                                            <Select defaultValue="daily">
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="hourly">Hourly</SelectItem>
                                                    <SelectItem value="daily">Daily</SelectItem>
                                                    <SelectItem value="weekly">Weekly</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="time">Time</Label>
                                            <Input id="time" type="time" defaultValue="02:00" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-4">Recent Backups</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">2024-01-16 02:00</span>
                                            <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                                                Success
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">2024-01-15 02:00</span>
                                            <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                                                Success
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">2024-01-14 02:00</span>
                                            <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                                                Success
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSaveChanges}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                >
                    <Save className="w-4 h-4" />
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default Settings;
