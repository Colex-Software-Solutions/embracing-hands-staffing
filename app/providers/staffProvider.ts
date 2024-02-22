import prisma from "@/db/prisma";
import { StaffProfile } from "@prisma/client";

export const staffProvider = {
  async getStaffProfile(userId: string) {
    return await prisma.staffProfile.findUnique({
      where: { userId },
    });
  },

  async createOrStaffProfile(userId: string, data: Omit<StaffProfile, "id">) {
    const staff = await this.getStaffProfile(userId);
    if (staff) {
      return await prisma.staffProfile.update({
        where: { userId },
        data,
      });
    } else {
      return await prisma.staffProfile.create({
        data,
      });
    }
  },
};
