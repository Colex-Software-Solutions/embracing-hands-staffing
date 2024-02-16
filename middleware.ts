import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { verifyJwt } from "./lib/jwt";
import { Role } from "@prisma/client";
export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token?.accessToken as string;
    const verifiedToken =
      token && (await verifyJwt(token).catch((err) => console.log(err)));
    // check if user is navigating to login while signed in already
    // check if there is a logged in user
    if (verifiedToken) {
      if (
        req.nextUrl.pathname.startsWith("/admin") &&
        req.nextauth.token?.role !== "admin"
      ) {
        return NextResponse.rewrite(
          new URL("/api/auth/signin?message=You Are Not Authorized!", req.url)
        );
      }
      if (
        req.nextUrl.pathname.startsWith("/user") &&
        req.nextauth.token?.role !== "user"
      ) {
        return NextResponse.rewrite(
          new URL("/api/auth/signin?message=You Are Not Authorized!", req.url)
        );
      }
    } else {
      return new Response(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
  unstable_allowDynamic: ["/lib/jwt.ts", "/node_modules/lodash/lodash.js"],
};
