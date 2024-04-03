"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/app/components/ui/dropdown-menu";
import { AddShiftModal } from "./modals/add-shift-modal";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  jobPostId: string;
}

export function DataTableViewOptions<TData>({
  table,
  jobPostId,
}: DataTableViewOptionsProps<TData>) {
  return (
    <AddShiftModal
      row=""
      jobPostId={jobPostId}
      handleJobPostUpdate={() => {}}
    />
  );
}
