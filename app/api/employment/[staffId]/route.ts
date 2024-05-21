import { NextRequest, NextResponse } from "next/server";
import { employmentProvider } from "@/app/providers/employmentProvider";
import { z } from "zod";

export const employmentSchema = z.object({
  company: z.string().min(1, "Company Name is required"),
  jobTitle: z.string().min(1, "Job Title is required"),
  address: z.string().min(1, "Address is required"),
  employedFrom: z.date(),
  employedTo: z.date(),
  supervisor: z.string().min(1, "Supervisor is required"),
  payRate: z.number().optional(),
  phoneNumber: z.string().min(1, "Phone Number is required"),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { staffId: string } }
) {
  try {
    const data = await req.json();

    // const validatedData = employmentSchema.parse({
    //   ...data,
    //   employedFrom: new Date(data.fromDate),
    //   employedTo: new Date(data.toDate),
    // });

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
