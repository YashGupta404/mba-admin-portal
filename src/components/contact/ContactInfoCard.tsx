import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactInfo {
    title: string;
    address: string;
    phone: string;
    email: string;
    website: string;
}

interface ContactInfoCardProps {
    info: ContactInfo;
}

const ContactInfoCard = ({ info }: ContactInfoCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{info.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-foreground">Address</p>
                        <p className="text-sm text-muted-foreground">{info.address}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-foreground">Phone</p>
                        <p className="text-sm text-muted-foreground">{info.phone}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-foreground">Email</p>
                        <p className="text-sm text-muted-foreground">{info.email}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-foreground">Website</p>
                        <p className="text-sm text-muted-foreground">{info.website}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ContactInfoCard;
