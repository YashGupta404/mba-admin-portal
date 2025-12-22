import { useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormData {
    address: string;
    phone: string;
    email: string;
    website: string;
    officeHours: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
}

interface InstitutionContactFormProps {
    onSave: (data: ContactFormData) => void;
}

const InstitutionContactForm = ({ onSave }: InstitutionContactFormProps) => {
    const [formData, setFormData] = useState<ContactFormData>({
        address: "123 Education Street, Academic City, AC 12345",
        phone: "+1 (555) 123-4567",
        email: "admissions@mba-institute.edu",
        website: "https://mba-institute.edu",
        officeHours: "Monday - Friday: 9:00 AM - 6:00 PM",
        facebook: "https://facebook.com/mba-institute",
        twitter: "https://twitter.com/mba-institute",
        linkedin: "https://linkedin.com/school/mba-institute",
        instagram: "https://instagram.com/mba-institute",
    });

    const handleChange = (field: keyof ContactFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Institution Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        rows={3}
                        className="resize-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleChange("website", e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="officeHours">Office Hours</Label>
                    <Input
                        id="officeHours"
                        value={formData.officeHours}
                        onChange={(e) => handleChange("officeHours", e.target.value)}
                    />
                </div>

                <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold text-sm mb-3">Social Media Links</h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Facebook className="w-5 h-5 text-blue-600" />
                            <Input
                                placeholder="Facebook URL"
                                value={formData.facebook}
                                onChange={(e) => handleChange("facebook", e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Twitter className="w-5 h-5 text-sky-500" />
                            <Input
                                placeholder="Twitter URL"
                                value={formData.twitter}
                                onChange={(e) => handleChange("twitter", e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Linkedin className="w-5 h-5 text-blue-700" />
                            <Input
                                placeholder="LinkedIn URL"
                                value={formData.linkedin}
                                onChange={(e) => handleChange("linkedin", e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Instagram className="w-5 h-5 text-pink-600" />
                            <Input
                                placeholder="Instagram URL"
                                value={formData.instagram}
                                onChange={(e) => handleChange("instagram", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button
                        onClick={handleSave}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        Save Contact Information
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default InstitutionContactForm;
