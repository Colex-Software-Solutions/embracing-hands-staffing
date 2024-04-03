"use client";
import React, { useState } from "react";
import { Toaster } from "@/app/components/ui/toaster";
import { Shift } from "../../applications/jobPost/[jobPostId]/page";
import ShiftDisplayTabs from "./jobs-display-tabs";

interface IShiftsManager {
  initialShifts: Shift[];
  jobPostId: string;
}
const ShiftsManager = ({ initialShifts, jobPostId }: IShiftsManager) => {
  const [shifts, setShifts] = useState(initialShifts);

  // const handleJobPostUpdate = (updatedJob: JobPost) => {
  //   const newjobPosts = jobPosts.map((job) =>
  //     job.id === updatedJob.id ? updatedJob : job
  //   );
  //   setJobPosts(newjobPosts);
  // };

  // Function to update job status
  // const handleJobStatusUpdate = (id: string, status: JobStatus) => {
  //   const newJobPosts = jobPosts.map((jobPost) => {
  //     if (jobPost.id === id) {
  //       return { ...jobPost, status };
  //     }
  //     return jobPost;
  //   });

  //   setJobPosts(newJobPosts);
  // };
  console.log({ initialShifts });

  return (
    <>
      <ShiftDisplayTabs
        shifts={shifts}
        jobPostId={jobPostId}
        // handleJobPostUpdate={handleJobPostUpdate}
        // handleJobStatusUpdate={handleJobStatusUpdate}
      />
      <Toaster />
    </>
  );
};

export default ShiftsManager;
