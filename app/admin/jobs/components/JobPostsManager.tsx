"use client";
import React, { useState } from "react";
import { Toaster } from "@/app/components/ui/toaster";
import { JobPost, JobStatus } from "@prisma/client";
import { FacilityJobPost } from "../page";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface IJobPostsManager {
  initialJobPosts: FacilityJobPost[];
}
const JobPostsManager = ({ initialJobPosts }: IJobPostsManager) => {
  const [jobPosts, setJobPosts] = useState(initialJobPosts);

  const handleJobPostUpdate = (updatedJob: JobPost) => {
    const newjobPosts = jobPosts.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    );
    setJobPosts(newjobPosts as any);
  };

  // Function to update job status
  const handleJobStatusUpdate = (id: string, status: JobStatus) => {
    const newJobPosts = jobPosts.map((jobPost) => {
      if (jobPost.id === id) {
        return { ...jobPost, status };
      }
      return jobPost;
    });

    setJobPosts(newJobPosts);
  };

  return (
    <>
      <DataTable
        data={jobPosts as any[]}
        columns={columns({ handleJobPostUpdate, handleJobStatusUpdate })}
      />
      <Toaster />
    </>
  );
};

export default JobPostsManager;
