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

const shiftSchema = z.object({
  dateOfService: z.date({
    required_error: "Date of Service cannot be empty.",
    invalid_type_error: "Invalid date format.",
  }),
  serviceDetails: z.string().min(1, {
    message: "Service Details cannot be empty.",
  }),
  employee: z.string().min(1, {
    message: "Employee cannot be empty.",
  }),
  in: z.string().min(1, {
    message: "In time cannot be empty.",
  }),
  out: z.string().min(1, {
    message: "Out time cannot be empty.",
  }),
  hoursWorked: z.number().min(0, {
    message: "Hours Worked cannot be negative.",
  }),
  hourlyRate: z.number(),
});

export const createInvoiceSchema = z.object({
  facilityName: z.string().min(1, {
    message: "Facility name cannot be empty.",
  }),
  facilityAddress: z.string().min(1, {
    message: "Address cannot be empty.",
  }),
  invoiceNumber: z.number(),
  shifts: z.array(shiftSchema),
});

export type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>;
