import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/app/components/ui/dropdown-menu";
import { JobPost, JobStatus } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ViewShiftDetailsModal } from "./modals/view-shift-details-modal";

const ViewAndEditModal = dynamic(
  () => import("./modals/view-and-edit-job-details"),
  { ssr: false }
);
const CloseJobModal = dynamic(
  () => import("./modals/close-job-confirm-modal"),
  { ssr: false }
);
const CompleteJobModal = dynamic(
  () => import("./modals/complete-job-confirm-modal"),
  { ssr: false }
);

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
  const facilityId = useParams().id;

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
        <ViewAndEditModal
          row={row}
          id={id}
          handleJobPostUpdate={handleJobPostUpdate}
        />
        <Link href={`/facility/${facilityId}/applications?jobId=${id}`}>
          {" "}
          <DropdownMenuItem>View Applicants</DropdownMenuItem>
        </Link>
        <Link href={`/facility/${facilityId}/jobs/${id}/invoices`}>
          {" "}
          <DropdownMenuItem>Invoices</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <ViewShiftDetailsModal jobId={id} />
        <Link href={`/facility/${facilityId}/jobs/${id}`}>
          {" "}
          <DropdownMenuItem>View Current Job Summary</DropdownMenuItem>
        </Link>
        <Link href={`/job-posts/${id}`}>
          {" "}
          <DropdownMenuItem>View job application form</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {row.getValue("status") !== "CLOSED" &&
          row.getValue("status") !== "COMPLETED" && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>

              <DropdownMenuSubContent>
                <CompleteJobModal jobId={id} onUpdate={handleJobStatusUpdate} />
                <CloseJobModal jobId={id} onUpdate={handleJobStatusUpdate} />
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
