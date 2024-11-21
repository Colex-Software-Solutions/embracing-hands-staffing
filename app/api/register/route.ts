import { NextRequest, NextResponse } from "next/server";
import { userProvider } from "@/app/providers/userProvider";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { EmailTemplate, emailProvider } from "@/app/providers/emailProvider";
import { adminTestEmail } from "@/lib/utils";
interface RegisterBody {
  user: Omit<User, "status" | "createdAt" | "updatedAt">;
}

export async function POST(req: NextRequest) {
  const body: RegisterBody = await req.json();
  try {
    const user = await userProvider.createUser({
      ...body.user,
      status: "PENDING",
      password: await bcrypt.hash(body.user.password, 10),
    });

    // send new application email to admin
    emailProvider.sendEmailWithTemplate({
      emailTo: process.env.ADMIN_EMAIL || adminTestEmail,
      emailTemplateId: EmailTemplate.NEW_APPLICATION_REQUEST,
      emailParams: {
        websiteUrl: `${
          process.env.WEBSITE_URL
        }/admin/${user.role.toLowerCase()}`,
      },
    });

    return new NextResponse(JSON.stringify({ user, success: true }));
  } catch (error: any) {
    console.log(error);
    return new NextResponse(null, { status: 500, statusText: error.message });
  }
}
