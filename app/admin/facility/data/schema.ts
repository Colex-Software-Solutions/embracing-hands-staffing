import { z } from "zod";

export const facilityUserSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type FacilityUserSchema = z.infer<typeof facilityUserSchema>;
