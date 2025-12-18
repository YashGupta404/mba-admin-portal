import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string;
    change?: string;
    icon: React.ReactNode;
    iconColor: string;
}

const PlacementStatCard = ({
    title,
    value,
    change,
    icon,
    iconColor,
}: StatCardProps) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{title}</p>
                        <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
                        {change && (
                            <p className="text-sm text-emerald-600 font-medium">{change}</p>
                        )}
                    </div>
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconColor)}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PlacementStatCard;
