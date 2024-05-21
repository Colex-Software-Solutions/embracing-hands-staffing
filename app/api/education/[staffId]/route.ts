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

    const validatedData = educationSchema.parse({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });

    const education = await staffSchoolInfoProvider.createStaffSchoolInfo({
      ...validatedData,
      staffProfileId: params.staffId,
    });

    return NextResponse.json(education, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while saving education data." },
      { status: 500 }
    );
  }
}
