import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { verifyJwt } from "./lib/jwt";
import { Role } from "@prisma/client";
import accessRules from "./lib/accessControl";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token?.accessToken as string;
    const verifiedToken =
      token && (await verifyJwt(token).catch((err) => console.log(err)));
    if (!verifiedToken) {
      return new Response(null, { status: 401, statusText: "Unauthorized" });
    }

    const rule = accessRules[req.nextUrl.pathname];

    if (rule) {
      const isAuthorized =
        rule.roles.includes(req.nextauth.token?.role as Role) &&
        rule.methods.includes(req.method);

      if (!isAuthorized) {
        return new Response(null, {
          status: 403,
          statusText: "Forbidden",
        });
      }
    }

    // Proceed if no specific rules or if authorized
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"],
  unstable_allowDynamic: ["/lib/jwt.ts", "/node_modules/lodash/lodash.js"],
};
