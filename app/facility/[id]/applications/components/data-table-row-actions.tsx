import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
} from "@/app/components/ui/dropdown-menu";
import Link from "next/link";
import { JobApplicationTableData } from "../data/schema";
import { ConfirmationModal } from "@/app/components/modals/confirmation-modal";
import { ApplicationStatus } from "@prisma/client";
import { useToast } from "@/app/components/ui/use-toast";
import axios from "axios";

interface DataTableRowActionsProps {
  row: Row<JobApplicationTableData>;
  handleApplicationStatusUpdate: (
    id: string,
    newStatus: ApplicationStatus
  ) => void;
}

export const DataTableRowActions: React.FC<DataTableRowActionsProps> = ({
  row,
  handleApplicationStatusUpdate,
}) => {
  const {
    id,
    userId,
    jobStatus,
    facilityName,
    applicantEmail,
    jobTitle,
    status,
  } = row.original;
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    try {
      const response = await axios.put(`/api/job-application/${id}/status`, {
        status: newStatus,
        facilityName,
        applicantEmail,
        jobTitle,
      });
      if (response && response.data.success) {
        handleApplicationStatusUpdate(id, newStatus);
        toast({
          variant: "default",
          title: "Success!",
          description: `Application has been ${
            newStatus[0] + newStatus.slice(1).toLocaleLowerCase()
          } `,
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
            href={`/profile/${userId}`}
          >
            View Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {jobStatus === "OPEN" && status === "PENDING" && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>

            <DropdownMenuSubContent>
              <ConfirmationModal
                confirmButtonText="yes, Accept"
                onConfirm={async () => await handleStatusChange("ACCEPTED")}
                confirmationQuestion="Do you wish to accept this applicant?"
                triggerButtonText="Accept applicant"
                triggerButtonClassNames="hover:bg-green-500"
              />
              <ConfirmationModal
                confirmButtonText="yes, Reject"
                onConfirm={async () => await handleStatusChange("REJECTED")}
                confirmationQuestion="Do you wish to reject this applicant?"
                triggerButtonText="Reject applicant"
                triggerButtonClassNames="hover:bg-destructive"
              />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
