import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const revenueData = [
    { department: "Finance", revenue: 840 },
    { department: "Marketing", revenue: 760 },
    { department: "Operations", revenue: 580 },
    { department: "HR", revenue: 314 },
    { department: "Strategy", revenue: 420 },
    { department: "Accounting", revenue: 290 },
];

interface RevenueChartProps {
    groupBy: string;
    onGroupByChange: (value: string) => void;
}

const RevenueChart = ({ groupBy, onGroupByChange }: RevenueChartProps) => {
    return (
        <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Revenue Analysis</h3>
                <Select value={groupBy} onValueChange={onGroupByChange}>
                    <SelectTrigger className="w-[160px] bg-background border-border">
                        <SelectValue placeholder="By Department" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                        <SelectItem value="By Department">By Department</SelectItem>
                        <SelectItem value="By Course">By Course</SelectItem>
                        <SelectItem value="By Quarter">By Quarter</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="department" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                            }}
                        />
                        <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
                Bar chart showing revenue breakdown
            </p>
        </div>
    );
};

export default RevenueChart;
