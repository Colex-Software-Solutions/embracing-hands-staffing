import { staffProvider } from "@/app/providers/staffProvider";
import { userProvider } from "@/app/providers/userProvider";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageSize = request.nextUrl.searchParams.get("pageSize");
  const page = request.nextUrl.searchParams.get("page");

  if (!pageSize || !page) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing page information" })
    );
  }

  try {
    const staffUsers = await userProvider.getStaffUsers(Number(page), Number(pageSize));

    return new Response(JSON.stringify({ success: true, staffUsers }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }));
  }
}
