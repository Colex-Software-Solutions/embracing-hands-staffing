"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { JobPost, JobStatus } from "@prisma/client";

// Dynamically import DataTable and JobsCalendar
import DataTable from "./data-table";
const JobsCalendar = dynamic(() => import("./jobs-calendar"), { ssr: false });

import { columns } from "./columns";

interface JobDisplayTabsProps {
  jobPosts: JobPost[];
  handleJobPostUpdate: (newJob: JobPost) => void;
  handleJobStatusUpdate: (id: string, status: JobStatus) => void;
}

const JobDisplayTabs: React.FC<JobDisplayTabsProps> = ({
  jobPosts,
  handleJobPostUpdate,
  handleJobStatusUpdate,
}) => {
  const [window, setWindow] = useState<"calendar" | "list">("calendar");

  const handleChange = (newWindow: string) => {
    if (newWindow === "calendar" || newWindow === "list") {
      setWindow(newWindow);
    }
  };
  return (
    <Tabs value={window} onValueChange={handleChange}>
      <TabsList className="w-full flex gap-5">
        <TabsTrigger className="w-1/2 text-center" value="calendar">
          Jobs Calendar
        </TabsTrigger>
        <TabsTrigger className="w-1/2 text-center" value="list">
          Jobs List
        </TabsTrigger>
      </TabsList>
      <TabsContent value="calendar" className="max-h-screen">
        <JobsCalendar jobs={jobPosts} />
      </TabsContent>
      <TabsContent value="list" className="max-h-screen">
        <DataTable
          data={jobPosts as any[]}
          columns={columns({ handleJobPostUpdate, handleJobStatusUpdate })}
        />
      </TabsContent>
    </Tabs>
  );
};

export default JobDisplayTabs;
