import { userProvider } from "@/app/providers/userProvider";

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
    return new Response(
      JSON.stringify({ success: false, message: error.message })
    );
  }
}
