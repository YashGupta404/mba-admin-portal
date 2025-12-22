import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Company {
    id: string;
    name: string;
    sector: "technology" | "consulting" | "finance" | "healthcare" | "other";
    logo?: string;
    color?: string;
}

interface CompanyCardProps {
    company: Company;
    onClick?: (id: string) => void;
}

const sectorColors: Record<string, string> = {
    technology: "bg-blue-500",
    consulting: "bg-emerald-500",
    finance: "bg-orange-500",
    healthcare: "bg-purple-500",
    other: "bg-gray-500",
};

const CompanyCard = ({ company, onClick }: CompanyCardProps) => {
    const bgColor = company.color || sectorColors[company.sector];

    return (
        <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onClick?.(company.id)}
        >
            <CardContent className="p-6 flex flex-col items-center justify-center">
                <div
                    className={cn(
                        "w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-3",
                        bgColor
                    )}
                >
                    {company.logo ? (
                        <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                    ) : (
                        company.name.charAt(0)
                    )}
                </div>
                <h4 className="font-semibold text-sm text-foreground text-center">
                    {company.name}
                </h4>
            </CardContent>
        </Card>
    );
};

interface PartnerCompaniesProps {
    companies: Company[];
    onCompanyClick?: (id: string) => void;
    onAddCompany?: () => void;
}

const PartnerCompanies = ({
    companies,
    onCompanyClick,
    onAddCompany,
}: PartnerCompaniesProps) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
                Partner Companies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {companies.map((company) => (
                    <CompanyCard
                        key={company.id}
                        company={company}
                        onClick={onCompanyClick}
                    />
                ))}
                <Card
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-dashed"
                    onClick={onAddCompany}
                >
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                        <Building2 className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm font-medium text-muted-foreground">
                            Add Company
                        </span>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PartnerCompanies;
