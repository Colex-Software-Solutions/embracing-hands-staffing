// JobStatusUpdateModal.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import axios from "axios";
import { JobStatus } from "@prisma/client";

interface CompleteJobModalProps {
  jobId: string;
  onUpdate: (id: string, newStatus: JobStatus) => void;
}

function CompleteJobModal({ jobId, onUpdate }: CompleteJobModalProps) {
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: JobStatus) => {
    try {
      const response = await axios.put(
        `/api/job-post/${jobId}/update-job-status`,
        {
          status: newStatus,
        }
      );

      if (response.data.success) {
        onUpdate(jobId, newStatus);
        toast({
          variant: "default",
          title: "Success!",
          description: `Job status updated to ${newStatus}.`,
        });
      } else {
        throw new Error("Failed to update job status");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Failed to update job status: " + error?.response.statusText,
      });
      console.error("Error updating job status:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full border-0 justify-start flex pl-2 font-normal hover:bg-green-600 hover:text-white"
          variant="outline"
        >
          Complete Job
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you wish to complete this job post?</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between p-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={() => handleStatusChange("COMPLETED")}>
            Yes, Complete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CompleteJobModal;
