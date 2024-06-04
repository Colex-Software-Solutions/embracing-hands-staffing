import { staffProvider } from "@/app/providers/staffProvider";
import { userProvider } from "@/app/providers/userProvider";
import { NextRequest } from "next/server";

export interface StaffUserPaginationFilter {
  key: string;
  value: string;
}

export async function GET(request: NextRequest) {
  const pageSize = request.nextUrl.searchParams.get("pageSize");
  const page = request.nextUrl.searchParams.get("page");
  const filtersJson = request.nextUrl.searchParams.get("filters");
  const filters = filtersJson ? JSON.parse(filtersJson) as StaffUserPaginationFilter[] : [];

  if (!pageSize || !page) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing page information" })
    );
  }

  try {
    const staffUsers = await userProvider.getStaffUsers(Number(page), Number(pageSize), filters);

    return new Response(JSON.stringify({ success: true, staffUsers }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }));
  }
}
