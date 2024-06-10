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

    if (!userId) {
      return NextResponse.json(
        { message: "This job post could not be found." },
        {
          status: 400,
          statusText: "Invalid job post",
        }
      );
    }

    const facility = await facilityProvider.getFacilityProfile(userId);

    let profileImage, profileUrl;
    let signedContract, signedContractUrl;
    const formData = await request.formData();

    // Handle profile image
    if (formData.has("profileImage")) {
      if (facility?.profileImage) {
        await deleteFile(facility.profileImage);
      }
      profileImage = formData.get("profileImage") as File;

      const profileImageBuffer = Buffer.from(await profileImage.arrayBuffer());
      profileUrl = await uploadFile(
        profileImageBuffer,
        profileImage.name,
        profileImage.type
      );
    }

    // Handle signed contract PDF
    if (formData.has("signedContract")) {
      signedContract = formData.get("signedContract") as File;

      const signedContractBuffer = Buffer.from(
        await signedContract.arrayBuffer()
      );
      signedContractUrl = await uploadFile(
        signedContractBuffer,
        signedContract.name,
        signedContract.type
      );
    }

    // Ensure profile image is present
    if (!facility?.profileImage && !profileImage) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "Profile image is required",
      });
    }

    // Ensure signed contract is present on creation
    if (!facility && !signedContractUrl) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "Signed contract is required",
      });
    }

    const name = formData.get("name") as string;
    const facilityType = formData.get("facilityType") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const country = formData.get("country") as string;
    const state = formData.get("state") as string;
    const city = formData.get("city") as string;
    const latitude = formData.get("latitude") as string;
    const longitude = formData.get("longitude") as string;

    const profileData: Omit<FacilityProfile, "id"> = {
      userId,
      name,
      facilityType,
      description,
      address,
      state,
      country,
      city,
      latitude: Number(latitude),
      longitude: Number(longitude),
      profileImage: profileUrl || facility?.profileImage || null,
      signedContractUrl:
        signedContractUrl || facility?.signedContractUrl || null,
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
