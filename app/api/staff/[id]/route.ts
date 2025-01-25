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
    console.log(profileData);
    const staff = await staffProvider.getStaffProfile(userId);
    // Handle profile image upload
    let profileUrl: string | null = null;

    if (profileImage) {
      try {
        // Check and delete old profile image if it exists
        if (staff?.profileImage) {
          await deleteFile(staff.profileImage);
        }

        // Ensure base64 string is valid
        if (!profileImage.startsWith("data:image")) {
          return NextResponse.json(
            { message: "Invalid profile image format." },
            { status: 400 }
          );
        }

        const profileImageBuffer = Buffer.from(
          profileImage.split(",")[1],
          "base64"
        );

        // Generate a unique file name
        const timestamp = Date.now();
        const extension = profileImage.split(";")[0].split("/")[1];
        const fileName = `profile-${userId}-${timestamp}.${extension}`;

        // Upload the file
        profileUrl = await uploadFile(
          profileImageBuffer,
          fileName,
          `image/${extension}`
        );
      } catch (error) {
        console.error("Error uploading profile image:", error);
        return NextResponse.json(
          { message: "Failed to upload profile image." },
          { status: 500 }
        );
      }
    }

    let updatedProfileData;
    if (staff) {
      const { id, userId, ...rest } = staff;
      updatedProfileData = {
        ...rest,
        ...profileData,
        profileImage: profileUrl || staff.profileImage || null,
      };
    } else {
      updatedProfileData = {
        ...profileData,
        profileImage: profileUrl || null,
      };
    }
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
