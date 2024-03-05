import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { updateObj } = body;
    await jobPostProvider.updatePartialJobPost(params.id, updateObj);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
