import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    change: string;
    changeLabel: string;
    isPositive: boolean;
    iconBgColor: string;
}

const MetricCard = ({
    icon,
    title,
    value,
    change,
    changeLabel,
    isPositive,
    iconBgColor,
}: MetricCardProps) => {
    return (
        <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center`}>
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {change}
                </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
            <p className="text-xs text-muted-foreground">{changeLabel}</p>
        </div>
    );
};

export default MetricCard;
