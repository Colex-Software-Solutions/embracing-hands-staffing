import { emailProvider } from "@/app/providers/emailProvider";
import { facilityProvider } from "@/app/providers/facilityProvider";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { smsProvider } from "@/app/providers/smsProvider";
import { staffProvider } from "@/app/providers/staffProvider";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, facilityId, startTime, endTime, ...jobInfo } = body;
  try {
    let jobPost;
    if (id) {
      jobPost = await jobPostProvider.updateJobPostWithShift(id, {
        ...jobInfo,
        startTime,
        endTime,
      });
    } else {
      let location = jobInfo.location;
      let latitude = jobInfo.latitude;
      let longitude = jobInfo.longitude;

      if (!latitude || !longitude || location === "") {
        const facility = await facilityProvider.getFacilityProfileById(
          facilityId
        );
        if (!facility) {
          return NextResponse.json({
            status: 500,
            statusText: "Failed to fetch facility",
          });
        }
        location = facility.address;
        longitude = facility.longitude;
        latitude = facility.latitude;
      }

      jobPost = await jobPostProvider.createJobPostWithShift({
        ...jobInfo,
        location,
        latitude,
        longitude,
        facilityId,
        startTime,
        endTime,
      });

      // get all staff with required tags
      const validStaffs = await staffProvider.getValidStaffProfiles(
        jobPost.tags
      );

      // send sms
      const batchSmsData = validStaffs.map((staff) => {
        return {
          senderName: staff.firstname,
          phoneNumber: staff.user.phone,
          text: `Hi ${staff.firstname}, a new job has been posted. Log into your profile to view the newest jobs`,
        };
      });
      await smsProvider.sendBatchSMS(batchSmsData);

      // send email to admin
      await emailProvider.sendEmailToAdmin({
        subject: "New Job posted",
        content: `A new job has been posted, log in to the admin console to view new jobs.`,
      });
    }

    return NextResponse.json({ success: true, jobPost });
  } catch (error: any) {
    console.error("Job post operation failed", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
