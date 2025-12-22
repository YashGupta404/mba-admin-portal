import { Star } from "lucide-react";

interface DepartmentData {
    name: string;
    students: number;
    revenue: string;
    satisfaction: number;
    color: string;
}

const departments: DepartmentData[] = [
    { name: "Finance", students: 420, revenue: "$840K", satisfaction: 4.9, color: "bg-blue-500" },
    { name: "Marketing", students: 380, revenue: "$760K", satisfaction: 4.8, color: "bg-emerald-500" },
    { name: "Operations", students: 290, revenue: "$580K", satisfaction: 4.7, color: "bg-orange-500" },
    { name: "HR", students: 157, revenue: "$314K", satisfaction: 4.6, color: "bg-purple-500" },
];

const DepartmentPerformance = () => {
    return (
        <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Department Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {departments.map((dept) => (
                    <div key={dept.name} className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                            <h4 className="font-semibold text-foreground">{dept.name}</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Students:</span>
                                <span className="font-medium text-foreground">{dept.students}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Revenue:</span>
                                <span className="font-medium text-foreground">{dept.revenue}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Satisfaction:</span>
                                <div className="flex items-center gap-1">
                                    <span className="font-medium text-foreground">{dept.satisfaction}</span>
                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentPerformance;
