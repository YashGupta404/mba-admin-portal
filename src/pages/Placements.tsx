import { useState } from "react";
import { UserPlus, Calendar, Users, DollarSign, TrendingUp, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlacementStatCard from "@/components/placements/PlacementStatCard";
import TopRecruiters, { Recruiter } from "@/components/placements/TopRecruiters";
import PartnerCompanies, { Company } from "@/components/placements/PartnerCompanies";
import UpcomingDrives, { PlacementDrive } from "@/components/placements/UpcomingDrives";
import SectorDistribution from "@/components/placements/SectorDistribution";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const topRecruiters: Recruiter[] = [
    {
        id: "1",
        name: "Google",
        sector: "Technology",
        offers: 45,
        package: "$145K",
        color: "bg-blue-500",
    },
    {
        id: "2",
        name: "McKinsey & Co",
        sector: "Consulting",
        offers: 32,
        package: "$95K",
        color: "bg-emerald-500",
    },
    {
        id: "3",
        name: "Goldman Sachs",
        sector: "Finance",
        offers: 28,
        package: "$135K",
        color: "bg-orange-500",
    },
    {
        id: "4",
        name: "Amazon",
        sector: "Technology",
        offers: 38,
        package: "$135K",
        color: "bg-purple-500",
    },
    {
        id: "5",
        name: "Deloitte",
        sector: "Consulting",
        offers: 42,
        package: "$125K",
        color: "bg-pink-500",
    },
    {
        id: "6",
        name: "JP Morgan",
        sector: "Finance",
        offers: 35,
        package: "$140K",
        color: "bg-blue-600",
    },
];

const partnerCompanies: Company[] = [
    { id: "1", name: "Google", sector: "technology", color: "bg-blue-500" },
    { id: "2", name: "McKinsey & Co", sector: "consulting", color: "bg-emerald-500" },
    { id: "3", name: "Goldman Sachs", sector: "finance", color: "bg-orange-500" },
    { id: "4", name: "Amazon", sector: "technology", color: "bg-purple-500" },
    { id: "5", name: "Deloitte", sector: "consulting", color: "bg-pink-500" },
];

const upcomingDrives: PlacementDrive[] = [
    {
        id: "1",
        company: "Microsoft",
        date: "2024-01-28",
        roles: ["Product Manager", "Software Engineer"],
        registrations: 156,
        status: "upcoming",
        companyColor: "bg-blue-500",
    },
    {
        id: "2",
        company: "BCG",
        date: "2024-01-22",
        roles: ["Business Analyst", "Consultant"],
        registrations: 89,
        status: "upcoming",
        companyColor: "bg-emerald-500",
    },
    {
        id: "3",
        company: "Apple",
        date: "2024-01-25",
        roles: ["Marketing Manager"],
        registrations: 67,
        status: "upcoming",
        companyColor: "bg-gray-500",
    },
    {
        id: "4",
        company: "Tesla",
        date: "2024-01-18",
        roles: ["Operations Manager"],
        registrations: 45,
        status: "today",
        companyColor: "bg-red-500",
    },
];

const sectorData = [
    { name: "Technology", percentage: 35, color: "bg-blue-500" },
    { name: "Consulting", percentage: 28, color: "bg-emerald-500" },
    { name: "Finance", percentage: 22, color: "bg-orange-500" },
    { name: "Healthcare", percentage: 10, color: "bg-purple-500" },
    { name: "Others", percentage: 5, color: "bg-gray-500" },
];

const Placements = () => {
    const [companies, setCompanies] = useState<Company[]>(partnerCompanies);
    const [drives, setDrives] = useState<PlacementDrive[]>(upcomingDrives);

    const handleAddRecruiter = () => {
        toast({
            title: "Add Recruiter",
            description: "Opening recruiter registration form...",
        });
    };

    const handleScheduleDrive = () => {
        toast({
            title: "Schedule Drive",
            description: "Opening placement drive scheduling form...",
        });
    };

    const handleViewDriveDetails = (id: string) => {
        const drive = drives.find((d) => d.id === id);
        toast({
            title: "View Drive Details",
            description: `Opening details for ${drive?.company}`,
        });
    };

    const handleEditDrive = (id: string) => {
        const drive = drives.find((d) => d.id === id);
        toast({
            title: "Edit Drive",
            description: `Editing ${drive?.company} placement drive`,
        });
    };

    const handleCompanyClick = (id: string) => {
        const company = companies.find((c) => c.id === id);
        toast({
            title: "Company Details",
            description: `Viewing details for ${company?.name}`,
        });
    };

    const handleAddCompany = () => {
        toast({
            title: "Add Company",
            description: "Opening company registration form...",
        });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Placements & Recruiters
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Track placement statistics and manage recruiter relationships
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={handleAddRecruiter}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        Add Recruiter
                    </Button>
                    <Button
                        onClick={handleScheduleDrive}
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    >
                        <Calendar className="w-4 h-4" />
                        Schedule Drive
                    </Button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PlacementStatCard
                    title="Total Placements"
                    value="1,168"
                    change="↑ +8.2% from last year"
                    icon={<Users className="w-6 h-6 text-white" />}
                    iconColor="bg-emerald-500"
                />
                <PlacementStatCard
                    title="Average Package"
                    value="$95K"
                    change="↑ +12.5% from last year"
                    icon={<DollarSign className="w-6 h-6 text-white" />}
                    iconColor="bg-blue-500"
                />
                <PlacementStatCard
                    title="Highest Package"
                    value="$180K"
                    change="↑ +18.3% from last year"
                    icon={<TrendingUp className="w-6 h-6 text-white" />}
                    iconColor="bg-orange-500"
                />
                <PlacementStatCard
                    title="Placement Rate"
                    value="94.2%"
                    change="↑ +2.8% from last year"
                    icon={<Percent className="w-6 h-6 text-white" />}
                    iconColor="bg-purple-500"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Charts */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Package Trend Chart */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Average Package Trend</CardTitle>
                                <span className="text-sm text-emerald-600 font-medium">
                                    +12.5% YoY
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                                <div className="text-center">
                                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">Package trend chart</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sector Distribution */}
                    <SectorDistribution sectors={sectorData} />
                </div>

                {/* Right Column - Top Recruiters */}
                <div>
                    <TopRecruiters recruiters={topRecruiters} />
                </div>
            </div>

            {/* Partner Companies */}
            <PartnerCompanies
                companies={companies}
                onCompanyClick={handleCompanyClick}
                onAddCompany={handleAddCompany}
            />

            {/* Upcoming Drives */}
            <UpcomingDrives
                drives={drives}
                onViewDetails={handleViewDriveDetails}
                onEdit={handleEditDrive}
            />
        </div>
    );
};

export default Placements;
