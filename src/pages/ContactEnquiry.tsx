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
import { API_URL } from "@/config/api";

const ContactEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [status, setStatus] = useState("all");
  const [sort, setsort] = useState("all");
  const [source, setSource] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  //fetch all data
  const fetchdataall = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/enquiry`);
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
        `${API_URL}/enquiry/search`,
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
        `${API_URL}/enquiry/status/${id}`,
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

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/enquiry/deletespecific/${id}`
      );
      // Update state to remove the deleted enquiry
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      setFilteredEnquiries((prev) => prev.filter((e) => e._id !== id));
      toast({
        title: "Enquiry Deleted",
        description: "The enquiry has been deleted successfully.",
      });
    } catch (error) {
      console.log("Error deleting enquiry" + error);
      toast({
        title: "Error deleting enquiry",
        description: "Cant delete the enquiry",
      });
    }
  };

  //handle reply to enquiry
  const handleReply = async (id, replyMessage) => {
    const enquiry = enquiries.find((e) => e._id === id);
    if (!enquiry) return;

    try {
      const response = await axios.post(
        `${API_URL}/enquiry/reply/${id}`,
        {
          reply: replyMessage,
        }
      );
      toast({
        title: "Reply Sent",
        description: `Reply has been sent to ${enquiry.name}.`,
      });
      if (enquiry.status === "responded") return;

      const response2 = await axios.put(
        `${API_URL}/enquiry/status/${id}`,
        {
          status: "responded",
        }
      );

      // Update status in UI (React state)
      setEnquiries((prev) =>
        prev.map((e) =>
          e._id === id
            ? {
              ...e,
              reply: replyMessage,
              replyDate: new Date(),
              status: "responded",
            }
            : e
        )
      );
    } catch (error) {
      console.log("Error replying to enquiry" + error);
      toast({
        title: "Error replying to enquiry",
        description: "Cant reply to the enquiry",
      });
    }
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
            sort={sort}
            source={source}
            searchQuery={searchQuery}
            onStatusChange={setStatus}
            onsortChange={setsort}
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
                    onDelete={handledelete}
                    onViewDetails={handleViewDetails}
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
