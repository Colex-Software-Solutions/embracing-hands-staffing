import { z } from "zod";

export const staffUserSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type StaffUserSchema = z.infer<typeof staffUserSchema>;
