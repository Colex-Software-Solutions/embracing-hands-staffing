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
} from "@/app/components/ui/dropdown-menu";
import Link from "next/link";
import { JobApplicationTableData } from "../data/schema";
import { DropdownMenuSubContent } from "@radix-ui/react-dropdown-menu";
import { ConfirmationModal } from "@/app/components/modals/confirmation-modal";
import { ApplicationStatus } from "@prisma/client";

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
  const { id, userId, jobStatus } = row.original;

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    handleApplicationStatusUpdate(id, newStatus);
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
          {jobStatus === "OPEN" && (
            <DropdownMenuSubContent>
              <ConfirmationModal
                confirmButtonText="yes, Accept"
                onConfirm={() => handleStatusChange("ACCEPTED")}
                confirmationQuestion="Do you wish to accept this applicant?"
                triggerButtonText="Accept applicant"
                triggerButtonClassNames="hover:bg-green-500"
              />
              <ConfirmationModal
                confirmButtonText="yes, Reject"
                onConfirm={() => handleStatusChange("REJECTED")}
                confirmationQuestion="Do you wish to reject this applicant?"
                triggerButtonText="Reject applicant"
                triggerButtonClassNames="hover:bg-destructive"
              />
            </DropdownMenuSubContent>
          )}
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
