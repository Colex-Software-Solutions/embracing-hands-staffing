"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Shift } from "../../applications/jobPost/[jobPostId]/page";

interface ShiftDisplayTabsProps {
  shifts: Shift[];
  jobPostId: string;
  handleAddShift: (newShift: Shift) => void;
  handleDeleteShift: (shiftId: string) => void;
}

const ShiftDisplayTabs: React.FC<ShiftDisplayTabsProps> = ({
  shifts,
  jobPostId,
  handleAddShift,
  handleDeleteShift,
}) => {
  return (
    <DataTable
      data={shifts as Shift[]}
      jobPostId={jobPostId}
      handleAddShift={handleAddShift}
      columns={columns(handleDeleteShift)}
    />
  );
};

export default ShiftDisplayTabs;
