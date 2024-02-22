"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import { statusOptions } from "../data/data";
import { Task, taskSchema } from "../data/schema";
import { ViewStaffUserDetailsModal } from "../../components/modals/view-staff-user-details-modal";
import { ApproveStatusModal } from "../../components/modals/approve-status-modal";
import { DeclineStatusModal } from "../../components/modals/decline-status-modal";
import { StaffUser } from "../page";

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
                id={row.getValue("id")}
                role="STAFF"
                handleStaffUsersUpdate={handleStaffUsersUpdate}
              />
              <DeclineStatusModal row={row} />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
