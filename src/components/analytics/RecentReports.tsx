import { Download, Share2, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

export interface Report {
    id: string;
    name: string;
    date: string;
    type: "PDF" | "Excel";
    size: string;
    downloads: number;
}

interface RecentReportsProps {
    reports: Report[];
    onDownload: (id: string) => void;
    onShare: (id: string) => void;
    onDelete: (id: string) => void;
    onGenerate?: () => void;
}

const RecentReports = ({
    reports,
    onDownload,
    onShare,
    onDelete,
    onGenerate,
}: RecentReportsProps) => {
    return (
        <div className="bg-card rounded-lg border border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
                {onGenerate && (
                    <Button
                        onClick={onGenerate}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    >
                        <FileText className="w-4 h-4" />
                        Generate Report
                    </Button>
                )}
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Downloads</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reports.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-8 h-8 rounded flex items-center justify-center ${report.type === "PDF"
                                                ? "bg-red-500/10 text-red-600"
                                                : "bg-emerald-500/10 text-emerald-600"
                                            }`}
                                    >
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    {report.name}
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{report.date}</TableCell>
                            <TableCell>
                                <Badge
                                    className={
                                        report.type === "PDF"
                                            ? "bg-red-500/10 text-red-700 border-red-200"
                                            : "bg-emerald-500/10 text-emerald-700 border-emerald-200"
                                    }
                                >
                                    {report.type}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{report.size}</TableCell>
                            <TableCell className="text-muted-foreground">{report.downloads}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                                        onClick={() => onDownload(report.id)}
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-emerald-600 hover:bg-emerald-50"
                                        onClick={() => onShare(report.id)}
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-600 hover:bg-red-50"
                                        onClick={() => onDelete(report.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default RecentReports;
