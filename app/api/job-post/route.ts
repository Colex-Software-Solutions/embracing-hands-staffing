import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const jobPost = await jobPostProvider.createJobPost(body);
    return NextResponse.json({ success: true, jobPost });
  } catch (error: any) {
    console.error("Job post creation failed", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
