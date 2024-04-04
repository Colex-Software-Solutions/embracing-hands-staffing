import React from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { JobPost } from "@prisma/client";
import JobPostingForm from "../../../job-post/components/job-posting-form";

interface ViewAndEditModalProps {
  row: any;
  id: string;
  handleJobPostUpdate: (newJob: JobPost) => void;
}

export function ViewAndEditModal({
  row,
  id,
  handleJobPostUpdate,
}: ViewAndEditModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full border-0 justify-start flex pl-2 font-normal"
          variant="outline"
        >
          View / Edit Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] max-h-[900px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>
        <JobPostingForm
          currentJob={row.original as JobPost}
          handleJobPostUpdate={handleJobPostUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
