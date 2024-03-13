import { jobApplicationProvider } from "@/app/providers/jobApplicationProvider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { jobId, staffId } = body;
    await jobApplicationProvider.createJobApplication({
      jobId,
      staffId,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
