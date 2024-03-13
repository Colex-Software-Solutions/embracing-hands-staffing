import { emailProvider } from "@/app/providers/emailProvider";
import { jobApplicationProvider } from "@/app/providers/jobApplicationProvider";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { JobStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { status }: { status: JobStatus } = body;

    // check if at least one applicant is approved for this application otherwise the job can't be completed
    const applications = await jobApplicationProvider.getApplicationsByJobId(
      params.id
    );
    const acceptedApplicant = applications.some(
      (applicant) => applicant.status === "ACCEPTED"
    );
    if (!acceptedApplicant && status === "COMPLETED") {
      return NextResponse.json(
        {
          message:
            "You cannot complete this job before accepting at least one applicant",
        },
        {
          status: 400,
          statusText:
            "You cannot complete this job before accepting at least one applicant",
        }
      );
    }
    if (acceptedApplicant && status === "CLOSED") {
      return NextResponse.json(
        {
          message:
            "You cannot close this job as you have an accepted applicant. Please complete this job instead!",
        },
        {
          status: 400,
          statusText:
            "You cannot close this job as you have an accepted applicant. Please complete this job instead!",
        }
      );
    }

    await jobPostProvider.updatePartialJobPost(params.id, body);

    // reject the reset of applicants
    for (let applicant of applications) {
      if (applicant.status === "PENDING") {
        await jobApplicationProvider.updateApplication(applicant.id, {
          status: "REJECTED",
        });

        // Send email notification
        const emailSubject = "Application Rejected";
        const emailBody = `We regret to inform you that your application for ${applicant.jobPost.title} at ${applicant.jobPost.facilityProfile.name} has been rejected.`;
        await emailProvider.sendEmailDirectly({
          emailTo: applicant.staffProfile.user.email,
          subject: emailSubject,
          content: emailBody,
        });
      }
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
