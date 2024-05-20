import { deleteFile, uploadFile } from "@/app/providers/S3Provider";
import { staffProvider } from "@/app/providers/staffProvider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      profileImage, // assuming profileImage is sent as a URL or base64 string
      ...profileData // other fields will be part of the profileData object
    } = body;

    const staff = await staffProvider.getStaffProfile(userId);
    // Handle profile image upload
    let profileUrl;
    if (profileImage) {
      if (staff?.profileImage) {
        deleteFile(staff.profileImage);
      }
      const profileImageBuffer = Buffer.from(
        profileImage.split(",")[1],
        "base64"
      );
      profileUrl = await uploadFile(
        profileImageBuffer,
        profileImage.name,
        profileImage.type
      );
    }

    if (!staff && !profileImage) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "Profile image is required",
      });
    }
    let updatedProfileData;
    if (staff) {
      const { id, userId, ...rest } = staff;
      updatedProfileData = {
        ...rest,
        ...profileData,
        profileImage: profileUrl || staff?.profileImage || null,
      };
    } else {
      updatedProfileData = {
        ...profileData,
        profileImage: profileUrl || null,
      };
    }
    console.log(updatedProfileData);
    const updatedProfile = staff
      ? await staffProvider.updateStaffProfile({
          userId,
          data: updatedProfileData,
        })
      : await staffProvider.createStaffProfile(updatedProfileData);

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error: any) {
    console.error(error);
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
