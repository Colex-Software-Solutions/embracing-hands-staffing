import { shiftProvider } from "@/app/providers/shiftProvider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobPostId, staffProfileId, start, end } = body;

    const shift = await shiftProvider.createShift({
      jobPostId,
      staffProfileId,
      start: new Date(start),
      end: new Date(end),
    });

    return NextResponse.json({ success: true, shift });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  try {
    const shifts = await shiftProvider.getAllShifts(jobId);

    if (shifts.length === 0) {
      return NextResponse.json(
        { error: "No shift found for this job" },
        { status: 404 }
      );
    }

    // Since we now have only one shift per job, we can return the first (and only) shift
    const shift = shifts[0];

    const shiftDetails = {
      id: shift.id,
      start: shift.start,
      end: shift.end,
      status: shift.status,
      clockInTime: shift.clockInTime,
      clockOutTime: shift.clockOutTime,
      staffName: shift.staffProfile
        ? `${shift.staffProfile.firstname} ${shift.staffProfile.lastname}`
        : "NOT ASSIGNED",
    };

    return NextResponse.json(shiftDetails);
  } catch (error) {
    console.error("Error fetching shift details:", error);
    return NextResponse.json(
      { error: "Failed to fetch shift details" },
      { status: 500 }
    );
  }
}
