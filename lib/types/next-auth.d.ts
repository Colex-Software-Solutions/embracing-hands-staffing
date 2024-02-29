import { Role, UserStatus } from "@prisma/client";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      role: Role;
      status: UserStatus;
      accessToken: string;
      staffProfile: { profileImage: string; id: string }?;
      facilityProfile: { profileImage: string; id: string }?;
    };
  }
}
