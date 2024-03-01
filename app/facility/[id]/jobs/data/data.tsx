import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "OPEN",
    label: "Open",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "CLOSED",
    label: "Closed",
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
