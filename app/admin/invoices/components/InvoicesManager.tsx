"use client";
import React, { useState } from "react";
import { Toaster } from "@/app/components/ui/toaster";
import { JobPost, JobStatus } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Invoice } from "../../jobs/[jobId]/invoices/page";

interface IInvoicessManager {
  initialInvoices: Invoice[];
}
const InvoicesManager = ({ initialInvoices }: IInvoicessManager) => {
  // const [jobPosts, setJobPosts] = useState(initialJobPosts);

  const handleJobPostUpdate = (updatedJob: JobPost) => {
    // const newjobPosts = jobPosts.map((job) =>
    //   job.id === updatedJob.id ? updatedJob : job
    // );
    // setJobPosts(newjobPosts as any);
  };

  // Function to update job status
  const handleJobStatusUpdate = (id: string, status: JobStatus) => {
    // const newJobPosts = jobPosts.map((jobPost) => {
    //   if (jobPost.id === id) {
    //     return { ...jobPost, status };
    //   }
    //   return jobPost;
    // });
    // setJobPosts(newJobPosts);
  };

  return (
    <>
      <DataTable
        data={initialInvoices as Invoice[]}
        columns={columns({ handleJobPostUpdate, handleJobStatusUpdate })}
      />
      <Toaster />
    </>
  );
};

export default InvoicesManager;
