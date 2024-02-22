import React from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog";
import { useToast } from "../../../components/ui/use-toast";
import { userProvider } from "@/app/providers/userProvider";
import { StaffUser } from "../../staff/page";

interface ApproveStatusModalProps {
  row: any;
  id: string;
  role: "STAFF" | "FACILITY";
  handleStaffUsersUpdate: (id: string, status: "APPROVED" | "REJECTED") => void;
}

export function ApproveStatusModal({
  row,
  id,
  handleStaffUsersUpdate,
}: ApproveStatusModalProps) {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userProvider.updateUserStatus(id, "APPROVED");
      handleStaffUsersUpdate(id, "APPROVED");
      toast({
        variant: "default",
        title: "Success!",
        description: "Application has been approved.",
      });
    } catch (error) {
      console.log("Error", error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Application status could not be updated.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full border-0 justify-start flex pl-2 font-normal hover:bg-green-600 hover:text-white"
          variant="outline"
        >
          Approve
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Do you wish to approve this complication?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-5 my-5">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="default"
              className="bg-green-600 hover:bg-green-400"
            >
              Yes, Approve
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
