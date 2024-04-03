import React from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import JobPostingForm from "../create-shift-form";
import { JobPost } from "@prisma/client";
import { PlusCircledIcon } from "@radix-ui/react-icons";

interface AddShiftModalProps {
  row: any;
  jobPostId: string;
  handleJobPostUpdate: (newJob: JobPost) => void;
}

export function AddShiftModal({
  row,
  jobPostId,
  handleJobPostUpdate,
}: AddShiftModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add Shift
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Shift</DialogTitle>
        </DialogHeader>
        <JobPostingForm
          jobPostId={jobPostId}
          currentJob={row.original as JobPost}
          handleJobPostUpdate={handleJobPostUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
