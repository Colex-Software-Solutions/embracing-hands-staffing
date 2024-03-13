import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

const JobApplicationSchema = z.object({
  id: z.string(),
  applicantName: z.string(),
  applicantId: z.string(),
  applicantEmail: z.string(),
  userId: z.string(),
  facilityName: z.string(),
  jobTitle: z.string(),
  jobStatus: z.enum(["OPEN", "CLOSED", "COMPLETED"]),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]),
  applicationDate: z.string(),
});

export type JobApplicationTableData = z.infer<typeof JobApplicationSchema>;
