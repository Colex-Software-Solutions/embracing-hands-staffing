import { prisma } from "@/db/prisma";
import { EmploymentHistory } from "@prisma/client";

export const employmentProvider = {
  async getEmploymentHistory(staffId: string): Promise<EmploymentHistory[]> {
    return prisma.employmentHistory.findMany({
      where: { staffProfileId: staffId },
    });
  },

  async addEmploymentHistory(
    staffId: string,
    data: Omit<EmploymentHistory, "id" | "staffProfileId">
  ): Promise<EmploymentHistory> {
    return prisma.employmentHistory.create({
      data: {
        ...data,
        staffProfileId: staffId,
      },
    });
  },

  async deleteEmploymentHistory(id: string): Promise<void> {
    await prisma.employmentHistory.delete({
      where: { id },
    });
  },
};
