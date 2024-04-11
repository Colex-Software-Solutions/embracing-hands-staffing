import { z } from "zod";

export const shiftSchema = z.object({
  id: z.string(),
  // title: z.string(),
  // status: z.enum(["OPEN", "CLOSED", "COMPLETED"]),
  // createdAt: z.date(),
  // startDate: z.date(),
  // endDate: z.date(),
});

export type ShiftSchema = z.infer<typeof shiftSchema>;
