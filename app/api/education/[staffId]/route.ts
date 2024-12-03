import { staffSchoolInfoProvider } from "@/app/providers/staffSchoolInfoProvider";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const educationSchema = z.object({
  schoolName: z.string().min(1),
  schoolAddress: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  degreeReceived: z.string().min(1),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { staffId: string } }
) {
  try {
    const data = await req.json();
    console.log("Test 1", data);
    const validatedData = educationSchema.parse({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });

    console.log("Test2", validatedData);
    const education = await staffSchoolInfoProvider.createStaffSchoolInfo({
      ...validatedData,
      staffProfileId: params.staffId,
    });

    console.log("Test3", education);

    return NextResponse.json(education, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while saving education data." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { staffId: string } }
) {
  const educationId = params.staffId;

  if (!educationId) {
    return NextResponse.json(
      { message: "Education ID is required." },
      { status: 400, statusText: "Bad Request" }
    );
  }

  try {
    await staffSchoolInfoProvider.deleteEducation(educationId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting education:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
