import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { userProvider } from "@/app/providers/userProvider";
import { emailProvider } from "@/app/providers/emailProvider";
import prisma from "@/db/prisma";
interface IForgotPassword {
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: IForgotPassword = await req.json();
    const userEmail = body.email;
    // Check if user email is in the database
    const user = await userProvider.getUserByEmail(userEmail);
    if (!user) {
      // just stop the execution without letting the user know that this email does not exist in our database
      return new Response();
    }

    // delete all current expiry codes for that user
    await prisma.passwordReset.deleteMany({ where: { userId: user.id } });

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit code
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Set expiration time to 24 hours from now

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        code: resetCode,
        createdAt: new Date(),
        expiresAt,
      },
    });

    await emailProvider.sendEmailDirectly({
      emailTo: userEmail,
      subject: "Password Reset Request",
      content: `Your 1 time use password reset code is: ${resetCode}`,
    });

    return NextResponse.json({ message: "Reset code sent to your email." });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}

// Function to validate the 6 digit code entered by the user
export async function PUT(req: NextRequest) {
  try {
    const { code, email } = await req.json();
    const user = await userProvider.getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: "Cannot validate the code" },
        { status: 400 }
      );
    }
    const resetRecord = await prisma.passwordReset.findFirst({
      where: {
        userId: user.id,
        code,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!resetRecord) {
      return NextResponse.json(
        { message: "Invalid or expired code." },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Code verified successfully." });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
