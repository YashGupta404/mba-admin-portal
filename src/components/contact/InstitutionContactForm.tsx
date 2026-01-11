import React, { useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const InstitutionContactForm = () => {
  const [formdata, setformData] = useState({
    address: "123 Education Street, Academic City, AC 12345",
    phone: "+1 (555) 123-4567",
    email: "admissions@mba-institute.edu",
    officeHours: "Monday - Friday: 9:00 AM - 6:00 PM",
    facebookLink: "https://facebook.com/mba-institute",
    twitterLink: "https://twitter.com/mba-institute",
    linkedinLink: "https://linkedin.com/school/mba-institute",
    instagramLink: "https://instagram.com/mba-institute",
  });

  const handlechange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    const shallowcopy = { ...formdata };
    shallowcopy[name] = value;
    setformData(shallowcopy);
  };

  const handlesubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      address,
      phone,
      email,
      officeHours,
      facebookLink,
      twitterLink,
      linkedinLink,
      instagramLink,
    } = formdata;
    if (
      !address ||
      !phone ||
      !email ||
      !officeHours ||
      !facebookLink ||
      !twitterLink ||
      !linkedinLink ||
      !instagramLink
    ) {
      console.log("Kindly fill up the credentials");
    }
    try {
      const response = await axios.put(
        "http://localhost:5000/api/collegeinfo",
        formdata
      );
      const { success, error, message } = response.data;
      if (success) {
        console.log("College Information updated successfully");
        toast({
          title: "Success",
          description: "College Information updated successfully",
        });
      }
      if (error) {
        console.log("Error occured while posting data=", error);
        toast({
            title: "Error",
            description: "Error occured while updating college information",}); 
      }
    } catch (err) {
      console.log("Error with college info form api...", err);
        toast({
            title: "Error",
            description: "Error occured while updating college information",});
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold">
          Institution Contact Information
        </h3>
      </div>

      <form onSubmit={handlesubmit} className="space-y-4">
        {/* Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <textarea
            name="address"
            className="w-full h-20 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            value={formdata.address}
            placeholder="Address"
            onChange={handlechange}
          />
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full h-10 rounded-md border border-gray-300 px-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formdata.phone}
              placeholder="Phone"
              onChange={handlechange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              className="w-full h-10 rounded-md border border-gray-300 px-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formdata.email}
              placeholder="Email"
              onChange={handlechange}
            />
          </div>
        </div>

        {/* Website */}
        {/* <div className="space-y-2">
          <label className="text-sm font-medium">Website</label>
          <input
            type="text"
            className="w-full h-10 rounded-md border border-gray-300 px-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formdata.website}
            placeholder="Website"
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div> */}

        {/* Office Hours */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Office Hours</label>
          <input
            type="text"
            name="officeHours"
            className="w-full h-10 rounded-md border border-gray-300 px-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formdata.officeHours}
            placeholder="Office Hours"
            onChange={handlechange}
          />
        </div>

        {/* Social Media Links */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-sm mb-3">Social Media Links</h4>
          <div className="space-y-3">
            {[
              {
                icon: <Facebook className="w-5 h-5 text-blue-600" />,
                key: "facebookLink",
                placeholder: "Facebook URL",
              },
              {
                icon: <Twitter className="w-5 h-5 text-sky-500" />,
                key: "twitterLink",
                placeholder: "Twitter URL",
              },
              {
                icon: <Linkedin className="w-5 h-5 text-blue-700" />,
                key: "linkedin",
                placeholder: "LinkedIn URL",
              },
              {
                icon: <Instagram className="w-5 h-5 text-pink-600" />,
                key: "instagramLink",
                placeholder: "Instagram URL",
              },
            ].map(({ icon, key, placeholder }) => (
              <div className="flex items-center gap-3" key={key}>
                {icon}
                <input
                  type="text"
                  name={key}
                  value={formdata[key]}
                  placeholder={placeholder}
                  className="flex-1 h-10 rounded-md border border-gray-300 px-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={handlechange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Save Contact Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstitutionContactForm;
