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
import dynamic from "next/dynamic";
import LoadGoogleMapsScript from "@/app/components/Scripts/LoadGoogleMapsScript";
const JobPostingForm = dynamic(
  () => import("../../../job-post/components/job-posting-form"),
  { ssr: false }
);

interface ViewAndEditModalProps {
  row: any;
  id: string;
  handleJobPostUpdate: (newJob: JobPost) => void;
}

function ViewAndEditModal({
  row,
  id,
  handleJobPostUpdate,
}: ViewAndEditModalProps) {
  return (
    <>
      <LoadGoogleMapsScript />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-full border-0 justify-start flex pl-2 font-normal"
            variant="outline"
          >
            View / Edit Job
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1200px] max-h-full overflow-scroll my-2">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
          </DialogHeader>
          <JobPostingForm
            currentJob={row.original as JobPost}
            handleJobPostUpdate={handleJobPostUpdate}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ViewAndEditModal;
