import prisma from "@/db/prisma";
import { StaffProfile } from "@prisma/client";

export interface UpdateStaffProfile {
  userId: string;
  data: Omit<StaffProfile, "id">;
}

class StaffProvider {
  async getStaffProfile(userId: string) {
    return await prisma.staffProfile.findUnique({
      where: { userId },
    });
  }

  async createStaffProfile(data: Omit<StaffProfile, "id">) {
    return await prisma.staffProfile.create({
      data,
    });
  }

  async updateStaffProfile(input: UpdateStaffProfile) {
    const { userId, data } = input;
    return await prisma.staffProfile.update({
      where: { userId },
      data,
    });
  }
}

export const staffProvider = new StaffProvider();
