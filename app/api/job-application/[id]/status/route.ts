import { emailProvider } from "@/app/providers/emailProvider";
import { jobApplicationProvider } from "@/app/providers/jobApplicationProvider";
import { NextRequest, NextResponse } from "next/server";

/**
 * endpoint to update the application status if an applicant is approved or rejected
 * @param req
 * @param params request params
 * @returns NextResponse
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { status, facilityName, applicantEmail, jobTitle } = body;
    await jobApplicationProvider.updateApplication(params.id, { status });

    // Prepare email content based on the status
    const emailSubject =
      status === "ACCEPTED" ? "Application Accepted" : "Application Rejected";
    const emailBody =
      status === "ACCEPTED"
        ? `Congratulations! Your application for ${jobTitle} at ${facilityName} has been approved.`
        : `We regret to inform you that your application for ${jobTitle} at ${facilityName} has been rejected.`;

    // Send email notification
    await emailProvider.sendEmailDirectly({
      emailTo: applicantEmail,
      subject: emailSubject,
      content: emailBody,
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
