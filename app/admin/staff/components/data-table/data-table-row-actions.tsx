import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import dynamic from "next/dynamic";

const ViewStaffUserDetailsModal = dynamic(
  () => import("@/app/admin/components/modals/view-staff-user-details-modal"),
  { ssr: false }
);
const ApproveStatusModal = dynamic(
  () => import("@/app/admin/components/modals/approve-status-modal"),
  { ssr: false }
);
const DeclineStatusModal = dynamic(
  () => import("@/app/admin/components/modals/decline-status-modal"),
  { ssr: false }
);

import { Button } from "../../../../components/ui/button";
import DocumentModal from "@/app/staff/[id]/profile/components/DocumentModal";
import { useState } from "react";
import RemoveUserButton from "@/app/admin/components/modals/remove-user-button";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  isPending: boolean;
  handleStaffUsersUpdate: (id: string, status: "APPROVED" | "REJECTED") => void;
  handleStaffUsersDelete: (id: string) => void;
}

export function DataTableRowActions<TData>({
  row,
  isPending,
  handleStaffUsersUpdate,
  handleStaffUsersDelete,
}: DataTableRowActionsProps<TData>) {
  const id = row.getValue("id") as string;
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const name = `${row.getValue("firstName")} ${row.getValue("lastName")}`;

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
        <DropdownMenuItem onClick={() => setOpenDocumentModal(true)}>
          Add Document
        </DropdownMenuItem>
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
        <RemoveUserButton
          isStaff={true}
          userId={id}
          name={name}
          onSuccess={handleStaffUsersDelete}
        />
      </DropdownMenuContent>
      <DocumentModal
        isOpen={openDocumentModal}
        onClose={() => setOpenDocumentModal(false)}
        userId={id}
        selectedDocument={null}
      />
    </DropdownMenu>
  );
}
