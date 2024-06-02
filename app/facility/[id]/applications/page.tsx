import { jobApplicationProvider } from "@/app/providers/jobApplicationProvider";
import React from "react";
import { JobApplicationTableData } from "./data/schema";
import dynamic from "next/dynamic";
import { fa } from "@faker-js/faker";

const ApplicationsManager = dynamic(
  () => import("./components/applications-manager"),
  { ssr: false }
);

const mapApplicationsToTableData = (
  applications: any[]
): JobApplicationTableData[] => {
  return applications.map((application) => {
    return {
      id: application.id,
      applicantName: `${application.staffProfile.firstname} ${application.staffProfile.lastname}`,
      jobStatus: application.jobPost.status,
      applicantId: application.staffProfile.id,
      jobTitle: application.jobPost.title,
      applicantEmail: application?.staffProfile.user.email,
      facilityName: application.jobPost.facilityProfile.name,
      status: application.status,
      userId: application.staffProfile.userId,
      applicationDate: new Date(application.createdAt)
        .toISOString()
        .slice(0, 10),
    };
  });
};

async function getJobApplications(jobId: string) {
  const applicationsData = await jobApplicationProvider.getApplicationsByJobId(
    jobId
  );
  const tableData = mapApplicationsToTableData(applicationsData);
  return tableData;
}

const ApplicationsPage = async ({
  searchParams,
}: {
  searchParams: { jobId: string };
}) => {
  const { jobId } = searchParams;

  if (!jobId) {
    return (
      <div>
        Please go back to the jobs page and and select the options / view
        applicants for a job in order to view the applicants for that job
      </div>
    );
  }
  const jobApplications = await getJobApplications(jobId);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Job Applications
            </h2>
            <p className="text-muted-foreground">
              Manage all applicants for this job
            </p>
          </div>
        </div>

        <ApplicationsManager initialApplications={jobApplications} />
      </div>
    </>
  );
};

export default ApplicationsPage;
