import { shiftProvider } from "@/app/providers/shiftProvider";
import ShiftsManager from "../../../job-post/components/shiftsManager";
import { Status } from "@prisma/client";

interface ShiftStaffProfile {
  firstname: string;
  lastname: string;
}

interface FetchedShift {
  id: string;
  jobPostId: string;
  staffProfileId: string;
  start: Date;
  end: Date;
  status: Status;
  clockInTime?: Date;
  clockOutTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  staffProfile: ShiftStaffProfile;
}

export interface Shift {
  id: string;
  jobPostId: string;
  staffProfileId: string;
  start: Date;
  end: Date;
  status: Status;
  clockInTime?: Date;
  clockOutTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  staffName: string;
}

const mapFetchedShiftsToShifts = (fetchedShifts: FetchedShift[]): Shift[] =>
  fetchedShifts.map((fetchedShift) => {
    return {
      ...fetchedShift,
      staffProfile: null,
      staffName: fetchedShift.staffProfile
        ? ` ${fetchedShift.staffProfile.firstname} ${fetchedShift.staffProfile.lastname}`
        : "NOT ASSIGNED",
    };
  });

const JobPostPage = async ({ params }: { params: { jobPostId: string } }) => {
  const jobPostId = params.jobPostId;
  const fetchedShifts = (await shiftProvider.getAllShifts(
    jobPostId
  )) as FetchedShift[];
  const shifts = mapFetchedShiftsToShifts(fetchedShifts);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Shifts</h2>
            <p className="text-muted-foreground">Manage job shifts.</p>
          </div>
        </div>

        <ShiftsManager initialShifts={shifts} jobPostId={jobPostId} />
      </div>
    </>
  );
};

export default JobPostPage;
