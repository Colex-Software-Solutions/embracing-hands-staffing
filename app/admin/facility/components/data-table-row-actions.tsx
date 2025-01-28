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

const ApproveStatusModal = dynamic(
  () => import("../../components/modals/approve-status-modal"),
  { ssr: false }
);
const DeclineStatusModal = dynamic(
  () => import("../../components/modals/decline-status-modal"),
  { ssr: false }
);

const ViewFacilityUserDetailsModal = dynamic(
  () => import("../../components/modals/view-facility-user-details-modal"),
  { ssr: false }
);

const BlockNurseModal = dynamic(
  () => import("../../components/modals/block-nurse-modal"),
  { ssr: false }
);

const RemoveUserButton = dynamic(
  () => import("../../components/modals/remove-user-button"),
  { ssr: false }
);

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  isPending: boolean;
  handleFacilityUsersUpdate: (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => void;
  handleFacilityUsersDelete: (id: string) => void;
}

export function DataTableRowActions<TData>({
  row,
  isPending,
  handleFacilityUsersUpdate,
  handleFacilityUsersDelete,
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
        <ViewFacilityUserDetailsModal row={row} role="FACILITY" />
        <BlockNurseModal facilityId={id} facilityName={row.getValue("name")} />
        {isPending && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <ApproveStatusModal
                row={row}
                id={id}
                role="FACILITY"
                handleFacilityUsersUpdate={handleFacilityUsersUpdate}
              />
              <DeclineStatusModal
                id={id}
                handleFacilityUsersUpdate={handleFacilityUsersUpdate}
                role="FACILITY"
              />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
        <RemoveUserButton
          isStaff={false}
          name={row.getValue("name")}
          userId={id}
          onSuccess={handleFacilityUsersDelete}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
