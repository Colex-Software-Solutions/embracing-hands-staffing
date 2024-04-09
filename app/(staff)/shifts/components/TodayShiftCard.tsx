"use client";
import React from "react";
import { Button } from "@/app/components/ui/button";
import { StaffShift } from "./ShiftsViewer";
import { format, parseISO } from "date-fns";
import StatusViewer from "./StatusViewer";
import { ConfirmationModal } from "@/app/components/modals/confirmation-modal";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";

const TodayShiftCard = ({
  shift,
  setFilteredShifts,
}: {
  shift?: StaffShift;
  setFilteredShifts: React.Dispatch<React.SetStateAction<StaffShift[]>>;
}) => {
  console.log("today shift", shift);
  if (!shift) {
    return <div className="text-xl font-bold">No shifts today.</div>;
  }
  const startDate = parseISO(new Date(shift.start).toISOString());
  const { toast } = useToast();
  const endDate = parseISO(new Date(shift.end).toISOString());
  const shiftTime = `${format(startDate, "p")} - ${format(endDate, "p")}`;
  const ongoingBreak = shift.breaks.find((b) => b.start && !b.end);

  const handleShiftActions = async (action: "confirm" | "start" | "end") => {
    try {
      const res = await axios.put(`/api/shift/${shift.id}`, { action });
      const updatedShift = res.data.shift;
      setFilteredShifts((prevShifts: StaffShift[]) => {
        const mappedShifts = prevShifts.map((shift) =>
          shift.id === updatedShift.id ? { ...shift, ...updatedShift } : shift
        );

        return mappedShifts;
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error!",
        description: `Failed to ${action} shift: ` + error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {" "}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Today's Shift</h1>
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="flex flex-col gap-1">
          <div className="font-semibold">Shift date</div>
          <div>{format(new Date(shift.start), "PPP")}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold">time</div>
          <div>{shiftTime}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold">Location</div>
          <div>{shift.location}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold">Job Title</div>
          <div>{shift.title}</div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-semibold">Facility</div>
        <div>{shift.facilityName}</div>
      </div>
      <div>
        <StatusViewer status={shift.status} />
      </div>
      <div className="flex flex-col gap-2">
        {shift.status === "Scheduled" && (
          <ConfirmationModal
            triggerButtonText="Acknowledge Shift"
            confirmationQuestion="Are you sure you want to acknowledge this shift?"
            onConfirm={() => handleShiftActions("confirm")}
            confirmButtonText="Acknowledge"
          />
        )}

        {shift.status === "Confirmed" && (
          <ConfirmationModal
            triggerButtonText="Start Shift"
            confirmationQuestion="Are you sure you want to start this shift?"
            onConfirm={() => handleShiftActions("start")}
            confirmButtonText="Start"
          />
        )}

        {shift.status === "InProgress" && !ongoingBreak && (
          <>
            <ConfirmationModal
              triggerButtonText="Start Break"
              confirmationQuestion="Are you sure you want to start a break?"
              onConfirm={() => console.log("Start Break")} // Implement start break logic
              confirmButtonText="Start Break"
            />
            <ConfirmationModal
              triggerButtonText="End Shift"
              confirmationQuestion="Are you sure you want to end this shift?"
              onConfirm={() => console.log("End Shift")} // Implement end shift logic
              confirmButtonText="End Shift"
            />
          </>
        )}

        {shift.status === "InProgress" && ongoingBreak && (
          <ConfirmationModal
            triggerButtonText="End Break"
            confirmationQuestion="Are you sure you want to end the break?"
            onConfirm={() => console.log("End Break")} // Implement end break logic
            confirmButtonText="End Break"
          />
        )}
      </div>
    </>
  );
};

export default TodayShiftCard;
