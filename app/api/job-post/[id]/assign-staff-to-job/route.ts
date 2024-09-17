import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;
  const { staffProfileId } = await req.json();

  try {
    const updatedApplication = await jobPostProvider.assignStaffToJob(
      jobId,
      staffProfileId
    );

    return NextResponse.json({
      success: true,
      application: updatedApplication,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
