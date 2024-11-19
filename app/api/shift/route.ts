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
