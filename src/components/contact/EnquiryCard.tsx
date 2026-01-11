import { useState, useEffect } from "react";
import { Mail, Phone, Calendar, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusColors = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
  responded: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const sortColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-orange-100 text-orange-800 border-orange-200",
  low: "bg-gray-100 text-gray-800 border-gray-200",
};

const sourceIcons = {
  website: Globe,
  email: Mail,
  phone: Phone,
  "social-media": Globe,
};

const EnquiryCard = ({ enquiry, onViewDetails, onReply, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplied, setIsReplied] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const SourceIcon = sourceIcons[enquiry.source] || Globe;
  const date = new Date(enquiry.date);

  useEffect(() => {
    if (enquiry.status === "responded") setIsReplied(true);
  }, [enquiry.status]);

  const handleToggle = () => {
    if (!isExpanded && enquiry.status === "new") onViewDetails(enquiry._id);
    setIsExpanded(!isExpanded);
  };

  const handleReplyChange = (e) => setReplyMessage(e.target.value);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply(enquiry._id, replyMessage);
    setIsReplied(true);
    setReplyMessage("");
  };

  const handleDelete = () => onDelete(enquiry._id);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 mb-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-base text-gray-900 truncate">{enquiry.name}</h4>
            <Badge className={cn("border text-sm px-2 py-1", statusColors[enquiry.status])}>
              {enquiry.status.toUpperCase()}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-1 min-w-0">
              <Mail className="w-4 h-4 text-gray-400" />
              <a href={`mailto:${enquiry.email}`} className="truncate underline">
                {enquiry.email}
              </a>
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <Phone className="w-4 h-4 text-gray-400" />
              <a href={`tel:+91${enquiry.mobile}`} className="underline">
                {enquiry.mobile}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{date.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Subject & Preview */}
          <div className="mb-2 mt-5">
            <h5 className="font-medium text-gray-800 text-sm ">{enquiry.subject}</h5>
            <p className="text-gray-600 text-sm line-clamp-2">{enquiry.message}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 md:items-start md:justify-end">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700"
            onClick={handleToggle}
          >
            {isExpanded ? "Hide Details" : "View Details"}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h6 className="font-semibold text-gray-800 text-sm mb-2">Full Message</h6>
          <p className="text-gray-600 text-sm mb-3">{enquiry.message}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span>Message Seen</span>
           
          </div>

          {!isReplied ? (
            <form onSubmit={handleReplySubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                value={replyMessage}
                onChange={handleReplyChange}
                placeholder="Type your reply..."
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-emerald-500 outline-none"
              />
              <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Reply
              </Button>
            </form>
          ) : (
            <div className="mt-2">
              <h6 className="font-semibold text-gray-800 text-sm mb-1">Reply</h6>
              <p className="text-gray-600 text-sm mb-2 break-words">{enquiry.reply}</p>
              <span className="text-gray-500 text-xs">
                Date: {enquiry.replyDate ? new Date(enquiry.replyDate).toLocaleString() : "Not replied yet"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnquiryCard;
