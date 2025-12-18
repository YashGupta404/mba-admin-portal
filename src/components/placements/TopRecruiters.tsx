import { cn } from "@/lib/utils";

export interface Recruiter {
    id: string;
    name: string;
    sector: string;
    offers: number;
    package: string;
    color: string;
}

interface TopRecruitersProps {
    recruiters: Recruiter[];
    onViewAll?: () => void;
}

const TopRecruiters = ({ recruiters, onViewAll }: TopRecruitersProps) => {
    return (
        <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Top Recruiters</h3>
                {onViewAll && (
                    <button
                        onClick={onViewAll}
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                        View All
                    </button>
                )}
            </div>
            <div className="space-y-3">
                {recruiters.map((recruiter) => (
                    <div
                        key={recruiter.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold",
                                    recruiter.color
                                )}
                            >
                                {recruiter.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-foreground">
                                    {recruiter.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">{recruiter.sector}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-sm text-foreground">
                                {recruiter.offers} offers
                            </p>
                            <p className="text-xs text-muted-foreground">{recruiter.package}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopRecruiters;
