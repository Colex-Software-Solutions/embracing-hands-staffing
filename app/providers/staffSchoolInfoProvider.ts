import { prisma } from "@/db/prisma";
import { StaffSchoolInfo } from "@prisma/client";

export const staffSchoolInfoProvider = {
  async getStaffSchoolInfoByUserId(userId: string): Promise<StaffSchoolInfo[]> {
    return prisma.staffSchoolInfo.findMany({
      where: { staffProfileId: userId },
    });
  },

  async createStaffSchoolInfo(
    data: Omit<StaffSchoolInfo, "id">
  ): Promise<StaffSchoolInfo> {
    return prisma.staffSchoolInfo.create({ data });
  },

  async deleteEducation(id: string): Promise<void> {
    await prisma.staffSchoolInfo.delete({
      where: { id },
    });
  },
};
