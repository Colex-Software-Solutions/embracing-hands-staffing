import { NextRequest, NextResponse } from "next/server";
import { userProvider } from "@/app/providers/userProvider";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
interface RegisterBody {
  user: Omit<User, "status" | "createdAt" | "updatedAt" | "stripeId">;
}

export async function POST(req: NextRequest) {
  const body: RegisterBody = await req.json();
  try {
    const user = await userProvider.createUser({
      ...body.user,
      status: "PENDING",
      password: await bcrypt.hash(body.user.password, 10),
    });
    return new NextResponse(JSON.stringify({ user, success: true }));
  } catch (error: any) {
    console.log(error);
    return new NextResponse(null, { status: 500, statusText: error.message });
  }
}
