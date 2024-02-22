import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

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

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
