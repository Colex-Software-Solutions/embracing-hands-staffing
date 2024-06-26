import { facilityProvider } from "@/app/providers/facilityProvider";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { smsProvider } from "@/app/providers/smsProvider";
import { staffProvider } from "@/app/providers/staffProvider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, facilityId, ...jobInfo } = body;
  try {
    let jobPost;
    if (body.id) {
      jobPost = await jobPostProvider.updateJobPost(id, jobInfo);
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

      jobPost = await jobPostProvider.createJobPost({
        ...jobInfo,
        location,
        latitude,
        longitude,
        facilityId,
      });
    }

    const staffs = await staffProvider.getApprovedStaffProfiles();

    const batchSmsData = staffs.map((staff) => {
      return {
        senderName: staff.firstname,
        phoneNumber: staff.user.phone,
        text: `Hi ${staff.firstname}, a new job has been posted. Log into your profile to view the newest jobs`,
      };
    });

    await smsProvider.sendBatchSMS(batchSmsData);

    return NextResponse.json({ success: true, jobPost });
  } catch (error: any) {
    console.error("Job post creation failed", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
