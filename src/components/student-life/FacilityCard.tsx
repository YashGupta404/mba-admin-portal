import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Facility {
    id: number;
    title: string;
    details: string;
}

interface FacilityCardProps {
    facility: Facility;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const FacilityCard = ({ facility, onEdit, onDelete }: FacilityCardProps) => {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-2">
                            {facility.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {facility.details}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => onEdit(facility.id)}
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => onDelete(facility.id)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default FacilityCard;
