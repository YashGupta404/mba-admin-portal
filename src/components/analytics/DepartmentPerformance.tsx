import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface DepartmentPerformance {
    id: string;
    name: string;
    students: number;
    revenue: string;
    satisfaction: number;
    color: string;
}

interface DepartmentCardProps {
    department: DepartmentPerformance;
}

const DepartmentCard = ({ department }: DepartmentCardProps) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className={cn("w-3 h-3 rounded-full", department.color)}
                    />
                    <h4 className="font-semibold text-foreground">{department.name}</h4>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Students:</span>
                        <span className="font-semibold text-foreground">{department.students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-semibold text-foreground">{department.revenue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Satisfaction:</span>
                        <span className="font-semibold text-foreground flex items-center gap-1">
                            {department.satisfaction}
                            <span className="text-yellow-500">⭐</span>
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

interface DepartmentPerformanceProps {
    departments: DepartmentPerformance[];
}

const DepartmentPerformanceSection = ({ departments }: DepartmentPerformanceProps) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
                Department Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {departments.map((dept) => (
                    <DepartmentCard key={dept.id} department={dept} />
                ))}
            </div>
        </div>
    );
};

export default DepartmentPerformanceSection;
