import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { DropdownMenuItem } from "@/app/components/ui/dropdown-menu";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/app/components/ui/badge";

interface ShiftDetails {
  id: string;
  start: Date;
  end: Date;
  status: "Scheduled" | "InProgress" | "OnBreak" | "Completed" | "Confirmed";
  clockInTime?: Date;
  clockOutTime?: Date;
  staffName: string;
}

export function ViewShiftDetailsModal({ jobId }: { jobId: string }) {
  const [shiftDetails, setShiftDetails] = useState<ShiftDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchShiftDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/shift?jobId=${jobId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch shift details");
      }
      const data = await response.json();
      setShiftDetails(data);
    } catch (error) {
      console.error("Error fetching shift details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBadgeColor = (status: ShiftDetails["status"]) => {
    switch (status) {
      case "Scheduled":
        return "text-blue-500 border-blue-500";
      case "Confirmed":
        return "text-blue-300 border-blue-300";
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
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            fetchShiftDetails();
          }}
        >
          View Shift Details
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shift Details</DialogTitle>
          <DialogDescription>
            View the details of the shift associated with this job.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div>Loading shift details...</div>
        ) : shiftDetails ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Staff:</span>
              <span className="col-span-3">{shiftDetails.staffName}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Status:</span>
              <span className="col-span-3">
                <Badge
                  className={getBadgeColor(shiftDetails.status)}
                  variant="soft"
                >
                  {shiftDetails.status}
                </Badge>
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Start:</span>
              <span className="col-span-3">
                {formatDateTime(shiftDetails.start)}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">End:</span>
              <span className="col-span-3">
                {formatDateTime(shiftDetails.end)}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Clock In:</span>
              <span className="col-span-3">
                {shiftDetails.clockInTime
                  ? formatDateTime(shiftDetails.clockInTime)
                  : "N/A"}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Clock Out:</span>
              <span className="col-span-3">
                {shiftDetails.clockOutTime
                  ? formatDateTime(shiftDetails.clockOutTime)
                  : "N/A"}
              </span>
            </div>
          </div>
        ) : (
          <div>No shift details available.</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
