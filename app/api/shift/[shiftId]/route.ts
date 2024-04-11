import { shiftProvider } from "@/app/providers/shiftProvider";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { shiftId: string } }
) {
  const { shiftId } = params;
  const { action } = await req.json();
  console.log(action);

  try {
    switch (action) {
      case "confirm":
        const confirmedShift = await shiftProvider.confirmShift(
          shiftId as string
        );
        return NextResponse.json({ shift: confirmedShift });

      case "start":
        const startedShift = await shiftProvider.startShift(shiftId as string);
        return NextResponse.json({ shift: startedShift });

      case "end":
        const endedShift = await shiftProvider.endShift(shiftId as string);
        return NextResponse.json({ shift: endedShift });

      default:
        return NextResponse.json(
          { message: "Invalid action." },
          { status: 400 }
        );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
