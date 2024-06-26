import { Button } from "@/app/components/ui/button";
import { format, parseISO } from "date-fns";
import { CardContent, Card } from "@/app/components/ui/card";
import { StaffShift } from "./ShiftsViewer";
import StatusViewer from "./StatusViewer";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";

export const ShiftCard = ({
  shift,
  setFilteredShifts,
}: {
  shift: StaffShift;
  setFilteredShifts: React.Dispatch<React.SetStateAction<StaffShift[]>>;
}) => {
  const isFutureShift = new Date(shift.start) > new Date();
  const startDate = parseISO(new Date(shift.start)?.toISOString());
  const endDate = parseISO(new Date(shift.end)?.toISOString());
  const shiftDate = format(startDate, "PPP"); // Example: Mar 21, 2024
  const shiftTime = `${format(startDate, "p")} - ${format(endDate, "p")}`;
  const { toast } = useToast();
  const confirmShift = async () => {
    try {
      const res = await axios.put(`/api/shift/${shift.id}`, {
        action: "confirm",
      });
      toast({
        title: "Confirmed Shift",
        description: "You have confirmed your attendance to this shift!",
      });
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
        description: `Failed to confirm shift: ` + error.message,
        variant: "destructive",
      });
    }
  };
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
                  <Button onClick={confirmShift}>Acknowledge Shift</Button>
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
      </CardContent>
    </Card>
  );
};
