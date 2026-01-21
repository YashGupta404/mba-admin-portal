import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Department {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

const colorOptions = [
  { value: "bg-action-blue", label: "Blue", displayColor: "bg-blue-500" },
  { value: "bg-action-green", label: "Green", displayColor: "bg-emerald-500" },
  { value: "bg-action-orange", label: "Orange", displayColor: "bg-orange-500" },
  { value: "bg-action-cyan", label: "Cyan", displayColor: "bg-cyan-500" },
  { value: "bg-action-pink", label: "Pink", displayColor: "bg-pink-500" },
  { value: "bg-action-purple", label: "Purple", displayColor: "bg-purple-500" },
];

const DepartmentDistribution = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deptToDelete, setDeptToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    percentage: "",
    color: "bg-action-blue",
  });

  const [departments, setDepartments] = useState<Department[]>([
    { id: "1", name: "Finance", percentage: 35, color: "bg-action-blue" },
    { id: "2", name: "Marketing", percentage: 28, color: "bg-action-green" },
    { id: "3", name: "Operations", percentage: 22, color: "bg-action-orange" },
    { id: "4", name: "HR", percentage: 15, color: "bg-action-cyan" },
  ]);

  const openAddModal = () => {
    setEditingDept(null);
    setFormData({
      name: "",
      percentage: "",
      color: "bg-action-blue",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (dept: Department) => {
    setEditingDept(dept);
    setFormData({
      name: dept.name,
      percentage: dept.percentage.toString(),
      color: dept.color,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.percentage) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const percentage = parseInt(formData.percentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      toast({
        title: "Validation Error",
        description: "Percentage must be a number between 0 and 100.",
        variant: "destructive",
      });
      return;
    }

    if (editingDept) {
      setDepartments(depts =>
        depts.map(dept =>
          dept.id === editingDept.id
            ? { ...dept, name: formData.name, percentage, color: formData.color }
            : dept
        )
      );
      toast({
        title: "Department Updated",
        description: `"${formData.name}" has been updated successfully.`,
      });
    } else {
      const newDept: Department = {
        id: Date.now().toString(),
        name: formData.name,
        percentage,
        color: formData.color,
      };
      setDepartments(depts => [...depts, newDept]);
      toast({
        title: "Department Added",
        description: `"${formData.name}" has been added to the distribution.`,
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (deptId: string) => {
    setDeptToDelete(deptId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deptToDelete) {
      const deptToRemove = departments.find(d => d.id === deptToDelete);
      setDepartments(depts => depts.filter(dept => dept.id !== deptToDelete));
      toast({
        title: "Department Deleted",
        description: `"${deptToRemove?.name}" has been removed from the distribution.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setDeptToDelete(null);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Department Distribution</h3>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-primary hover:text-primary hover:bg-primary/10"
          onClick={openAddModal}
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      <div className="space-y-5">
        {departments.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            No departments added yet. Click "Add" to create one.
          </div>
        ) : (
          departments.map((dept) => (
            <div key={dept.id} className="space-y-2 group relative">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{dept.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{dept.percentage}%</span>
                  {/* Edit/Delete buttons */}
                  <div className="flex items-center gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => openEditModal(dept)}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteClick(dept.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${dept.color}`}
                  style={{ width: `${dept.percentage}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingDept ? 'Edit Department' : 'Add New Department'}</DialogTitle>
            <DialogDescription>
              {editingDept
                ? 'Modify the details of this department.'
                : 'Add a new department to the distribution chart.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="deptName">Department Name *</Label>
              <Input
                id="deptName"
                placeholder="e.g., Finance, Marketing, HR"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="percentage">Percentage (%) *</Label>
              <Input
                id="percentage"
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 35"
                value={formData.percentage}
                onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Color</Label>
              <Select
                value={formData.color}
                onValueChange={(value) => setFormData({ ...formData, color: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${color.displayColor}`}></div>
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingDept ? 'Save Changes' : 'Add Department'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Department?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this department from the distribution chart. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DepartmentDistribution;
