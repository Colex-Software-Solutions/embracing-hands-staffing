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
import ViewAndEditModal from "../../jobs/components/modals/view-and-edit-job-details";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  handleJobPostUpdate: (newJob: JobPost) => void;
}

export function DataTableRowActions<TData>({
  row,
  handleJobPostUpdate,
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
        <DropdownMenuSeparator />
        <Link href={`/facility/${facilityId}/applications/jobPost/${id}`}>
          {" "}
          <DropdownMenuItem>View Shifts</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {row.getValue("status") !== "CLOSED" &&
          row.getValue("status") !== "COMPLETED" && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
            </DropdownMenuSub>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
