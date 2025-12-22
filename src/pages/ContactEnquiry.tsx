import { useState } from "react";
import { Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnquiryCard, { Enquiry } from "@/components/contact/EnquiryCard";
import EnquiryFilters from "@/components/contact/EnquiryFilters";
import InstitutionContactForm from "@/components/contact/InstitutionContactForm";
import EnquiryStatistics from "@/components/contact/EnquiryStatistics";
import { toast } from "@/hooks/use-toast";

const initialEnquiries: Enquiry[] = [
    {
        id: "1",
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        date: "2024-01-16",
        status: "new",
        priority: "high",
        source: "website",
        subject: "MBA Program Admission",
        message:
            "I am interested in applying for the MBA program. Could you please provide more information about the admission requirements and deadlines?",
        received: "2024-01-16",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+1 (555) 234-5678",
        date: "2024-01-15",
        status: "responded",
        priority: "medium",
        source: "email",
        subject: "Course Information",
        message:
            "I would like to know more about the Finance specialization courses and faculty members.",
        received: "2024-01-15",
    },
    {
        id: "3",
        name: "Michael Chen",
        email: "michael.c@email.com",
        phone: "+1 (555) 345-6789",
        date: "2024-01-14",
        status: "in-progress",
        priority: "medium",
        source: "phone",
        subject: "Scholarship Information",
        message:
            "Are there any scholarship opportunities available for international students?",
        received: "2024-01-14",
    },
    {
        id: "4",
        name: "Emily Rodriguez",
        email: "emily.r@email.com",
        phone: "+1 (555) 456-7890",
        date: "2024-01-13",
        status: "new",
        priority: "low",
        source: "social-media",
        subject: "Campus Visit Request",
        message:
            "I would like to schedule a campus visit to learn more about the facilities and programs.",
        received: "2024-01-13",
    },
    {
        id: "5",
        name: "David Kim",
        email: "david.k@email.com",
        phone: "+1 (555) 567-8901",
        date: "2024-01-12",
        status: "responded",
        priority: "high",
        source: "website",
        subject: "Application Status",
        message:
            "I submitted my application last month. Can you provide an update on the status?",
        received: "2024-01-12",
    },
];

const ContactEnquiry = () => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
    const [status, setStatus] = useState("all");
    const [priority, setPriority] = useState("all");
    const [source, setSource] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const handleViewDetails = (id: string) => {
        const enquiry = enquiries.find((e) => e.id === id);
        toast({
            title: "View Details",
            description: `Opening details for ${enquiry?.name}`,
        });
    };

    const handleReply = (id: string) => {
        const enquiry = enquiries.find((e) => e.id === id);
        toast({
            title: "Reply to Enquiry",
            description: `Opening email client to reply to ${enquiry?.name}`,
        });
    };

    const handleMarkResponded = (id: string) => {
        setEnquiries(
            enquiries.map((e) =>
                e.id === id ? { ...e, status: "responded" as const } : e
            )
        );
        toast({
            title: "Marked as Responded",
            description: "Enquiry has been marked as responded.",
        });
    };

    const handleClose = (id: string) => {
        const enquiry = enquiries.find((e) => e.id === id);
        toast({
            title: "Enquiry Closed",
            description: `Enquiry from ${enquiry?.name} has been closed.`,
        });
    };

    const filteredEnquiries = enquiries.filter((enquiry) => {
        if (status !== "all" && enquiry.status !== status) return false;
        if (priority !== "all" && enquiry.priority !== priority) return false;
        if (source !== "all" && enquiry.source !== source) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                enquiry.name.toLowerCase().includes(query) ||
                enquiry.email.toLowerCase().includes(query) ||
                enquiry.subject.toLowerCase().includes(query) ||
                enquiry.message.toLowerCase().includes(query)
            );
        }
        return true;
    });

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Contact & Enquiry Management
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage student enquiries and contact information
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 gap-2"
                    >
                        <Mail className="w-4 h-4" />
                        Send Bulk Email
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Download className="w-4 h-4" />
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="enquiries" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
                    <TabsTrigger value="contact">Contact Information</TabsTrigger>
                </TabsList>

                <TabsContent value="enquiries" className="space-y-6">
                    {/* Filters */}
                    <EnquiryFilters
                        status={status}
                        priority={priority}
                        source={source}
                        searchQuery={searchQuery}
                        onStatusChange={setStatus}
                        onPriorityChange={setPriority}
                        onSourceChange={setSource}
                        onSearchChange={setSearchQuery}
                    />

                    {/* Enquiries List */}
                    <div className="space-y-4">
                        {filteredEnquiries.length > 0 ? (
                            filteredEnquiries.map((enquiry) => (
                                <EnquiryCard
                                    key={enquiry.id}
                                    enquiry={enquiry}
                                    onViewDetails={handleViewDetails}
                                    onReply={handleReply}
                                    onMarkResponded={handleMarkResponded}
                                    onClose={handleClose}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-card rounded-lg border border-border">
                                <p className="text-muted-foreground">No enquiries found</p>
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <InstitutionContactForm
                                onSave={(data) => {
                                    toast({
                                        title: "Contact Information Saved",
                                        description: "Institution contact information has been updated successfully.",
                                    });
                                }}
                            />
                        </div>
                        <div>
                            <EnquiryStatistics />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ContactEnquiry;
