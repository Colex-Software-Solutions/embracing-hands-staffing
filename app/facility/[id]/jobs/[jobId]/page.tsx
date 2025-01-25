import { shiftProvider } from "@/app/providers/shiftProvider";
import React from "react";
import Summary from "./components/Summary";
import { Break, JobPost, Shift } from "@prisma/client";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { Alert } from "@/app/components/ui/alert";
import { XCircle } from "lucide-react";

export interface ShiftsSummary extends Shift {
  staffProfile: {
    user: {
      email: string;
    };
    firstname: string;
    lastname: string;
  } | null;

  breaks: Break[];
}

export default async function JobSummaryPage({
  params,
}: {
  params: { jobId: string };
}) {
  const jobSummary = await jobPostProvider.getJobSummaryByJobId(params.jobId);
  if (jobSummary) {
    const { shifts, invoices, ...jobPost } = jobSummary;

    return (
      <div>
        <Summary shifts={shifts} jobPost={jobPost} invoices={invoices} />
      </div>
    );
  }
  return (
    <Alert className="text-red-500 mb-2 bg-red-100">
      This job was not found. Please go to the job posts page and try to
      navigate to the job summary page using the "View Job Summary" option
    </Alert>
  );
}
