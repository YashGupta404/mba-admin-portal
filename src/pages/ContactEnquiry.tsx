import { useState, useEffect } from "react";
import { Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnquiryCard from "@/components/contact/EnquiryCard";
import EnquiryFilters from "@/components/contact/EnquiryFilters";
import InstitutionContactForm from "@/components/contact/InstitutionContactForm";
import EnquiryStatistics from "@/components/contact/EnquiryStatistics";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

// Initial enquiries (no TypeScript types)
// const initialEnquiries = [
//     {
//         id: "1",
//         name: "John Smith",
//         email: "john.smith@email.com",
//         phone: "+1 (555) 123-4567",
//         date: "2024-01-16",
//         status: "new",
//         priority: "high",
//         source: "website",
//         subject: "MBA Program Admission",
//         message:
//             "I am interested in applying for the MBA program. Could you please provide more information about the admission requirements and deadlines?",
//         received: "2024-01-16",
//     }
// ];

const ContactEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [source, setSource] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchdataall = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/enquiry");
      setEnquiries(response.data.enquiry);
    } catch (error) {
      console.log("Error Fetching data" + error);
      toast({
        title: "Error fetching enquiries",
        description: "Cant fetch enquiries from of students",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(searchQuery==="")
    fetchdataall();
  }, []);

  const handleViewDetails = (id) => {
    const enquiry = enquiries.find((e) => e.id === id);
    toast({
      title: "View Details",
      description: `Opening details for ${enquiry?.name}`,
    });
  };

  const handleReply = (id) => {
    const enquiry = enquiries.find((e) => e._id === id);
    if (!enquiry) return;
  };

  const handleMarkResponded = (id) => {
    setEnquiries(
      enquiries.map((e) => (e._id === id ? { ...e, status: "responded" } : e))
    );
    const enquiry = enquiries.find((e) => e._id === id);
    toast({
      title: "Marked as Responded",
      description: `Enquiry of ${enquiry.name} has been marked as responded.`,
    });
  };

  const handleClose = (id) => {
    const enquiry = enquiries.find((e) => e._id === id);
    toast({
      title: "Enquiry Closed",
      description: `Enquiry from ${enquiry.name} has been closed.`,
    });
  };

  //   const filteredEnquiries = enquiries.filter((enquiry) => {
  //     if (status !== "all" && enquiry.status !== status) return false;
  //     if (priority !== "all" && enquiry.priority !== priority) return false;
  //     if (source !== "all" && enquiry.source !== source) return false;
  //     if (searchQuery) {
  //       const query = searchQuery.toLowerCase();
  //       return (
  //         enquiry.name.toLowerCase().includes(query) ||
  //         enquiry.email.toLowerCase().includes(query) ||
  //         enquiry.subject.toLowerCase().includes(query) ||
  //         enquiry.message.toLowerCase().includes(query)
  //       );
  //     }
  //     return true;
  //   });

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
            onSearchSubmit={setEnquiries}
          />

          {/* Enquiries List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-muted-foreground text-sm py-10">
                Loading enquiries...
              </div>
            ) : enquiries.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-10">
                No enquiries found
              </div>
            ) : (
              [...enquiries]
                .reverse()
                .map((enquiry, index) => (
                  <EnquiryCard
                    key={index}
                    enquiry={enquiry}
                    onReply={handleReply}
                    onViewDetails={handleViewDetails}
                    onMarkResponded={() => handleMarkResponded(enquiry._id)}
                    onClose={() => handleClose(enquiry._id)}
                  />
                ))
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
                    description:
                      "Institution contact information has been updated successfully.",
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
