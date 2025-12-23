import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import FacilityCard, { Facility } from "./FacilityCard";
import CreateFacilityModal, { FacilityFormData } from "./CreateFacilityModal";
import { toast } from "@/hooks/use-toast";

const API_URL = "http://localhost:5000";

const FacilitiesTab = () => {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch facilities from API
    const fetchFacilities = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/facilities`);
            if (response.ok) {
                const data = await response.json();
                setFacilities(data);
            } else {
                toast({
                    title: "Error",
                    description: "Failed to fetch facilities",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error fetching facilities:", error);
            toast({
                title: "Error",
                description: "Failed to connect to server",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFacilities();
    }, []);

    const handleAddFacility = async (data: FacilityFormData) => {
        try {
            if (editingFacility) {
                // Update existing facility
                const response = await fetch(
                    `${API_URL}/api/facilities/${editingFacility.id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: editingFacility.id,
                            ...data,
                        }),
                    }
                );

                if (response.ok) {
                    await fetchFacilities();
                    toast({
                        title: "Facility Updated",
                        description: `${data.title} has been updated successfully.`,
                    });
                } else {
                    toast({
                        title: "Error",
                        description: "Failed to update facility",
                        variant: "destructive",
                    });
                }
            } else {
                // Create new facility
                const newId = Math.max(...facilities.map((f) => f.id), 0) + 1;
                const response = await fetch(`${API_URL}/api/facilities`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: newId,
                        ...data,
                    }),
                });

                if (response.ok) {
                    await fetchFacilities();
                    toast({
                        title: "Facility Added",
                        description: `${data.title} has been added successfully.`,
                    });
                } else {
                    toast({
                        title: "Error",
                        description: "Failed to add facility",
                        variant: "destructive",
                    });
                }
            }
            setEditingFacility(null);
        } catch (error) {
            console.error("Error saving facility:", error);
            toast({
                title: "Error",
                description: "Failed to save facility",
                variant: "destructive",
            });
        }
    };

    const handleEditFacility = (id: number) => {
        const facility = facilities.find((f) => f.id === id);
        if (facility) {
            setEditingFacility(facility);
            setIsModalOpen(true);
        }
    };

    const handleDeleteFacility = async (id: number) => {
        try {
            const facility = facilities.find((f) => f.id === id);
            const response = await fetch(`${API_URL}/api/facilities/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchFacilities();
                toast({
                    title: "Facility Deleted",
                    description: `${facility?.title} has been removed.`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to delete facility",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error deleting facility:", error);
            toast({
                title: "Error",
                description: "Failed to delete facility",
                variant: "destructive",
            });
        }
    };

    const handleModalClose = (open: boolean) => {
        setIsModalOpen(open);
        if (!open) {
            setEditingFacility(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">Loading facilities...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-foreground">
                        Campus Facilities
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage campus facilities and infrastructure
                    </p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Facility
                </Button>
            </div>

            {/* Facilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility) => (
                    <FacilityCard
                        key={facility.id}
                        facility={facility}
                        onEdit={handleEditFacility}
                        onDelete={handleDeleteFacility}
                    />
                ))}
            </div>

            {facilities.length === 0 && (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <p className="text-muted-foreground">
                        No facilities found. Add your first facility to get started.
                    </p>
                </div>
            )}

            {/* Create/Edit Facility Modal */}
            <CreateFacilityModal
                open={isModalOpen}
                onOpenChange={handleModalClose}
                onSubmit={handleAddFacility}
                editingFacility={editingFacility}
            />
        </div>
    );
};

export default FacilitiesTab;
