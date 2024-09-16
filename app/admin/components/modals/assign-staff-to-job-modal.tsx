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
import axios from "axios";

interface AssignStaffToJobModalProps {
  jobId: string;
}

function AssignStaffToJobModal({ jobId }: AssignStaffToJobModalProps) {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   const response = await getResponse();
    //   if (response && response.data.success) {
    //     if (role === "STAFF" && handleStaffUsersUpdate) {
    //       handleStaffUsersUpdate(id, "APPROVED");
    //     }
    //     if (role === "FACILITY" && handleFacilityUsersUpdate) {
    //       handleFacilityUsersUpdate(id, "APPROVED");
    //     }
    //     toast({
    //       variant: "default",
    //       title: "Success!",
    //       description: "Application has been approved.",
    //     });

    //     return;
    //   }

    //   toast({
    //     variant: "destructive",
    //     title: "Something went wrong.",
    //     description: "Application status could not be updated.",
    //   });
    // } catch (error) {
    //   console.log("Error", error);
    //   toast({
    //     variant: "destructive",
    //     title: "Something went wrong.",
    //     description: "Application status could not be updated.",
    //   });
    // }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full border-0 justify-start flex pl-2 font-normal hover:bg-green-600 hover:text-white"
          variant="outline"
        >
          Assign Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Assing staff to this job</DialogTitle>
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
export default AssignStaffToJobModal;
