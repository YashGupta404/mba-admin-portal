import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const enrollmentData = [
    { month: "Jan", students: 120 },
    { month: "Feb", students: 145 },
    { month: "Mar", students: 165 },
    { month: "Apr", students: 180 },
    { month: "May", students: 195 },
    { month: "Jun", students: 210 },
    { month: "Jul", students: 225 },
    { month: "Aug", students: 240 },
    { month: "Sep", students: 260 },
    { month: "Oct", students: 275 },
    { month: "Nov", students: 290 },
    { month: "Dec", students: 310 },
];

interface EnrollmentChartProps {
    period: string;
    onPeriodChange: (value: string) => void;
}

const EnrollmentChart = ({ period, onPeriodChange }: EnrollmentChartProps) => {
    return (
        <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Enrollment Trends</h3>
                <Select value={period} onValueChange={onPeriodChange}>
                    <SelectTrigger className="w-[120px] bg-background border-border">
                        <SelectValue placeholder="Monthly" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                        <SelectItem value="Yearly">Yearly</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={enrollmentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="students"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ fill: "#10b981", r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
                Interactive chart showing enrollment trends over time
            </p>
        </div>
    );
};

export default EnrollmentChart;
