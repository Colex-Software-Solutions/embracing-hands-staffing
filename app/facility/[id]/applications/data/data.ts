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
    value: "ACCEPTED",
    label: "Accepted",
    icon: CheckCircledIcon,
  },
  {
    value: "REJECTED",
    label: "Rejected",
    icon: CrossCircledIcon,
  },
];
