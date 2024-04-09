import { CardContent, Card } from "@/app/components/ui/card";
import { ShiftsViewer } from "./components/ShiftsViewer";
import { getServerSession } from "@/lib/getServerSession";
import { shiftProvider } from "@/app/providers/shiftProvider";

export default async function ShiftsPage() {
  const session = await getServerSession();

  const shifts = await shiftProvider.getShiftsByStaffId(
    session.user?.staffProfile.id ?? ""
  );
  const mappedShifts = shifts.map((shift) => ({
    ...shift,
    title: shift.jobPost.title,
    location:
      shift.jobPost?.location && shift.jobPost.location !== ""
        ? shift.jobPost.location
        : shift.jobPost.facilityProfile.address,
    facilityName: shift.jobPost.facilityProfile.name,
    staffName: shift.staffProfile.firstname + " " + shift.staffProfile.lastname,
  }));

  return (
    <Card className="sm:mx-24 p-6">
      <CardContent className="flex flex-col gap-4">
        <ShiftsViewer shifts={mappedShifts} />
      </CardContent>
    </Card>
  );
}
