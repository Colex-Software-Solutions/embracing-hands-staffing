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
  startDate: z.date({
    required_error: "Date of Service cannot be empty.",
    invalid_type_error: "Invalid date format.",
  }),
  endDate: z.date({
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
  cardPayment: z.boolean(), 
});

export type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>;
