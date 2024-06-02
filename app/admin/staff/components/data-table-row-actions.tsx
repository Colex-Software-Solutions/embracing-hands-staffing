"use client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import dynamic from "next/dynamic";

const ViewStaffUserDetailsModal = dynamic(
  () => import("../../components/modals/view-staff-user-details-modal"),
  { ssr: false }
);
const ApproveStatusModal = dynamic(
  () => import("../../components/modals/approve-status-modal"),
  { ssr: false }
);
const DeclineStatusModal = dynamic(
  () => import("../../components/modals/decline-status-modal"),
  { ssr: false }
);

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  isPending: boolean;
  handleStaffUsersUpdate: (id: string, status: "APPROVED" | "REJECTED") => void;
}

export function DataTableRowActions<TData>({
  row,
  isPending,
  handleStaffUsersUpdate,
}: DataTableRowActionsProps<TData>) {
  const id = row.getValue("id") as string;

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
        <ViewStaffUserDetailsModal row={row} />
        {isPending && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <ApproveStatusModal
                row={row}
                id={id}
                role="STAFF"
                handleStaffUsersUpdate={handleStaffUsersUpdate}
              />
              <DeclineStatusModal
                id={id}
                handleStaffUsersUpdate={handleStaffUsersUpdate}
                role="STAFF"
              />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
