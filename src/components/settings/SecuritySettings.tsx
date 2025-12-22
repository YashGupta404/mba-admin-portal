import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SecuritySettings = () => {
    const [twoFactorAuth, setTwoFactorAuth] = useState(true);
    const [sessionTimeout, setSessionTimeout] = useState("30");
    const [passwordExpiry, setPasswordExpiry] = useState("90");

    const handleSaveChanges = () => {
        toast({
            title: "Security Settings Saved",
            description: "Your security preferences have been updated.",
        });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>

            <div className="space-y-6">
                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-1">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                    </div>
                    <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                </div>

                {/* Session Timeout */}
                <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-1">Session Timeout</h4>
                            <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Input
                            type="number"
                            value={sessionTimeout}
                            onChange={(e) => setSessionTimeout(e.target.value)}
                            className="w-24 bg-background border-border"
                        />
                        <span className="text-sm text-muted-foreground">minutes</span>
                    </div>
                </div>

                {/* Password Expiry */}
                <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Key className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-1">Password Expiry</h4>
                            <p className="text-sm text-muted-foreground">Force password change after</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Input
                            type="number"
                            value={passwordExpiry}
                            onChange={(e) => setPasswordExpiry(e.target.value)}
                            className="w-24 bg-background border-border"
                        />
                        <span className="text-sm text-muted-foreground">days</span>
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

export default SecuritySettings;
