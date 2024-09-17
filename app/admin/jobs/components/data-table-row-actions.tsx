import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";

import { JobPost, JobStatus } from "@prisma/client";
import Link from "next/link";
import ViewFacilityUserDetailsModal from "../../components/modals/view-facility-user-details-modal";
import AssignStaffToJobModal from "../../components/modals/assign-staff-to-job-modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  handleJobPostUpdate: (newJob: JobPost) => void;
  handleJobStatusUpdate: (id: string, status: JobStatus) => void;
}

export function DataTableRowActions<TData>({
  row,
  handleJobPostUpdate,
  handleJobStatusUpdate,
}: DataTableRowActionsProps<TData>) {
  const id = row.getValue("id") as string;

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
        <Link href={`/admin/jobs/${id}`}>
          {" "}
          <DropdownMenuItem>View Current Job Summary</DropdownMenuItem>
        </Link>
        <Link href={`/admin/jobs/${id}/invoices`} className="w-full">
          <Button
            className="w-full border-0 justify-start flex pl-2 font-normal"
            variant="outline"
          >
            Invoices
          </Button>
        </Link>
        <ViewFacilityUserDetailsModal row={row} role="FACILITY" />
        <AssignStaffToJobModal jobId="65e3b9ca85aeb0f6381a9a9c" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
