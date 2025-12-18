import { cn } from "@/lib/utils";

interface FunnelStageProps {
    number: number;
    label: string;
    count: number;
    percentage: string;
    variant: "blue" | "green" | "orange" | "purple" | "pink";
}

const variantStyles = {
    blue: "bg-blue-500 border-blue-500",
    green: "bg-emerald-500 border-emerald-500",
    orange: "bg-orange-500 border-orange-500",
    purple: "bg-purple-500 border-purple-500",
    pink: "bg-pink-500 border-pink-500",
};

const FunnelStage = ({
    number,
    label,
    count,
    percentage,
    variant,
}: FunnelStageProps) => {
    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center rounded-xl border-2 p-6 transition-all hover:shadow-lg",
                variantStyles[variant]
            )}
        >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-current">
                <span className="text-sm font-bold">{number}</span>
            </div>
            <div className="text-white text-center">
                <div className="text-3xl font-bold mb-1">{count}</div>
                <div className="text-sm font-medium opacity-90 mb-1">{label}</div>
                <div className="text-xs opacity-75">{percentage}</div>
            </div>
        </div>
    );
};

const AdmissionFunnel = () => {
    return (
        <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
                Admission Funnel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <FunnelStage
                    number={1}
                    label="Applied"
                    count={1247}
                    percentage="100% conversion"
                    variant="blue"
                />
                <FunnelStage
                    number={2}
                    label="Shortlisted"
                    count={623}
                    percentage="50% conversion"
                    variant="green"
                />
                <FunnelStage
                    number={3}
                    label="Interviewed"
                    count={312}
                    percentage="25% conversion"
                    variant="orange"
                />
                <FunnelStage
                    number={4}
                    label="Offered"
                    count={156}
                    percentage="12.5% conversion"
                    variant="purple"
                />
                <FunnelStage
                    number={5}
                    label="Enrolled"
                    count={124}
                    percentage="10% conversion"
                    variant="pink"
                />
            </div>
        </div>
    );
};

export default AdmissionFunnel;
