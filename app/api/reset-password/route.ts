import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { users } from "../login/route";

export async function GET(req: NextRequest) {
  try {
    const userEmail = req.nextUrl.searchParams.get("email");
    const token = req.nextUrl.searchParams.get("token");
    const user = users.find((user) => user.email === userEmail);
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
