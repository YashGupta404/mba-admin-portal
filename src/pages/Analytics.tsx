import { useState } from "react";
import { Download, DollarSign, Star, GraduationCap, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/analytics/MetricCard";
import DepartmentPerformanceSection, {
    DepartmentPerformance,
} from "@/components/analytics/DepartmentPerformance";
import RecentReports, { Report } from "@/components/analytics/RecentReports";
import { toast } from "@/hooks/use-toast";

const departments: DepartmentPerformance[] = [
    {
        id: "1",
        name: "Finance",
        students: 420,
        revenue: "$840K",
        satisfaction: 4.9,
        color: "bg-blue-500",
    },
    {
        id: "2",
        name: "Marketing",
        students: 380,
        revenue: "$760K",
        satisfaction: 4.8,
        color: "bg-emerald-500",
    },
    {
        id: "3",
        name: "Operations",
        students: 290,
        revenue: "$580K",
        satisfaction: 4.7,
        color: "bg-orange-500",
    },
    {
        id: "4",
        name: "HR",
        students: 157,
        revenue: "$314K",
        satisfaction: 4.6,
        color: "bg-purple-500",
    },
];

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

const Analytics = () => {
    const [timeRange, setTimeRange] = useState("last-12-months");
    const [enrollmentPeriod, setEnrollmentPeriod] = useState("monthly");
    const [revenueFilter, setRevenueFilter] = useState("by-department");

    const handleExportReport = () => {
        toast({
            title: "Exporting Report",
            description: "Your analytics report is being generated...",
        });
    };

    const handleGenerateReport = () => {
        toast({
            title: "Generate Report",
            description: "Opening report generation wizard...",
        });
    };

    const handleDownloadReport = (id: string) => {
        const report = reports.find((r) => r.id === id);
        toast({
            title: "Downloading Report",
            description: `Downloading ${report?.name}...`,
        });
    };

    const handleShareReport = (id: string) => {
        const report = reports.find((r) => r.id === id);
        toast({
            title: "Share Report",
            description: `Sharing ${report?.name}...`,
        });
    };

    const handleDeleteReport = (id: string) => {
        const report = reports.find((r) => r.id === id);
        toast({
            title: "Delete Report",
            description: `${report?.name} has been deleted.`,
            variant: "destructive",
        });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Analytics & Reports
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Comprehensive insights and performance metrics
                    </p>
                </div>
                <div className="flex gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="last-12-months">Last 12 Months</SelectItem>
                            <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleExportReport}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Revenue"
                    value="$2.4M"
                    change="+15.3%"
                    subtitle="vs last year"
                    icon={<DollarSign className="w-6 h-6 text-white" />}
                    iconColor="bg-emerald-500"
                />
                <MetricCard
                    title="Student Satisfaction"
                    value="4.8/5"
                    change="+8.2"
                    subtitle="vs last semester"
                    icon={<Star className="w-6 h-6 text-white" />}
                    iconColor="bg-yellow-500"
                />
                <MetricCard
                    title="Course Completion"
                    value="92.5%"
                    change="+5.1%"
                    subtitle="vs last year"
                    icon={<GraduationCap className="w-6 h-6 text-white" />}
                    iconColor="bg-blue-500"
                />
                <MetricCard
                    title="Enrollment Rate"
                    value="94.2%"
                    change="+2.8%"
                    subtitle="within 6 months"
                    icon={<Users className="w-6 h-6 text-white" />}
                    iconColor="bg-purple-500"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Enrollment Trends */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Enrollment Trends</CardTitle>
                            <Select value={enrollmentPeriod} onValueChange={setEnrollmentPeriod}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                            <div className="text-center">
                                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm font-medium text-foreground">Enrollment Chart</p>
                                <p className="text-xs text-muted-foreground">
                                    Interactive chart showing enrollment trends over time
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Revenue Analysis */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Revenue Analysis</CardTitle>
                            <Select value={revenueFilter} onValueChange={setRevenueFilter}>
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="by-department">By Department</SelectItem>
                                    <SelectItem value="by-program">By Program</SelectItem>
                                    <SelectItem value="by-semester">By Semester</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                            <div className="text-center">
                                <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm font-medium text-foreground">Revenue Chart</p>
                                <p className="text-xs text-muted-foreground">
                                    Bar chart showing revenue breakdown
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Department Performance */}
            <DepartmentPerformanceSection departments={departments} />

            {/* Recent Reports */}
            <RecentReports
                reports={reports}
                onDownload={handleDownloadReport}
                onShare={handleShareReport}
                onDelete={handleDeleteReport}
                onGenerate={handleGenerateReport}
            />
        </div>
    );
};

export default Analytics;
