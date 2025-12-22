import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
    label: string;
    value: string | number;
    variant: "blue" | "green" | "orange" | "gray";
}

const variantStyles = {
    blue: "bg-blue-500/10 text-blue-700",
    green: "bg-emerald-500/10 text-emerald-700",
    orange: "bg-orange-500/10 text-orange-700",
    gray: "bg-gray-500/10 text-gray-700",
};

const EnquiryStatCard = ({ label, value, variant }: StatCardProps) => {
    return (
        <div className={`rounded-lg p-4 ${variantStyles[variant]}`}>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className="text-sm font-medium">{label}</div>
        </div>
    );
};

const EnquiryStatistics = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Enquiry Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <EnquiryStatCard label="New Enquiries" value={24} variant="blue" />
                    <EnquiryStatCard label="Responded" value={18} variant="green" />
                    <EnquiryStatCard label="In Progress" value={6} variant="orange" />
                    <EnquiryStatCard label="Closed" value={42} variant="gray" />
                </div>

                <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold text-sm mb-3">Response Time</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Average Response Time</span>
                            <span className="font-medium">2.5 hours</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fastest Response</span>
                            <span className="font-medium">15 minutes</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Resolution Rate</span>
                            <span className="font-medium">94.2%</span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold text-sm mb-3">Enquiry Sources</h4>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Website Form</span>
                                <span className="font-medium">45%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Email</span>
                                <span className="font-medium">30%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "30%" }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Phone</span>
                                <span className="font-medium">25%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-orange-500 h-2 rounded-full" style={{ width: "25%" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EnquiryStatistics;
