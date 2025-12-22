interface AdmissionFunnelProps {
    data: {
        stage: string;
        count: number;
        conversion: string;
        color: string;
        number: number;
    }[];
}

const AdmissionFunnel = ({ data }: AdmissionFunnelProps) => {
    return (
        <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Admission Funnel</h2>
            <div className="flex items-center justify-between gap-4">
                {data.map((item, index) => (
                    <div key={item.stage} className="flex-1 text-center">
                        <div className="flex flex-col items-center">
                            {/* Circular indicator */}
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3 ${item.color}`}
                            >
                                {item.number}
                            </div>
                            {/* Stage name */}
                            <p className="text-sm font-medium text-foreground mb-1">{item.stage}</p>
                            {/* Count */}
                            <p className="text-2xl font-bold text-foreground">{item.count.toLocaleString()}</p>
                            {/* Conversion */}
                            <p className="text-xs text-muted-foreground">{item.conversion}</p>
                        </div>
                        {/* Connector line */}
                        {index < data.length - 1 && (
                            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-border" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdmissionFunnel;
