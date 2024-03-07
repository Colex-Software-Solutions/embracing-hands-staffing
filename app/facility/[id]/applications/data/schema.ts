import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

const JobApplicationSchema = z.object({
  id: z.string(),
  applicantName: z.string(),
  applicantId: z.string(),
  userId: z.string(),
  jobTitle: z.string(),
  jobStatus: z.enum(["OPEN", "CLOSED", "COMPLETED"]),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]),
  applicationDate: z.string(),
  // Add any other fields that are relevant to your job application data
});

// Define the type for usage in TypeScript
export type JobApplicationTableData = z.infer<typeof JobApplicationSchema>;
