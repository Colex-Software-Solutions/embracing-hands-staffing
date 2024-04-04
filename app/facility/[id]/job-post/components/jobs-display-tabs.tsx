"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Shift } from "../../applications/jobPost/[jobPostId]/page";

interface ShiftDisplayTabsProps {
  shifts: Shift[];
  jobPostId: string;
  handleAddShift: (newShift: Shift) => void;
}

const ShiftDisplayTabs: React.FC<ShiftDisplayTabsProps> = ({
  shifts,
  jobPostId,
  handleAddShift,
}) => {
  return (
    <DataTable
      data={shifts as Shift[]}
      jobPostId={jobPostId}
      handleAddShift={handleAddShift}
      columns={columns({
        handleJobPostUpdate: () => {},
        handleJobStatusUpdate: () => {},
      })}
    />
  );
};

export default ShiftDisplayTabs;
