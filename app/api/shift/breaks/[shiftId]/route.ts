import { shiftProvider } from "@/app/providers/shiftProvider";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { shiftId: string } }
) {
  const { shiftId } = params;
  const { action } = await req.json();

  try {
    switch (action) {
      case "start":
        const breakStarted = await shiftProvider.startBreak(shiftId as string);
        return NextResponse.json(breakStarted);
      case "end":
        const breakEnded = await shiftProvider.endBreak(shiftId as string);
        return NextResponse.json(breakEnded);
      default:
        return NextResponse.json({ message: "Invalid action." });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
