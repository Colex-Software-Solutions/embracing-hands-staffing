"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { AppliedStaffProfileResponse } from "@/app/(staff)/job-posts/[id]/page";

const isApplicationStarted = (
  appliedStaffProfiles: AppliedStaffProfileResponse[],
  staffId: string | null
) => {
  if (!staffId) {
    return false;
  }
  console.log(appliedStaffProfiles);

  for (let appliedStaffProfile of appliedStaffProfiles) {
    if (appliedStaffProfile.staffProfile.id === staffId) {
      return true;
    }
  }

  return false;
};

interface StartApplicationModalProps {
  jobPostId: string;
  appliedStaffProfiles: AppliedStaffProfileResponse[];
}

export function StartApplicationModal({
  jobPostId,
  appliedStaffProfiles,
}: StartApplicationModalProps) {
  const { data: session } = useSession();
  const [applicationStarted, setApplicationStarted] = useState<boolean>(
    isApplicationStarted(
      appliedStaffProfiles,
      session?.user.staffProfile?.id || null
    )
  );
  const [openModal, setOpenModal] = useState(false);
  const { toast } = useToast();
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    if (!session || !session.user.staffProfile) {
      toast({
        variant: "destructive",
        title: "Session is not valid, please log in.",
      });
      return;
    }

    setSubmitButtonDisabled(true);

    axios
      .post(`/api/job-application/${jobPostId}`, {
        jobId: jobPostId,
        staffId: session.user.staffProfile.id,
      })
      .then((res) => {
        if (res.data.success) {
          setApplicationStarted(true);
          toast({
            variant: "default",
            title: "Application submitted",
          });
        }

        setSubmitButtonDisabled(false);
        setOpenModal(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "The job application could not be submitted at this time",
        });
        setSubmitButtonDisabled(false);
        setOpenModal(false);
      });
  };

  const form = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
      <DialogTrigger asChild>
        {applicationStarted ? (
          <Button
            className="w-96 rounded-full text-white bg-gray-500"
            variant="outline"
            disabled={true}
          >
            Application Submitted
          </Button>
        ) : (
          <Button
            className="w-96 rounded-full text-white bg-primary hover:text-primary"
            variant="outline"
            onClick={() => setOpenModal(true)}
          >
            Start Application
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Do you wish to submit this application?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-5 my-5">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="bg-green-600 hover:bg-green-400"
              disabled={submitButtonDisabled}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
