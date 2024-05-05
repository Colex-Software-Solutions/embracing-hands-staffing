import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { JobPostSchema } from "../data/schema";
import { DataTableRowActions } from "./data-table-row-actions";
import { JobPost, JobStatus } from "@prisma/client";

interface JobColumnProps {
  handleJobPostUpdate: (newJob: JobPost) => void;
  handleJobStatusUpdate: (id: string, status: JobStatus) => void;
}
export const columns = ({
  handleJobPostUpdate,
  handleJobStatusUpdate,
}: JobColumnProps): ColumnDef<JobPostSchema>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "facilityName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Facility" />
    ),
    cell: ({ row }) => <div>{row.getValue("facilityName")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted On" />
    ),
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue("createdAt"))?.toISOString().slice(0, 10)}
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue("startDate"))?.toISOString().slice(0, 10)}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("endDate"))?.toISOString().slice(0, 10)}</div>
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
