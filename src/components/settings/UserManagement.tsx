import { Check, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Role {
    name: string;
    description: string;
    permissions: {
        name: string;
        granted: boolean;
    }[];
    usersAssigned: number;
}

const roles: Role[] = [
    {
        name: "Super Admin",
        description: "Full system access and control",
        permissions: [
            { name: "All permissions", granted: true },
            { name: "User management", granted: true },
            { name: "System settings", granted: true },
        ],
        usersAssigned: 2,
    },
    {
        name: "Admin",
        description: "Manage courses and faculty",
        permissions: [
            { name: "Course management", granted: true },
            { name: "Faculty management", granted: true },
            { name: "System settings", granted: false },
        ],
        usersAssigned: 5,
    },
    {
        name: "Faculty",
        description: "Manage assigned courses only",
        permissions: [
            { name: "View courses", granted: true },
            { name: "Update content", granted: true },
            { name: "User management", granted: false },
        ],
        usersAssigned: 156,
    },
];

const UserManagement = () => {
    const handleAddUser = () => {
        toast({
            title: "Add User",
            description: "Opening user creation form...",
        });
    };

    const handleSaveChanges = () => {
        toast({
            title: "Changes Saved",
            description: "User roles and permissions have been updated.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">User Roles & Permissions</h3>
                <Button
                    onClick={handleAddUser}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {roles.map((role) => (
                    <div
                        key={role.name}
                        className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
                    >
                        <h4 className="text-lg font-semibold text-foreground mb-2">{role.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

                        <div className="space-y-2 mb-4">
                            {role.permissions.map((permission) => (
                                <div key={permission.name} className="flex items-center gap-2 text-sm">
                                    {permission.granted ? (
                                        <Check className="w-4 h-4 text-emerald-600" />
                                    ) : (
                                        <X className="w-4 h-4 text-red-600" />
                                    )}
                                    <span className={permission.granted ? "text-foreground" : "text-muted-foreground line-through"}>
                                        {permission.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">{role.usersAssigned}</span> users assigned
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={handleSaveChanges}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default UserManagement;
