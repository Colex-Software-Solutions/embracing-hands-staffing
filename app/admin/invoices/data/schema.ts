import { z } from "zod";
import {
  CheckCircledIcon,
  CrossCircledIcon
} from "@radix-ui/react-icons"

export const JobPostSchema = z.object({
  title: z.string(),
});

export const InvoiceSchema = z.object({
  id: z.string(),
  facilityName: z.string(),
  createdAt: z.date(),
  paid: z.date(),
  jobPost: JobPostSchema,
});

export const paidOptions = [
  {
    label: "Paid",
    value: "yes",
    icon: CheckCircledIcon,
  },
  {
    label: "Unpaid",
    value: "no",
    icon: CrossCircledIcon,
  },
]

export type InvoiceSchema = z.infer<typeof InvoiceSchema>;
