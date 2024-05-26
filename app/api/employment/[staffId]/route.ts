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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { staffId: string } }
) {
  const employmentId = params.staffId;

  if (!employmentId) {
    return NextResponse.json(
      { message: "Employment ID is required." },
      { status: 400, statusText: "Bad Request" }
    );
  }

  try {
    await employmentProvider.deleteEmploymentHistory(employmentId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting employment:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
