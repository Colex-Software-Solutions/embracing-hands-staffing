import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "PENDING",
    label: "Pending",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "APPROVED",
    label: "Approved",
    icon: CheckCircledIcon,
  },
  {
    value: "REJECTED",
    label: "Rejected",
    icon: CrossCircledIcon,
  },
];

export const statusOptions = [
  {
    value: "APPROVE",
    label: "Approve",
  },
  {
    value: "REJECT",
    label: "Reject",
  },
];
