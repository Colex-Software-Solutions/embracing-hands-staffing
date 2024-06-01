// src/middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import accessRules from "./lib/accessControl";
import { verifyJwt } from "./lib/jwt";
import { Role } from "@prisma/client";

export default withAuth(
  async function middleware(req) {
    const signInUrl = new URL("/auth/login", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    const token = req.nextauth.token?.accessToken as string;
    const verifiedToken =
      token && (await verifyJwt(token).catch(console.error));

    // Check if user is logged in
    if (!verifiedToken) {
      return NextResponse.redirect(signInUrl);
    }

    // Dynamically check access permissions
    for (const path in accessRules) {
      if (req.nextUrl.pathname.startsWith(path)) {
        const rule = accessRules[path];
        const userRole = req.nextauth.token?.role;
        const methodAllowed = rule.methods.includes(req.method);
        const roleAllowed = rule.roles.includes(userRole as Role);

        if (!methodAllowed || !roleAllowed) {
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
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/facility/:path*",
    "/profile/:path*",
    "/api/staff/:path*",
    "/api/facility/:path*",
    "/api/document/:path*",
    "/api/invoices/:path*",
    "/api/job-application/:path*",
    "/api/job-post/:path*",
    "/api/shift/:path*",
    "/find-jobs/:path*",
    "/job-posts/:path*",
    "/shifts/:path*",
  ],
};
