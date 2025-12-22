import { useState } from "react";
import { Mail, Phone, Calendar, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

//Status and priority color mappings
const statusColors = {
  new: "bg-blue-500/10 text-blue-700 border-blue-200",
  "in-progress": "bg-yellow-500/10 text-yellow-700 border-yellow-200",
  responded: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
};

const priorityColors = {
  high: "bg-red-500/10 text-red-700 border-red-200",
  medium: "bg-orange-500/10 text-orange-700 border-orange-200",
  low: "bg-gray-500/10 text-gray-700 border-gray-200",
};

const sourceIcons = {
  website: Globe,
  email: Mail,
  phone: Phone,
  "social-media": Globe,
};
//const EnquiryCard = ({ enquiry, onViewDetails, onReply, onMarkResponded, onClose }) => {
const EnquiryCard = ({ enquiry,onViewDetails,onReply,onMarkResponded,onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const SourceIcon = sourceIcons[enquiry.source] || Globe;
  const date=new Date(enquiry.date);


  return (
    <div className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-foreground">{enquiry.name}</h4>
            <Badge className={cn("border text-xs", statusColors[enquiry.status])}>
              {enquiry.status}
            </Badge>
            <Badge className={cn("border text-xs", priorityColors[enquiry.priority])}>
              {enquiry.priority}
            </Badge>
            <SourceIcon className="w-4 h-4 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${enquiry.email}`} className="underline">
                {enquiry.email}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <a href={`tel:+91${enquiry.mobile}`} className="underline">
                {enquiry.mobile}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{date.toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mb-3">
            <h5 className="font-medium text-foreground text-sm mb-1">{enquiry.subject}</h5>
            <p className="text-sm text-muted-foreground line-clamp-2">{enquiry.message}</p>
          </div>

          {isExpanded && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
              <h6 className="font-semibold text-sm mb-2">Full Message:</h6>
              <p className="text-sm text-muted-foreground mb-3">{enquiry.message}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Received: {enquiry.received}</span>
                <span>Source: {enquiry.source}</span>
                <span>Priority: {enquiry.priority}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => onMarkResponded(enquiry.id)}
                >
                  Mark as Responded
                </Button>
                <Button size="sm" variant="outline" onClick={() => onClose(enquiry.id)}>
                  Close Enquiry
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="link"
          size="sm"
          className="text-emerald-600 hover:text-emerald-700 px-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Hide Details
              <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              View Details
              <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
        <Button
          variant="link"
          size="sm"
          className="text-blue-600 hover:text-blue-700"
          onClick={() => onReply(enquiry._id)}
        >
          Reply
        </Button> 
      </div>
    </div>
  );
};

export default EnquiryCard;
