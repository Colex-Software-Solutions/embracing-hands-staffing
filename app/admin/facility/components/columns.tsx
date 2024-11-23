import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/components/ui/badge";
import { FacilityUserSchema } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = (
  handleFacilityUsersUpdate: (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => void,
  handleFacilityUsersDelete: (id: string) => void
): ColumnDef<FacilityUserSchema>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "facilityId",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="hidden"
        column={column}
        title="Facility ID"
      />
    ),
    cell: ({ row }) => (
      <div className="hidden">{row.getValue("facilityId")}</div>
    ),
    enableHiding: true,
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
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
        handleFacilityUsersUpdate={handleFacilityUsersUpdate}
        handleFacilityUsersDelete={handleFacilityUsersDelete}
      />
    ),
  },
];
