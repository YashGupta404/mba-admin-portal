import { Download, Share2, Trash2, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Report {
    id: string;
    name: string;
    date: string;
    type: "PDF" | "Excel";
    size: string;
    downloads: number;
}

const reports: Report[] = [
    {
        id: "1",
        name: "Q4 2024 Enrollment Report",
        date: "2024-01-15",
        type: "PDF",
        size: "2.4 MB",
        downloads: 45,
    },
    {
        id: "2",
        name: "Faculty Performance Analysis",
        date: "2024-01-10",
        type: "Excel",
        size: "1.8 MB",
        downloads: 32,
    },
    {
        id: "3",
        name: "Student Satisfaction Survey",
        date: "2024-01-08",
        type: "PDF",
        size: "3.1 MB",
        downloads: 67,
    },
    {
        id: "4",
        name: "Placement Statistics 2024",
        date: "2024-01-05",
        type: "PDF",
        size: "1.5 MB",
        downloads: 89,
    },
];

const RecentReports = () => {
    const handleDownload = (reportName: string) => {
        toast({
            title: "Download Started",
            description: `Downloading ${reportName}`,
        });
    };

    const handleShare = (reportName: string) => {
        toast({
            title: "Share Report",
            description: `Sharing ${reportName}`,
        });
    };

    const handleDelete = (reportName: string) => {
        toast({
            title: "Delete Report",
            description: `Deleting ${reportName}`,
            variant: "destructive",
        });
    };

    return (
        <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Report
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr className="text-left text-sm text-muted-foreground">
                            <th className="p-3 font-medium">Report Name</th>
                            <th className="p-3 font-medium">Date</th>
                            <th className="p-3 font-medium">Type</th>
                            <th className="p-3 font-medium">Size</th>
                            <th className="p-3 font-medium">Downloads</th>
                            <th className="p-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-red-500" />
                                        <span className="font-medium text-foreground">{report.name}</span>
                                    </div>
                                </td>
                                <td className="p-3 text-foreground">{report.date}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2.5 py-1 rounded text-xs font-medium ${report.type === "PDF"
                                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                            }`}
                                    >
                                        {report.type}
                                    </span>
                                </td>
                                <td className="p-3 text-foreground">{report.size}</td>
                                <td className="p-3 text-foreground">{report.downloads}</td>
                                <td className="p-3">
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-primary hover:text-primary/80"
                                            onClick={() => handleDownload(report.name)}
                                        >
                                            <Download className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                            onClick={() => handleShare(report.name)}
                                        >
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            onClick={() => handleDelete(report.name)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentReports;
