import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
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
    className: "text-green-300",
  },
  {
    value: "REJECT",
    label: "Reject",
    className: "text-red-300",
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
