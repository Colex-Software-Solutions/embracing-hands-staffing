import { userProvider } from "@/app/providers/userProvider";
import { NextRequest, NextResponse } from "next/server";

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

    const updatedUser = await userProvider.updateUser(userId, data);

    return NextResponse.json({ success: true, profile: updatedUser });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
