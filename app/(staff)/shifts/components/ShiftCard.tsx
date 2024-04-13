"use client";
import { Button } from "@/app/components/ui/button";
import { format, parseISO } from "date-fns";
import { CardContent, Card } from "@/app/components/ui/card";
import { StaffShift } from "./ShiftsViewer";
import StatusViewer from "./StatusViewer";

const getDateRange = (startDate: Date, endDate: Date) => {
  const formattedStartDate = format(startDate, "PPP");
  const formattedEndDate = format(endDate, "PPP");

  if (formattedStartDate === formattedEndDate) {
    return formattedStartDate;
  }

  return `${format(startDate, "PPP")} - ${format(endDate, "PPP")}`;
};

export const ShiftCard = ({ shift }: { shift: StaffShift }) => {
  const isFutureShift = new Date(shift.start) > new Date();
  const startDate = parseISO(new Date(shift.start)?.toISOString());
  const endDate = parseISO(new Date(shift.end)?.toISOString());
  const shiftDate = getDateRange(startDate, endDate);
  const shiftTime = `${format(startDate, "p")} - ${format(endDate, "p")}`;
  return (
    <Card className="mb-4 p-4">
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">{shift.facilityName}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">Date</div>
            <div>{shiftDate}</div>
          </div>
          <div>
            <div className="font-semibold">Time</div>
            <div>{shiftTime}</div>
          </div>
          <div>
            <div className="font-semibold">Location</div>
            <div>{shift.location}</div>
          </div>
          <div>
            <div className="font-semibold">Job Title</div>
            <div>{shift.title}</div>
          </div>
          {isFutureShift ? (
            <>
              <div className="col-span-2 flex justify-between items-center">
                <div>
                  <StatusViewer status={shift.status} />
                </div>

                {shift.status === "Scheduled" && (
                  <Button>Acknowledge Shift</Button>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <StatusViewer status={shift.status} />
              </div>
            </>
          )}
        </div>
        {isFutureShift && shift.status !== "Scheduled" && (
          <div className="flex gap-2">
            <Button>Clock In</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
