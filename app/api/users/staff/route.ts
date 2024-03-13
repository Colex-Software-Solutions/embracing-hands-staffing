import { staffProvider } from "@/app/providers/staffProvider";
import { userProvider } from "@/app/providers/userProvider";
import { NextRequest } from "next/server";

interface RequestBody {
  id: string;
  status: "APPROVED" | "REJECTED";
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  try {
    const user = await userProvider.updateUserStatus(body.id, body.status);
    return new Response(JSON.stringify({ success: true, user }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }));
  }
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, message: "user id not found" })
    );
  }

  try {
    const user = await staffProvider.getStaffProfile(userId);
    return new Response(JSON.stringify({ success: true, user }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }));
  }
}
