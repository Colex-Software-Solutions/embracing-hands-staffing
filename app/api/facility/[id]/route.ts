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
        { message: "Could not find the user" },
        {
          status: 400,
          statusText: "Invalid User",
        }
      );
    }

    const facility = await facilityProvider.getFacilityProfile(userId);

    let profileImage, profileUrl;
    let contractSignatureUrl: string | null = null;
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
    if (formData.has("contractSignatureUrl")) {
      contractSignatureUrl = formData.get("contractSignatureUrl") as string;
    }

    // Ensure profile image is present
    if (!facility?.profileImage && !profileImage) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "Profile image is required",
      });
    }

    // Ensure signed contract is present on creation
    if (!facility && !contractSignatureUrl) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "Contract Signature is required",
      });
    }

    const name = formData.get("name") as string;
    const facilityType = formData.get("facilityType") as string;
    const address = formData.get("address") as string;
    const facilityRepName = formData.get("facilityRepName") as string;
    const facilityRepPhone = formData.get("facilityRepPhone") as string;
    const latitude = formData.get("latitude") as string;
    const longitude = formData.get("longitude") as string;

    const profileData: Omit<FacilityProfile, "id" | "createdAt" | "userId"> = {
      name,
      facilityType,
      address,
      facilityRepName,
      facilityRepPhone,
      description: "",
      city: "",
      state: "",
      country: "",
      latitude: Number(latitude),
      longitude: Number(longitude),
      profileImage: profileUrl || facility?.profileImage || null,
      contractSignatureUrl:
        contractSignatureUrl || facility?.contractSignatureUrl || null,
      signedContractUrl: null,
    };

    const updatedProfile = facility
      ? await facilityProvider.updatefacilityProfile(userId, profileData)
      : await facilityProvider.createfacilityProfile({
          ...profileData,
          userId,
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
