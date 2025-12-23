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
import { handledownload } from "@/services/downloadenquireis";

const ContactEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [source, setSource] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  //fetch all data
  const fetchdataall = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/enquiry");
      setEnquiries(response.data.enquiry);
    } catch (error) {
      console.log("Error Fetching data" + error);
      toast({
        title: "Error fetching enquiries",
        description: "Cant fetch enquiries of students",
      });
    } finally {
      setLoading(false);
    }
  };

  //fetch sepecific data by search
  const fetchdataspecific = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/enquiry/search",
        {
          params: { search: searchQuery },
        }
      );
      setEnquiries(response.data.display);
    } catch (error) {
      console.log("Error searching data" + error);
      toast({
        title: "Error search specific enquiries",
        description: "Cant search specific enquiries of students",
      });
    } finally {
      setLoading(false);
    }
  };

  //search and display feature of all data in the portal
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") {
        fetchdataall(); // reload all data
      } else {
        fetchdataspecific(); // search
      }
    }, 1000); // debounce (ms)

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Filter enquiries based on status dropdown
  useEffect(() => {
    if (status === "all") {
      setFilteredEnquiries(enquiries);
    } else {
      setFilteredEnquiries(enquiries.filter((e) => e.status === status));
    }
  }, [status, enquiries]);

  //updates status on viewing details
  const handleViewDetails = async (id) => {
    try {
      const enquiry = enquiries.find((e) => e._id === id);
      if (!enquiry) return;

      if (enquiry.status !== "new") return;

      const response = await axios.put(
        `http://localhost:5000/api/enquiry/status/${id}`,
        {
          status: "in-progress",
        }
      );
      // Update status in UI (React state)
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: "in-progress" } : e))
      );
    } catch (error) {
      console.log("Error updating status" + error);
      toast({
        title: "Error updating enquiry status",
        description: "Cant update status of the enquiry",
      });
    }
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
          <Button
            onClick={handledownload}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
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
            {loading ? (
              <div className="text-center text-muted-foreground text-sm py-10">
                Loading enquiries...
              </div>
            ) : enquiries.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-10">
                No enquiries found
              </div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-10">
                No enquiries match this filter
              </div>
            ) : (
              [...filteredEnquiries]
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
