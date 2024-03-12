import { EmailTemplate, emailProvider } from "@/app/providers/emailProvider";
import { userProvider } from "@/app/providers/userProvider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const jobPostId = params.id;
    const { staffUserId, message } = data;

    if (!jobPostId || !staffUserId || !message) {
      return NextResponse.json(
        { message: "Missing data." },
        {
          status: 400,
          statusText: "Missing data.",
        }
      );
    }

    const facilityUserResponse = await userProvider.getUserByJobPostId(
      jobPostId
    );

    if (!facilityUserResponse) {
      return NextResponse.json(
        { message: "Facility user could not be found." },
        {
          status: 400,
          statusText: "Facility user could not be found.",
        }
      );
    }

    const staffUser = await userProvider.getStaffUserById(staffUserId);

    if (!staffUser || !staffUser.staffProfile) {
      return NextResponse.json(
        { message: "Staff user could not be found." },
        {
          status: 400,
          statusText: "Staff user could not be found.",
        }
      );
    }

    await emailProvider.sendJobPostEmail({
      emailTo: facilityUserResponse.facilityProfile.user.email,
      emailTemplateId: EmailTemplate.APPLICATION_EMAIL_TO_FACILITY,
      emailParams: {
        name: `${staffUser.staffProfile.firstname} ${staffUser.staffProfile.lastname}`, // TODO: Replace with real data
        jobPostId,
        message,
        email: staffUser.email,
      },
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
