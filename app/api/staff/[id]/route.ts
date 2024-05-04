import { deleteFile, uploadFile } from "@/app/providers/S3Provider";
import { staffProvider } from "@/app/providers/staffProvider";
import { StaffProfile } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    if (!userId)
      return NextResponse.json(
        { message: "User ID is required." },
        {
          status: 400,
          statusText: "User ID is required.",
        }
      );
    const staff = await staffProvider.getStaffProfile(userId);

    let profileImage, profileUrl;
    const formData = await request.formData();

    // profile url will only be required on first creation
    // otherwise the previous files should be deleted from S3
    if (formData.has("profileImage")) {
      if (staff?.profileImage) {
        deleteFile(staff.profileImage);
      }
      profileImage = formData.get("profileImage") as File;
      const profileImageBuffer = Buffer.from(await profileImage.arrayBuffer());
      profileUrl = await uploadFile(
        profileImageBuffer,
        profileImage.name,
        profileImage.type
      );
    }

    if (!staff && !profileImage) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "profile image is required",
      });
    }

    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const about = formData.get("about") as string;
    const title = formData.get("title") as string;
    const skills = formData.get("skills") as string;

    const skillsArray = skills ? JSON.parse(skills) : [];

    const profileData: Omit<StaffProfile, "id" | "resumeUrl"> = {
      userId,
      firstname,
      lastname,
      about,
      title,
      skills: skillsArray,
      profileImage: profileUrl || staff?.profileImage || null,
      profileSetupComplete: true,
      favoriteJobPostIds: [],
    };

    const updatedProfile = staff
      ? await staffProvider.updateStaffProfile({ userId, data: profileData })
      : await staffProvider.createStaffProfile(profileData);

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const userId = params.id;
    if (!userId)
      return NextResponse.json(
        { message: "User ID is required." },
        {
          status: 400,
          statusText: "User ID is required.",
        }
      );
    const staffProfile = await staffProvider.getStaffProfile(userId);

    if (!staffProfile) {
      return NextResponse.json(
        { message: "Invalid data." },
        {
          status: 400,
          statusText: "Invalid data.",
        }
      );
    }

    const { id, ...rest } = staffProfile;

    const updatedProfile = await staffProvider.updateStaffProfile({
      userId,
      data: {
        ...rest,
        ...data,
      },
    });

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
