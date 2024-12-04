import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import dynamic from "next/dynamic";

const RemoveShiftButton = dynamic(
  () => import("../../../../(staff)/shifts/components/remove-shift-button"),
  { ssr: false }
);

interface DataTableShiftRowActionsProps<TData> {
  shiftId: string;
  handleDeleteShift: (shiftId: string) => void;
}

export function DataTableShiftRowActions<TData>({
  shiftId,
  handleDeleteShift,
}: DataTableShiftRowActionsProps<TData>) {
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
        <RemoveShiftButton
          shiftId={shiftId}
          handleDeleteShift={handleDeleteShift}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
