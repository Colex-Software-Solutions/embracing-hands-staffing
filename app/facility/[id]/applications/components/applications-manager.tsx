"use client";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { JobApplicationTableData } from "../data/schema";
import { ApplicationStatus } from "@prisma/client";

interface IApplicationsManager {
  initialApplications: JobApplicationTableData[];
}
const ApplicationsManager = ({ initialApplications }: IApplicationsManager) => {
  const [jobApplications, setJobApplications] = useState(initialApplications);

  const handleApplicationStatusUpdate = (
    id: string,
    status: ApplicationStatus
  ) => {
    const newJobPosts = jobApplications.map((app) => {
      if (app.id === id) {
        return { ...app, status };
      }
      return app;
    });

    setJobApplications(newJobPosts);
  };

  return (
    <>
      <DataTable
        data={jobApplications}
        columns={columns({
          handleApplicationStatusUpdate,
        })}
      />
    </>
  );
};

export default ApplicationsManager;
