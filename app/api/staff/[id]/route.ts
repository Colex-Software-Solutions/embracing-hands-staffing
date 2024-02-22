import { uploadFile } from "@/app/providers/S3Provider";
import { staffProvider } from "@/app/providers/staffProvider";
import { StaffProfile } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const urlArr = request.url.split("/");
    const userId = urlArr[urlArr.length - 1];
    if (!userId)
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    const formData = await request.formData();
    const profileImage = formData.get("profileImage") as File;
    const resume = formData.get("resume") as File;
    if (!profileImage || !resume) {
      return NextResponse.json(null, { status: 400 });
    }
    const profileImageBuffer = Buffer.from(await profileImage.arrayBuffer());
    const profileUrl = await uploadFile(
      profileImageBuffer,
      profileImage.name,
      profileImage.type
    );
    const resumeBuffer = Buffer.from(await profileImage.arrayBuffer());
    const resumeUrl = await uploadFile(resumeBuffer, resume.name, resume.type);

    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const about = formData.get("about") as string;
    const title = formData.get("title") as string;
    const skills = formData.get("skills") as string;

    const skillsArray = skills ? JSON.parse(skills) : [];

    const profileData: Omit<StaffProfile, "id"> = {
      userId,
      firstname,
      lastname,
      about,
      title,
      skills: skillsArray,
      profileImage: profileUrl,
      resumeUrl,
      profileSetupComplete: true,
    };

    const updatedProfile = await staffProvider.createOrStaffProfile(
      userId,
      profileData
    );

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
