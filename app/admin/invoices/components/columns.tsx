import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { InvoiceSchema, paidOptions } from "../data/schema";
import { DataTableRowActions } from "./data-table-row-actions";
import { JobPost, JobStatus } from "@prisma/client";
import { CheckCircle, XCircle } from "lucide-react";

interface JobColumnProps {
  handleJobPostUpdate: (newJob: JobPost) => void;
  handleJobStatusUpdate: (id: string, status: JobStatus) => void;
}
export const columns = ({
  handleJobPostUpdate,
  handleJobStatusUpdate,
}: JobColumnProps): ColumnDef<InvoiceSchema>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "facilityName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Facility" />
    ),
    cell: ({ row }) => <div>{row.getValue("facilityName")}</div>,
  },
  {
    accessorFn: (row) => row.jobPost.title,
    id: "jobPostTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }) => <div>{row.getValue("jobPostTitle")}</div>,
  },
  {
    accessorKey: "paidStr",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid" />
    ),
    cell: ({ row }) => {
      const paidValue = row.getValue("paidStr");

      return (
        <div>
          {paidValue === "yes" ? (
            <CheckCircle color="green" />
          ) : (
            <XCircle color="red" />
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value
        ? row
            .getValue(id)
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        : true;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue("createdAt"))?.toISOString().slice(0, 10)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        handleJobPostUpdate={handleJobPostUpdate}
        handleJobStatusUpdate={handleJobStatusUpdate}
      />
    ),
  },
];
