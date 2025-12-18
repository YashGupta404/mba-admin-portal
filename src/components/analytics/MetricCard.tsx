import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    iconColor: string;
    subtitle: string;
}

const MetricCard = ({
    title,
    value,
    change,
    icon,
    iconColor,
    subtitle,
}: MetricCardProps) => {
    const isPositive = change.startsWith("+");

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconColor)}>
                        {icon}
                    </div>
                    <span className={cn("text-sm font-semibold", isPositive ? "text-emerald-600" : "text-red-600")}>
                        {change}
                    </span>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default MetricCard;
