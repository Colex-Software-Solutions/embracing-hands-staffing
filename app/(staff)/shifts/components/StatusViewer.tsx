import { Badge } from "@/app/components/ui/badge";
import { Status } from "@prisma/client";
import React from "react";

const StatusViewer = ({ status }: { status: Status }) => {
  const getBadgeColor = () => {
    switch (status) {
      case "Scheduled":
        return "text-blue-500 border-blue-500";
      case "Confirmed":
        return "text-blue-300 border-blue-3 00";
      case "InProgress":
        return "text-yellow-500 border-yellow-500";
      case "OnBreak":
        return "text-yellow-800 border-yellow-800";
      case "Completed":
        return "text-green-500 border-green-500";
      default:
        return "text-gray-500 border-gray-500";
    }
  };

  return (
    <Badge className={`${getBadgeColor()} text-md`} variant="soft">
      {status}
    </Badge>
  );
};

export default StatusViewer;
