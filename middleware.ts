// src/middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import accessRules from "./lib/accessControl";
import { verifyJwt } from "./lib/jwt";
import { Role } from "@prisma/client";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token?.accessToken as string;
    const verifiedToken =
      token && (await verifyJwt(token).catch(console.error));

    // Check if user is logged in
    if (!verifiedToken) {
      return new Response(null, { status: 401, statusText: "Unauthorized" });
    }

    // Dynamically check access permissions
    for (const path in accessRules) {
      if (req.nextUrl.pathname.startsWith(path)) {
        console.log(path, req.nextUrl.pathname);
        const rule = accessRules[path];
        const userRole = req.nextauth.token?.role;
        const methodAllowed = rule.methods.includes(req.method);
        const roleAllowed = rule.roles.includes(userRole as Role);

        if (!methodAllowed || !roleAllowed) {
          const signInUrl = new URL("/auth/login", req.url);
          signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);

          return NextResponse.redirect(signInUrl);
        }

        break;
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*", "/facility/:path*"],
};
