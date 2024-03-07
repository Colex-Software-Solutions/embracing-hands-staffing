import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/app/components/ui/dropdown-menu";
import { ViewAndEditModal } from "./modals/view-and-edit-job-details";
import { CloseJobModal } from "./modals/close-job-confirm-modal";
import { JobPost, JobStatus } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";

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
        <Link href={`facility/${facilityId}/applications?jobId=${id}`}>
          {" "}
          <DropdownMenuItem>View Applicants</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />

        {row.getValue("status") !== "CLOSED" && (
          <CloseJobModal jobId={id} onUpdate={handleJobStatusUpdate} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
