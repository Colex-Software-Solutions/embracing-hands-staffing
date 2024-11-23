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

interface RemoveUserButtonProps {
  isStaff: boolean;
  name: string;
  userId: string;
  onSuccess: (id: string) => void;
}

const RemoveUserButton: React.FC<RemoveUserButtonProps> = ({
  isStaff,
  name,
  userId,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.delete("/api/users/", {
        data: { id: userId },
      });

      if (response.data.success) {
        toast({
          variant: "default",
          title: "User has been successfully removed",
        });
        await onSuccess(userId);
      } else {
        toast({
          variant: "destructive",
          title: "Could not remove user",
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Could not remove user",
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
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
          <DialogTitle>Remove {name}</DialogTitle>
          <DialogDescription>
            Are you sure you wish to remove this{" "}
            {isStaff ? "staff" : "facility"} user?
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

export default RemoveUserButton;
