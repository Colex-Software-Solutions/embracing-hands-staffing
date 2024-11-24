import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/components/ui/badge";
import { StaffUserSchema } from "../../data/schema";
import { DataTableColumnHeader } from "@/app/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = (
  handleStaffUsersUpdate: (id: string, status: "APPROVED" | "REJECTED") => void,
  handleStaffUsersDelete: (id: string) => void
): ColumnDef<StaffUserSchema>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getBadgeColor = () => {
        if (status === "PENDING") {
          return "text-orange-300 border-orange-300";
        }
        if (status === "APPROVED") {
          return "text-green-300 border-green-300";
        }

        if (status === "REJECTED") {
          return "text-red-400 border-red-400";
        }

        return "text-black border-black";
      };

      return (
        <Badge className={`${getBadgeColor()}`} variant="soft">
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        isPending={row.getValue("status") === "PENDING"}
        handleStaffUsersUpdate={handleStaffUsersUpdate}
        handleStaffUsersDelete={handleStaffUsersDelete}
      />
    ),
  },
];
