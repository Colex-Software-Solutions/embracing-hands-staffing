import { userProvider } from "@/app/providers/userProvider";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userEmail = req.nextUrl.searchParams.get("email");
    const token = req.nextUrl.searchParams.get("token");
    if (!userEmail || !token) {
      return new Response(null, {
        status: 400,
        statusText: "Email and token are not provided",
      });
    }
    const user = await userProvider.getUserByEmail(userEmail);
    if (!user || !token) {
      return new Response(null, {
        status: 400,
        statusText: "Your Token is expired",
      });
    }
    const secret = process.env.SECRET_KEY + user.password;
    // if the payload is not verified it will trigger an exception
    const payload = jwt.verify(token, secret);
    // TODO: Validate the payload and send the approved response
    return new Response(JSON.stringify({ success: true }));
  } catch (error: any) {
    console.log(error);
    return new Response(null, {
      status: 401,
      statusText: error.message,
    });
  }
}
