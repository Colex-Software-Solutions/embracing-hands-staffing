"use client";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Toaster } from "@/app/components/ui/toaster";
import { JobPost } from "@prisma/client";

interface IJobPostsManager {
  initialJobPosts: JobPost[];
}
const JobPostsManager = ({ initialJobPosts }: IJobPostsManager) => {
  const [jobPosts, setJobPosts] = useState(initialJobPosts);

  return (
    <>
      <DataTable data={jobPosts as JobPost[]} columns={columns()} />
      <Toaster />
    </>
  );
};

export default JobPostsManager;
