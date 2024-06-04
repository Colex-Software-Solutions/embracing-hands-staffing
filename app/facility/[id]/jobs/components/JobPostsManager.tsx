"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { JobPost, JobStatus } from "@prisma/client";
import { Toaster } from "@/app/components/ui/toaster";

// Dynamically import JobDisplayTabs and Toaster
const JobDisplayTabs = dynamic(() => import("./jobs-display-tabs"), {
  ssr: false,
});

interface IJobPostsManager {
  initialJobPosts: JobPost[];
}
const JobPostsManager = ({ initialJobPosts }: IJobPostsManager) => {
  const [jobPosts, setJobPosts] = useState(initialJobPosts);

  const handleJobPostUpdate = (updatedJob: JobPost) => {
    const newjobPosts = jobPosts.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    );
    setJobPosts(newjobPosts);
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
      <JobDisplayTabs
        jobPosts={jobPosts}
        handleJobPostUpdate={handleJobPostUpdate}
        handleJobStatusUpdate={handleJobStatusUpdate}
      />
      <Toaster />
    </>
  );
};

export default JobPostsManager;
