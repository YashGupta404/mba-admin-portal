import { useState } from "react";
import { RefreshCw, Users, GraduationCap, Briefcase, UserCheck, Plus, TrendingUp, TrendingDown, Percent, Hash } from "lucide-react";
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
import StatCard from "@/components/dashboard/StatCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import QuickActions from "@/components/dashboard/QuickActions";
import EnrollmentTrends from "@/components/dashboard/EnrollmentTrends";
import DepartmentDistribution from "@/components/dashboard/DepartmentDistribution";
import { LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Icon options for stat cards
const iconOptions = [
  { value: "users", label: "Users", icon: Users },
  { value: "graduation", label: "Graduation", icon: GraduationCap },
  { value: "briefcase", label: "Briefcase", icon: Briefcase },
  { value: "usercheck", label: "User Check", icon: UserCheck },
  { value: "trending", label: "Trending", icon: TrendingUp },
  { value: "percent", label: "Percent", icon: Percent },
  { value: "hash", label: "Hash", icon: Hash },
];

const colorOptions = [
  { value: "icon-blue", label: "Blue" },
  { value: "icon-green", label: "Green" },
  { value: "icon-orange", label: "Orange" },
  { value: "icon-pink", label: "Pink" },
  { value: "icon-purple", label: "Purple" },
];

interface StatCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  iconType: string;
  iconColorClass: string;
}

const getIconByType = (type: string): LucideIcon => {
  const found = iconOptions.find(opt => opt.value === type);
  return found?.icon || Users;
};

const Dashboard = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<StatCardData | null>(null);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    change: "",
    changePositive: true,
    iconType: "users",
    iconColorClass: "icon-blue",
  });

  // Initial stat cards data
  const [statCards, setStatCards] = useState<StatCardData[]>([
    {
      id: "1",
      title: "Total Active Students",
      value: "1,247",
      change: "+12% from last month",
      changePositive: true,
      iconType: "users",
      iconColorClass: "icon-blue",
    },
    {
      id: "2",
      title: "Course Enrollment Rate",
      value: "89.5%",
      change: "+5.2% from last month",
      changePositive: true,
      iconType: "graduation",
      iconColorClass: "icon-green",
    },
    {
      id: "3",
      title: "Placement Success",
      value: "94.2%",
      change: "+8.1% from last month",
      changePositive: true,
      iconType: "briefcase",
      iconColorClass: "icon-orange",
    },
    {
      id: "4",
      title: "Faculty Strength",
      value: "156",
      change: "+3 from last month",
      changePositive: true,
      iconType: "usercheck",
      iconColorClass: "icon-pink",
    },
  ]);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated successfully.",
    });
    setIsRefreshing(false);
  };

  const openAddModal = () => {
    setEditingCard(null);
    setFormData({
      title: "",
      value: "",
      change: "",
      changePositive: true,
      iconType: "users",
      iconColorClass: "icon-blue",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (card: StatCardData) => {
    setEditingCard(card);
    setFormData({
      title: card.title,
      value: card.value,
      change: card.change,
      changePositive: card.changePositive,
      iconType: card.iconType,
      iconColorClass: card.iconColorClass,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.value) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingCard) {
      // Update existing card
      setStatCards(cards =>
        cards.map(card =>
          card.id === editingCard.id
            ? { ...card, ...formData }
            : card
        )
      );
      toast({
        title: "Card Updated",
        description: `"${formData.title}" has been updated successfully.`,
      });
    } else {
      // Add new card
      const newCard: StatCardData = {
        id: Date.now().toString(),
        ...formData,
      };
      setStatCards(cards => [...cards, newCard]);
      toast({
        title: "Card Added",
        description: `"${formData.title}" has been added to the dashboard.`,
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (cardId: string) => {
    setCardToDelete(cardId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (cardToDelete) {
      const cardToRemove = statCards.find(c => c.id === cardToDelete);
      setStatCards(cards => cards.filter(card => card.id !== cardToDelete));
      toast({
        title: "Card Deleted",
        description: `"${cardToRemove?.title}" has been removed from the dashboard.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setCardToDelete(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening at your institution.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={openAddModal}
          >
            <Plus className="w-4 h-4" />
            Add Info
          </Button>
          <Button
            variant="refresh"
            className="gap-2"
            onClick={handleRefreshData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard
            key={card.id}
            title={card.title}
            value={card.value}
            change={card.change}
            changePositive={card.changePositive}
            icon={getIconByType(card.iconType)}
            iconColorClass={card.iconColorClass}
            onEdit={() => openEditModal(card)}
            onDelete={() => handleDeleteClick(card.id)}
          />
        ))}
      </div>

      {/* Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentTrends />
        <DepartmentDistribution />
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingCard ? 'Edit Stat Card' : 'Add New Stat Card'}</DialogTitle>
            <DialogDescription>
              {editingCard
                ? 'Modify the details of this stat card.'
                : 'Create a new stat card to display on your dashboard.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Total Active Students"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="value">Value *</Label>
              <Input
                id="value"
                placeholder="e.g., 1,247 or 89.5%"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="change">Change Text</Label>
              <Input
                id="change"
                placeholder="e.g., +12% from last month"
                value={formData.change}
                onChange={(e) => setFormData({ ...formData, change: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Trend Direction</Label>
                <Select
                  value={formData.changePositive ? "positive" : "negative"}
                  onValueChange={(value) => setFormData({ ...formData, changePositive: value === "positive" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Positive
                      </div>
                    </SelectItem>
                    <SelectItem value="negative">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-destructive" />
                        Negative
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Icon Color</Label>
                <Select
                  value={formData.iconColorClass}
                  onValueChange={(value) => setFormData({ ...formData, iconColorClass: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${color.value}`}></div>
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Icon</Label>
              <Select
                value={formData.iconType}
                onValueChange={(value) => setFormData({ ...formData, iconType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingCard ? 'Save Changes' : 'Add Card'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this stat card from your dashboard. This action cannot be undone.
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

export default Dashboard;
