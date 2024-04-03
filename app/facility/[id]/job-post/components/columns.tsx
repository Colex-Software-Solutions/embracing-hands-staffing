import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ShiftSchema } from "../data/schema";
import { DataTableRowActions } from "./data-table-row-actions";
import { JobPost, JobStatus } from "@prisma/client";
import { formatDateTime } from "@/lib/utils";

interface JobColumnProps {
  handleJobPostUpdate: (newJob: JobPost) => void;
  handleJobStatusUpdate: (id: string, status: JobStatus) => void;
}
export const columns = ({
  handleJobPostUpdate,
  handleJobStatusUpdate,
}: JobColumnProps): ColumnDef<ShiftSchema>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shift" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "staffName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      console.log(row);
      return <div>{row.getValue("staffName")}</div>;
    },
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
      const status = row.getValue("status") as
        | "Scheduled"
        | "InProgress"
        | "OnBreak"
        | "Completed"
        | "Confirmed";
      const getBadgeColor = () => {
        switch (status) {
          case "Scheduled":
            return "text-blue-500 border-blue-500";
          case "Confirmed":
            return "text-blue-300 border-blue-3 00";
          case "InProgress":
            return "text-yellow-500 border-yellow-500";
          case "OnBreak":
            return "text-yellow-800 border-yellow-800";
          case "Completed":
            return "text-green-500 border-green-500";
          default:
            return "text-gray-500 border-gray-500";
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
    accessorKey: "start",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start" />
    ),
    cell: ({ row }) => <div>{formatDateTime(row.getValue("start"))}</div>,
  },
  {
    accessorKey: "end",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End" />
    ),
    cell: ({ row }) => <div>{formatDateTime(row.getValue("end"))}</div>,
  },
  {
    accessorKey: "clockInTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Clock In" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("clockInTime")
          ? formatDateTime(row.getValue("clockInTime"))
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "clockOutTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Clock Out" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("clockOutTime")
          ? formatDateTime(row.getValue("clockOutTime"))
          : "N/A"}
      </div>
    ),
  },
  // {
  //   accessorKey: "startDate",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Start Date" />
  //   ),
  //   cell: ({ row }) => (
  //     <div>
  //       {new Date(row.getValue("startDate"))?.toISOString().slice(0, 10)}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "endDate",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="End Date" />
  //   ),
  //   cell: ({ row }) => (
  //     <div>{new Date(row.getValue("endDate"))?.toISOString().slice(0, 10)}</div>
  //   ),
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => (
  //     <DataTableRowActions
  //       row={row}
  //       handleJobPostUpdate={handleJobPostUpdate}
  //       handleJobStatusUpdate={handleJobStatusUpdate}
  //     />
  //   ),
  // },
];
