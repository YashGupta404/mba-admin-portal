import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { programsApi, type Program } from "@/services/coursesApi";

interface ProgramSettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    programId: string;
    onSave: () => void;
}

interface Specialization {
    name: string;
    description: string;
}

interface AdmissionStep {
    step: number;
    title: string;
    description: string;
}

const ProgramSettingsModal = ({ open, onOpenChange, programId, onSave }: ProgramSettingsModalProps) => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [programData, setProgramData] = useState<Program | null>(null);
    const [overview, setOverview] = useState("");


    // Dynamic lists
    const [overviewText, setOverviewText] = useState("");

    const [features, setFeatures] = useState<string[]>([]);
    const [specializations, setSpecializations] = useState<Specialization[]>([]);
    const [eligibilityCriteria, setEligibilityCriteria] = useState<string[]>([]);
    const [admissionProcess, setAdmissionProcess] = useState<AdmissionStep[]>([]);

    useEffect(() => {
        if (open && programId) {
            fetchProgramData();
        }
    }, [open, programId]);

    const fetchProgramData = async () => {
        try {
            setLoading(true);
            const data = await programsApi.getByProgramId(programId);
            setProgramData(data);

            // Set overview from description
            setOverview(data.description || "");
            setOverviewText(data.overviewText || "");

            setFeatures(data.features || []);
            setSpecializations(data.specializations || []);
            setEligibilityCriteria(data.eligibilityCriteria || []);
            setAdmissionProcess(data.admissionProcess || []);
        } catch (error) {
            console.error('Error fetching program:', error);
            toast({
                title: "Error",
                description: "Failed to load program details.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Features handlers
    const addFeature = () => setFeatures([...features, ""]);
    const updateFeature = (index: number, value: string) => {
        const updated = [...features];
        updated[index] = value;
        setFeatures(updated);
    };
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

    // Specializations handlers
    const addSpecialization = () => setSpecializations([...specializations, { name: "", description: "" }]);
    const updateSpecialization = (index: number, field: keyof Specialization, value: string) => {
        const updated = [...specializations];
        updated[index][field] = value;
        setSpecializations(updated);
    };
    const removeSpecialization = (index: number) => setSpecializations(specializations.filter((_, i) => i !== index));

    // Eligibility handlers
    const addEligibility = () => setEligibilityCriteria([...eligibilityCriteria, ""]);
    const updateEligibility = (index: number, value: string) => {
        const updated = [...eligibilityCriteria];
        updated[index] = value;
        setEligibilityCriteria(updated);
    };
    const removeEligibility = (index: number) => setEligibilityCriteria(eligibilityCriteria.filter((_, i) => i !== index));

    // Admission Process handlers
    const addAdmissionStep = () => {
        const newStep: AdmissionStep = {
            step: admissionProcess.length + 1,
            title: "",
            description: "",
        };
        setAdmissionProcess([...admissionProcess, newStep]);
    };

    const updateAdmissionStep = (index: number, field: keyof Omit<AdmissionStep, 'step'>, value: string) => {
        const updated = [...admissionProcess];
        updated[index][field] = value;
        setAdmissionProcess(updated);
    };

    const removeAdmissionStep = (index: number) => {
        const filtered = admissionProcess.filter((_, i) => i !== index);
        const renumbered = filtered.map((step, i) => ({ ...step, step: i + 1 }));
        setAdmissionProcess(renumbered);
    };

    const handleSave = async () => {
        try {
            if (!programData) return;

            setSaving(true);

            const updatedProgram = {
                description: overview, // ✅ THIS IS STEP 2
                features: features.filter(f => f.trim() !== ""),
                specializations: specializations.filter(s => s.name.trim() !== ""),
                eligibilityCriteria: eligibilityCriteria.filter(e => e.trim() !== ""),
                admissionProcess: admissionProcess.filter(a => a.title.trim() !== ""),
            };


            await programsApi.update(programData._id, updatedProgram);

            toast({
                title: "Success",
                description: "Program settings updated successfully!",
            });

            onSave();
            onOpenChange(false);
        } catch (error) {
            console.error('Error saving program:', error);
            toast({
                title: "Error",
                description: "Failed to update program. Please try again.",
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Program Settings - {programData?.name}</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="specializations">Specializations</TabsTrigger>
                        <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                        <TabsTrigger value="admission">Admission Process</TabsTrigger>
                    </TabsList>

                    {/* Program Overview Tab */}
                    <TabsContent value="overview" className="space-y-4 mt-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Program Overview Text</Label>
                                <Textarea
                                    value={overview}
                                    onChange={(e) => setOverview(e.target.value)}
                                    rows={8}
                                    placeholder="Enter program overview description that will be displayed on the main website..."
                                    className="resize-none"
                                />
                                <p className="text-xs text-muted-foreground">
                                    This text will be displayed in the "Program Overview" section on the main website.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Syllabus PDF</Label>
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="file"
                                        accept=".pdf,.txt"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                toast({
                                                    title: "File Selected",
                                                    description: `${file.name} ready to upload`,
                                                });
                                            }
                                        }}
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            // For now, download a sample hello.txt file
                                            const element = document.createElement('a');
                                            const file = new Blob(['Hello! This is a sample syllabus file.'], { type: 'text/plain' });
                                            element.href = URL.createObjectURL(file);
                                            element.download = 'syllabus.txt';
                                            document.body.appendChild(element);
                                            element.click();
                                            document.body.removeChild(element);
                                        }}
                                    >
                                        Download Current
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Upload a PDF or TXT file. This will be available for download on the main website.
                                </p>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Features Tab */}
                    <TabsContent value="features" className="space-y-4 mt-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Add key features and highlights of the program
                            </p>
                            <Button onClick={addFeature} size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Feature
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        value={feature}
                                        onChange={(e) => updateFeature(index, e.target.value)}
                                        placeholder="Enter feature description..."
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFeature(index)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}

                            {features.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground py-8">
                                    No features added yet. Click "Add Feature" to get started.
                                </p>
                            )}
                        </div>
                    </TabsContent>

                    {/* Specializations Tab */}
                    <TabsContent value="specializations" className="space-y-4 mt-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Add available specialization tracks
                            </p>
                            <Button onClick={addSpecialization} size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Specialization
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {specializations.map((spec, index) => (
                                <Card key={index} className="p-4 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-3">
                                            <div className="space-y-2">
                                                <Label>Name *</Label>
                                                <Input
                                                    value={spec.name}
                                                    onChange={(e) => updateSpecialization(index, 'name', e.target.value)}
                                                    placeholder="e.g., Finance & Strategy"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Description</Label>
                                                <Textarea
                                                    value={spec.description}
                                                    onChange={(e) => updateSpecialization(index, 'description', e.target.value)}
                                                    rows={3}
                                                    placeholder="Brief description of this specialization..."
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeSpecialization(index)}
                                            className="ml-2"
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}

                            {specializations.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground py-8">
                                    No specializations added yet. Click "Add Specialization" to get started.
                                </p>
                            )}
                        </div>
                    </TabsContent>

                    {/* Eligibility Tab */}
                    <TabsContent value="eligibility" className="space-y-4 mt-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Add admission eligibility requirements
                            </p>
                            <Button onClick={addEligibility} size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Criterion
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {eligibilityCriteria.map((criterion, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        value={criterion}
                                        onChange={(e) => updateEligibility(index, e.target.value)}
                                        placeholder="Enter eligibility criterion..."
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeEligibility(index)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}

                            {eligibilityCriteria.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground py-8">
                                    No eligibility criteria added yet. Click "Add Criterion" to get started.
                                </p>
                            )}
                        </div>
                    </TabsContent>

                    {/* Admission Process Tab */}
                    <TabsContent value="admission" className="space-y-4 mt-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Add steps in the admission process
                            </p>
                            <Button onClick={addAdmissionStep} size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Step
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {admissionProcess.map((step, index) => (
                                <Card key={index} className="p-4 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                                                    {step.step}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <Label>Title *</Label>
                                                    <Input
                                                        value={step.title}
                                                        onChange={(e) => updateAdmissionStep(index, 'title', e.target.value)}
                                                        placeholder="e.g., Submit online application form"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Description</Label>
                                                <Textarea
                                                    value={step.description}
                                                    onChange={(e) => updateAdmissionStep(index, 'description', e.target.value)}
                                                    rows={2}
                                                    placeholder="Brief description of this step..."
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeAdmissionStep(index)}
                                            className="ml-2"
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}

                            {admissionProcess.length === 0 && (
                                <p className="text-center text-sm text-muted-foreground py-8">
                                    No admission steps added yet. Click "Add Step" to get started.
                                </p>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-primary text-primary-foreground"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProgramSettingsModal;
