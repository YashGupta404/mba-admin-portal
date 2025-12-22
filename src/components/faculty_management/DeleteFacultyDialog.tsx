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

interface DeleteFacultyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    facultyName: string;
    onConfirm: () => void;
    isDeleting?: boolean;
}

const DeleteFacultyDialog = ({
    open,
    onOpenChange,
    facultyName,
    onConfirm,
    isDeleting = false,
}: DeleteFacultyDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-card border-border">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-foreground">
                        Delete Faculty Member
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                        Are you sure you want to delete <strong>{facultyName}</strong>? This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="border-border"
                        disabled={isDeleting}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteFacultyDialog;
