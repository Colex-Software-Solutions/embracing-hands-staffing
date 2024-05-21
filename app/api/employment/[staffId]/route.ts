import { NextRequest, NextResponse } from "next/server";
import { employmentProvider } from "@/app/providers/employmentProvider";
import { EmploymentHistory } from "@prisma/client";

export async function POST(
  req: NextRequest,
  { params }: { params: { staffId: string } }
) {
  try {
    const data: Omit<EmploymentHistory, "id" | "staffProfileId"> =
      await req.json();

    const education = await employmentProvider.addEmploymentHistory(
      params.staffId,
      {
        ...data,
        payRate: data.payRate === undefined ? null : data.payRate,
      }
    );

    return NextResponse.json(education, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while saving education data." },
      { status: 500 }
    );
  }
}
