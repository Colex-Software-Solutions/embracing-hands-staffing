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
import { useState } from "react";
import { Shift } from "../../applications/jobPost/[jobPostId]/page";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  jobPostId: string;
  handleAddShift: (newShift: Shift) => void;
}

export function DataTableViewOptions<TData>({
  table,
  jobPostId,
  handleAddShift,
}: DataTableViewOptionsProps<TData>) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <AddShiftModal
      row=""
      jobPostId={jobPostId}
      handleJobPostUpdate={() => {}}
      openModal={openModal}
      setOpenModal={setOpenModal}
      handleAddShift={handleAddShift}
    />
  );
}
