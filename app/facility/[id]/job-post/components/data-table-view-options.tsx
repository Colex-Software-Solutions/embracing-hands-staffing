"use client";
import { Table } from "@tanstack/react-table";
import { AddShiftModal } from "./modals/add-shift-modal";
import { useState } from "react";
import { Shift } from "../../applications/jobPost/[jobPostId]/page";

interface DataTableViewOptionsProps<TData> {
  jobPostId: string;
  handleAddShift: (newShift: Shift) => void;
}

export function DataTableViewOptions<TData>({
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
