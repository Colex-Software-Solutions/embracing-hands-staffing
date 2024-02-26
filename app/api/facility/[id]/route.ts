import { deleteFile, uploadFile } from "@/app/providers/S3Provider";
import { facilityProvider } from "@/app/providers/facilityProvider";
import { FacilityProfile } from "@prisma/client";
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
    const facility = await facilityProvider.getFacilityProfile(userId);

    let profileImage, profileUrl;
    const formData = await request.formData();

    // profile url will only be required on first creation
    // otherwise the previous files should be deleted from S3
    if (formData.has("profileImage")) {
      if (facility?.profileImage) {
        deleteFile(facility.profileImage);
      }
      profileImage = formData.get("profileImage") as File;

      const profileImageBuffer = Buffer.from(await profileImage.arrayBuffer());
      profileUrl = await uploadFile(
        profileImageBuffer,
        profileImage.name,
        profileImage.type
      );
    }

    if (!facility?.profileImage && !profileImage) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "profile image is required",
      });
    }

    const name = formData.get("name") as string;
    const facilityType = formData.get("facilityType") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;

    const profileData: Omit<FacilityProfile, "id"> = {
      userId,
      name,
      facilityType,
      description,
      address,
      profileImage: profileUrl || facility?.profileImage || null,
    };

    const updatedProfile = facility
      ? await facilityProvider.updatefacilityProfile(userId, profileData)
      : await facilityProvider.createfacilityProfile(profileData);

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
