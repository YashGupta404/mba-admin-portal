import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SectorData {
    name: string;
    percentage: number;
    color: string;
}

interface SectorDistributionProps {
    sectors: SectorData[];
}

const SectorDistribution = ({ sectors }: SectorDistributionProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Sector-wise Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {sectors.map((sector) => (
                    <div key={sector.name}>
                        <div className="flex justify-between text-sm mb-1.5">
                            <span className="text-foreground font-medium">{sector.name}</span>
                            <span className="text-muted-foreground">{sector.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${sector.color}`}
                                style={{ width: `${sector.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default SectorDistribution;
