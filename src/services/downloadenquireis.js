import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config/api";

export const handledownload = async () => {
  try {
    const response = await axios.get(`${API_URL}/enquiry/download`, {
      responseType: 'blob', // Important for downloading files, tells browser this is a file not json
    });
    // Create a downloadable URL for the blob
    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'mbaenquiries.xlsx'); //or any other extension
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast({
      title: "Download Started",
      description: "Enquiries data is being downloaded.",
    })

  }
  catch (error) {
    console.log("Error downloading data" + error);
    toast({
      title: "Error downloading enquiries",
      description: "Cant download enquiries of students",
    });
  }

};
