import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { userProvider } from "@/app/providers/userProvider";
interface IForgotPassword {
  email: string;
}

export async function POST(req: Request) {
  const body: IForgotPassword = await req.json();
  const userEmail = body.email;
  // Check if user email is in the database
  const user = await userProvider.getUserByEmail(userEmail);
  if (!user) {
    // just stop the execution without letting the user know that this email does not exist in our database
    return new Response();
  }
  const secret = process.env.SECRET_KEY + user.password;

  const payload = { email: user.email };
  const token = jwt.sign(payload, secret, { expiresIn: "24h" });
  // TODO: Send the email to the user
  return new NextResponse(JSON.stringify({ email: body.email }));
}
