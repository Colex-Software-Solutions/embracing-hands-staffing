import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";
import { Loader } from "lucide-react";

interface RemoveShiftButtonProps {
  shiftId: string;
  handleDeleteShift: (shiftId: string) => void;
}

const RemoveShiftButton: React.FC<RemoveShiftButtonProps> = ({
  shiftId,
  handleDeleteShift,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await handleDeleteShift(shiftId);
      toast({
        title: "Shift Removed",
        description: "The shift has been successfully removed.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove the shift.",
        variant: "destructive",
      });
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <span className="line-clamp-2">Remove</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Shift</DialogTitle>
          <DialogDescription>
            Are you sure you wish to remove this shift?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="flex gap-3">
            <Button type="button" variant="secondary" disabled={loading}>
              Close
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveShiftButton;
