import { useState } from "react";
import { DollarSign, Star, GraduationCap, Briefcase, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import MetricCard from "@/components/analytics/MetricCard";
import EnrollmentChart from "@/components/analytics/EnrollmentChart";
import RevenueChart from "@/components/analytics/RevenueChart";
import DepartmentPerformance from "@/components/analytics/DepartmentPerformance";
import RecentReports from "@/components/analytics/RecentReports";
import { toast } from "@/hooks/use-toast";

const Analytics = () => {
    const [timeRange, setTimeRange] = useState("Last 12 Months");
    const [enrollmentPeriod, setEnrollmentPeriod] = useState("Monthly");
    const [revenueGroupBy, setRevenueGroupBy] = useState("By Department");

    const handleExportReport = () => {
        toast({
            title: "Export Report",
            description: "Generating comprehensive analytics report...",
        });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Analytics & Reports</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Comprehensive insights and performance metrics
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[160px] bg-background border-border">
                            <SelectValue placeholder="Last 12 Months" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                            <SelectItem value="Last 12 Months">Last 12 Months</SelectItem>
                            <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                            <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                            <SelectItem value="Custom Range">Custom Range</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleExportReport}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
                    title="Total Revenue"
                    value="$2.4M"
                    change="+15.3%"
                    changeLabel="vs last year"
                    isPositive={true}
                    iconBgColor="bg-emerald-100 dark:bg-emerald-900/30"
                />
                <MetricCard
                    icon={<Star className="w-5 h-5 text-yellow-600" />}
                    title="Student Satisfaction"
                    value="4.8/5"
                    change="+0.2"
                    changeLabel="vs last semester"
                    isPositive={true}
                    iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
                />
                <MetricCard
                    icon={<GraduationCap className="w-5 h-5 text-blue-600" />}
                    title="Course Completion"
                    value="92.5%"
                    change="+5.1%"
                    changeLabel="vs last year"
                    isPositive={true}
                    iconBgColor="bg-blue-100 dark:bg-blue-900/30"
                />
                <MetricCard
                    icon={<Briefcase className="w-5 h-5 text-purple-600" />}
                    title="Employment Rate"
                    value="94.2%"
                    change="+2.8%"
                    changeLabel="within 6 months"
                    isPositive={true}
                    iconBgColor="bg-purple-100 dark:bg-purple-900/30"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EnrollmentChart period={enrollmentPeriod} onPeriodChange={setEnrollmentPeriod} />
                <RevenueChart groupBy={revenueGroupBy} onGroupByChange={setRevenueGroupBy} />
            </div>

            {/* Department Performance */}
            <DepartmentPerformance />

            {/* Recent Reports */}
            <RecentReports />
        </div>
    );
};

export default Analytics;
