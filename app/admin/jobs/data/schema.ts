import { z } from "zod";

export const jobPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  facilityName: z.string(),
  createdAt: z.date(),
  startDate: z.date(),
  endDate: z.date(),
});

export type JobPostSchema = z.infer<typeof jobPostSchema>;
