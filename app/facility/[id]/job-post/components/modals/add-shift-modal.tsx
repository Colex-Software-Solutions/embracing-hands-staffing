import React, { Dispatch, SetStateAction } from "react";
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
import { Shift } from "../../../applications/jobPost/[jobPostId]/page";

interface AddShiftModalProps {
  row: any;
  jobPostId: string;
  handleJobPostUpdate: (newJob: JobPost) => void;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  handleAddShift: (newShift: Shift) => void;
}

export function AddShiftModal({
  row,
  jobPostId,
  handleJobPostUpdate,
  openModal,
  setOpenModal,
  handleAddShift,
}: AddShiftModalProps) {
  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
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
          setOpenModal={setOpenModal}
          handleAddShift={handleAddShift}
        />
      </DialogContent>
    </Dialog>
  );
}
