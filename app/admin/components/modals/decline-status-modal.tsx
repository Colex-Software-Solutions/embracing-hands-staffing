import React from "react";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog";
import axios from "axios";

interface DeclineStatusModalProps {
  id: string;
  role: "STAFF" | "FACILITY";
  handleStaffUsersUpdate: (id: string, status: "APPROVED" | "REJECTED") => void;
}

export function DeclineStatusModal({
  id,
  handleStaffUsersUpdate,
}: DeclineStatusModalProps) {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/staff", {
        id,
        status: "REJECTED",
      });
      if (response.data.success) {
        handleStaffUsersUpdate(id, "REJECTED");
        toast({
          variant: "default",
          title: "Success!",
          description: "Application has been rejected.",
        });

        return;
      }

      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Application status could not be updated.",
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
          className="w-full border-0 justify-start flex pl-2 font-normal hover:bg-red-600 hover:text-white"
          variant="outline"
        >
          Reject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Do you wish to reject this application?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-5 my-5">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="default"
                className="bg-red-600 hover:bg-red-400"
              >
                Yes, Reject
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
