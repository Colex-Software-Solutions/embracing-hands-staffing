import { userProvider } from "@/app/providers/userProvider";

export async function GET(request: Request) {
  try {
    const staffUsers = await userProvider.getStaffUsers();
    return new Response(JSON.stringify(staffUsers));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false, error }));
  }
}
