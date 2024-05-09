import { userProvider } from "@/app/providers/userProvider";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import prisma from "@/db/prisma";

export async function PUT(req: NextRequest) {
  try {
    const { email, newPassword } = await req.json();
    const user = await userProvider.getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 400 }
      );
    }
    const { id } = user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: id },
      data: { password: hashedPassword },
    });

    await prisma.passwordReset.deleteMany({
      where: { userId: id },
    });

    return NextResponse.json({
      message: "Password has been reset successfully.",
    });
  } catch (error: any) {
    console.log(error);
    return new Response(null, {
      status: 401,
      statusText: error.message,
    });
  }
}
