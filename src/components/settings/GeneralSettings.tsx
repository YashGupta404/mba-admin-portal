import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const GeneralSettings = () => {
    const [institutionName, setInstitutionName] = useState("MBA Institute");
    const [websiteUrl, setWebsiteUrl] = useState("https://mba-institute.edu");
    const [contactEmail, setContactEmail] = useState("admin@mba-institute.edu");
    const [phoneNumber, setPhoneNumber] = useState("+1 (555) 123-4567");
    const [address, setAddress] = useState("123 Education Street, Academic City, AC 12345");
    const [academicYear, setAcademicYear] = useState("2024-2025");
    const [currency, setCurrency] = useState("USD ($)");
    const [timeZone, setTimeZone] = useState("UTC-5 (Eastern Time)");
    const [language, setLanguage] = useState("English");

    const handleSaveChanges = () => {
        toast({
            title: "Settings Saved",
            description: "Your changes have been saved successfully.",
        });
    };

    return (
        <div className="space-y-8">
            {/* Institution Information */}
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Institution Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="institutionName" className="text-foreground">Institution Name</Label>
                        <Input
                            id="institutionName"
                            value={institutionName}
                            onChange={(e) => setInstitutionName(e.target.value)}
                            className="bg-background border-border"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="websiteUrl" className="text-foreground">Website URL</Label>
                        <Input
                            id="websiteUrl"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            className="bg-background border-border"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contactEmail" className="text-foreground">Contact Email</Label>
                        <Input
                            id="contactEmail"
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="bg-background border-border"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-foreground">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="bg-background border-border"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="text-foreground">Address</Label>
                        <Textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="bg-background border-border min-h-[80px]"
                        />
                    </div>
                </div>
            </div>

            {/* Academic Settings */}
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Academic Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-foreground">Academic Year</Label>
                        <Select value={academicYear} onValueChange={setAcademicYear}>
                            <SelectTrigger className="bg-background border-border">
                                <SelectValue placeholder="Select Academic Year" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                                <SelectItem value="2024-2025">2024-2025</SelectItem>
                                <SelectItem value="2025-2026">2025-2026</SelectItem>
                                <SelectItem value="2026-2027">2026-2027</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-foreground">Default Currency</Label>
                        <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger className="bg-background border-border">
                                <SelectValue placeholder="Select Currency" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                                <SelectItem value="USD ($)">USD ($)</SelectItem>
                                <SelectItem value="EUR (€)">EUR (€)</SelectItem>
                                <SelectItem value="GBP (£)">GBP (£)</SelectItem>
                                <SelectItem value="INR (₹)">INR (₹)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-foreground">Time Zone</Label>
                        <Select value={timeZone} onValueChange={setTimeZone}>
                            <SelectTrigger className="bg-background border-border">
                                <SelectValue placeholder="Select Time Zone" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                                <SelectItem value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</SelectItem>
                                <SelectItem value="UTC-6 (Central Time)">UTC-6 (Central Time)</SelectItem>
                                <SelectItem value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</SelectItem>
                                <SelectItem value="UTC+0 (GMT)">UTC+0 (GMT)</SelectItem>
                                <SelectItem value="UTC+5:30 (IST)">UTC+5:30 (IST)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-foreground">Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="bg-background border-border">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Spanish">Spanish</SelectItem>
                                <SelectItem value="French">French</SelectItem>
                                <SelectItem value="German">German</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Save Button */}
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

export default GeneralSettings;
