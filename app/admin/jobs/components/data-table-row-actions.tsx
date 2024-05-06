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

import { JobPost, JobStatus } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import UploadInvoiceModal from "../../components/modals/upload-invoice-modal";

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
        <Link href={`admin/jobs/${id}`}>
          {" "}
          <DropdownMenuItem>View Current Job Summary</DropdownMenuItem>
        </Link>
        <UploadInvoiceModal jobId={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
