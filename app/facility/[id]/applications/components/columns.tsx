import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { JobApplicationTableData } from "../data/schema";
import { ApplicationStatus } from "@prisma/client";
import { Badge } from "@/app/components/ui/badge";
import { DataTableRowActions } from "./data-table-row-actions";

interface ApplicationsColumnsProps {
  handleApplicationStatusUpdate: (
    id: string,
    status: ApplicationStatus
  ) => void;
}
export const columns = ({
  handleApplicationStatusUpdate,
}: ApplicationsColumnsProps): ColumnDef<JobApplicationTableData>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader title="ID" column={column} />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as ApplicationStatus;
      const getBadgeColor = () => {
        switch (status) {
          case "ACCEPTED":
            return "text-green-500 border-green-500";
          case "REJECTED":
            return "text-red-500 border-red-500";
          default:
            return "text-orange-500 border-orange-500";
        }
      };

      return (
        <Badge className={`${getBadgeColor()}`} variant="soft">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "applicantName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant Name" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "jobTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: "applicationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Date" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        handleApplicationStatusUpdate={handleApplicationStatusUpdate}
      />
    ),
  },
];
