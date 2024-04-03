import { jobApplicationProvider } from "@/app/providers/jobApplicationProvider";
import { shiftProvider } from "@/app/providers/shiftProvider";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest,
  { params }: { params: { id: string } }) {
  try {
    const jobPostId = params.id;

    const jobApplications = await jobApplicationProvider.getApplicationsByJobId(jobPostId);

    return new Response(JSON.stringify({ success: true, jobApplications }));
  } catch (error: any) {
    console.log(error);
    return new Response(null, {
      status: 401,
      statusText: error.message,
    });
  }
}
