"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { JobPost, JobStatus } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useState } from "react";
import JobsCalendar from "./jobs-calendar";
import { Shift } from "../../applications/jobPost/[jobPostId]/page";

interface ShiftDisplayTabsProps {
  shifts: Shift[];
  jobPostId: string;
  // handleJobPostUpdate: (newJob: JobPost) => void;
  // handleJobStatusUpdate: (id: string, status: JobStatus) => void;
}

const ShiftDisplayTabs: React.FC<ShiftDisplayTabsProps> = ({
  shifts,
  jobPostId,
  // handleJobPostUpdate,
  // handleJobStatusUpdate,
}) => {
  return (
    <DataTable
      data={shifts as Shift[]}
      jobPostId={jobPostId}
      columns={columns({
        handleJobPostUpdate: () => {},
        handleJobStatusUpdate: () => {},
      })}
    />
  );
};

export default ShiftDisplayTabs;
