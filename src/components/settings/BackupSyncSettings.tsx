import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Cloud, Download, Upload, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BackupSyncSettings = () => {
    const [backupFrequency, setBackupFrequency] = useState("Daily");
    const [retentionPeriod, setRetentionPeriod] = useState("30 days");

    const handleBackupNow = () => {
        toast({
            title: "Backup Started",
            description: "Creating a full system backup...",
        });
    };

    const handleRestore = () => {
        toast({
            title: "Restore",
            description: "Opening restore options...",
        });
    };

    const handleSaveChanges = () => {
        toast({
            title: "Backup Settings Saved",
            description: "Your backup preferences have been updated.",
        });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Backup & Sync</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Automatic Backups */}
                <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Cloud className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground">Automatic Backups</h4>
                            <p className="text-xs text-muted-foreground">Scheduled backup frequency</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm text-foreground">Backup Frequency</Label>
                        <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                            <SelectTrigger className="bg-background border-border">
                                <SelectValue placeholder="Select Frequency" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                                <SelectItem value="Hourly">Hourly</SelectItem>
                                <SelectItem value="Daily">Daily</SelectItem>
                                <SelectItem value="Weekly">Weekly</SelectItem>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Retention Period */}
                <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground">Retention Period</h4>
                            <p className="text-xs text-muted-foreground">How long to keep backups</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm text-foreground">Keep Backups For</Label>
                        <Select value={retentionPeriod} onValueChange={setRetentionPeriod}>
                            <SelectTrigger className="bg-background border-border">
                                <SelectValue placeholder="Select Period" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                                <SelectItem value="7 days">7 days</SelectItem>
                                <SelectItem value="30 days">30 days</SelectItem>
                                <SelectItem value="90 days">90 days</SelectItem>
                                <SelectItem value="1 year">1 year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Manual Backup Actions */}
            <div className="p-4 bg-card rounded-lg border border-border">
                <h4 className="font-medium text-foreground mb-4">Manual Actions</h4>
                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={handleBackupNow}
                        variant="outline"
                        className="border-border"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Backup Now
                    </Button>
                    <Button
                        onClick={handleRestore}
                        variant="outline"
                        className="border-border"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Restore from Backup
                    </Button>
                </div>
            </div>

            {/* Last Backup Info */}
            <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-foreground">Last Backup</p>
                        <p className="text-xs text-muted-foreground">December 17, 2025 at 3:00 AM</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-foreground">Backup Size</p>
                        <p className="text-xs text-muted-foreground">2.4 GB</p>
                    </div>
                </div>
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

export default BackupSyncSettings;
