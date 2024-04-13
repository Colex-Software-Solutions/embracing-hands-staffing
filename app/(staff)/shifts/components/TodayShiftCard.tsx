import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { StaffShift } from "./ShiftsViewer";
import { format, parseISO } from "date-fns";
import StatusViewer from "./StatusViewer";
import { ConfirmationModal } from "@/app/components/modals/confirmation-modal";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";
import { isWithinRadius } from "@/lib/utils";

const formatBreakTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const TodayShiftCard = ({
  shift,
  setFilteredShifts,
}: {
  shifts: StaffShift[];
  shift?: StaffShift;
  setFilteredShifts: React.Dispatch<React.SetStateAction<StaffShift[]>>;
}) => {
  const { toast } = useToast();
  const [locationLoading, setLocationLoading] = useState(false);
  const [breakTime, setBreakTime] = useState(0);
  const ongoingBreak = shift?.breaks.find((b) => b.start && !b.end);

  const handleStart = () => {
    if (!shift) {
      return;
    }

    setLocationLoading(true);

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const isValidDistance = isWithinRadius({
          radius: 0.5,
          userGeolocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          jobGeolocation: {
            latitude: shift.latitude,
            longitude: shift.longitude,
          },
        });

        setLocationLoading(false);

        if (!isValidDistance) {
          toast({
            variant: "destructive",
            title: "You are too far!",
            description: "Please reach the facility before clocking in.",
          });

          return;
        }

        handleShiftActions("start");
      },
      (err: GeolocationPositionError) => {
        console.log(err.message);
      }
    );
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (ongoingBreak) {
      const startTime = new Date(ongoingBreak.start).getTime();
      const updateTimer = () => {
        const currentTime = Date.now();
        const newBreakTime = Math.floor((currentTime - startTime) / 1000);
        setBreakTime(newBreakTime);
      };

      updateTimer();
      timerId = setInterval(updateTimer, 1000);
    } else {
      setBreakTime(0);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [ongoingBreak]);

  if (!shift) {
    return <div className="text-xl font-bold">No shifts today.</div>;
  }

  const startDate = parseISO(new Date(shift.start).toISOString());
  const endDate = parseISO(new Date(shift.end).toISOString());
  const shiftTime = `${format(startDate, "p")} - ${format(endDate, "p")}`;

  const handleShiftActions = async (action: "confirm" | "start" | "end") => {
    try {
      const res = await axios.put(`/api/shift/${shift.id}`, { action });

      if (action === "start") {
        toast({
          variant: "default",
          title: "You are clocked in!",
          description: "Have a great shift.",
        });
      }

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

  const handleBreakActions = async (action: "start" | "end") => {
    try {
      const res = await axios.put(`/api/shift/breaks/${shift.id}`, {
        action,
      });

      toast({
        variant: "default",
        title: "Action Successful",
        description: `You have successfully ${
          action === "start" ? "started a break" : "ended the break"
        }.`,
      });

      setFilteredShifts((prevShifts: any[]) => {
        return prevShifts.map((s) => {
          if (s.id === shift.id) {
            return {
              ...s,
              breaks:
                action === "start"
                  ? [...s.breaks, res.data]
                  : s.breaks.map((b: any) =>
                      b.end ? b : { ...b, end: res.data.end }
                    ),
            };
          }
          return s;
        });
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error!",
        description:
          `Failed to ${action === "start" ? "start break" : "end break"}: ` +
          error.message,
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
      {ongoingBreak && (
        <div className="text-lg font-semibold">
          Break Time: {formatBreakTime(breakTime)}
        </div>
      )}
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
            loading={locationLoading}
            triggerButtonText="Start Shift"
            confirmationQuestion="Are you sure you want to start this shift?"
            onConfirm={() => handleStart()}
            confirmButtonText="Start"
          />
        )}

        {shift.status === "InProgress" && !ongoingBreak && (
          <>
            <ConfirmationModal
              triggerButtonText="Start Break"
              confirmationQuestion="Are you sure you want to start a break?"
              onConfirm={() => handleBreakActions("start")} // Implement start break logic
              confirmButtonText="Start Break"
            />
            <ConfirmationModal
              triggerButtonText="End Shift"
              confirmationQuestion="Are you sure you want to end this shift?"
              onConfirm={() => handleShiftActions("end")}
              confirmButtonText="End Shift"
            />
          </>
        )}

        {shift.status === "InProgress" && ongoingBreak && (
          <ConfirmationModal
            triggerButtonText="End Break"
            confirmationQuestion="Are you sure you want to end the break?"
            onConfirm={() => handleBreakActions("end")} // Implement end break logic
            confirmButtonText="End Break"
          />
        )}
      </div>
    </>
  );
};

export default TodayShiftCard;
