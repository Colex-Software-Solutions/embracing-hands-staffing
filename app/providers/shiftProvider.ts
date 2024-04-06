// utils/jobPostProvider.ts
import { PrismaClient, Shift } from "@prisma/client";
const prisma = new PrismaClient();

class ShiftProvider {
  async createShift(
    shiftData: Omit<Shift, "id" | "createdAt" | "updatedAt" | "clockInTime" | "clockOutTime" | "status">
  ) {
    return await prisma.shift.create({
      data: shiftData,
    });
  }

  async getAllShifts(jobPostId: string) {
    return await prisma.shift.findMany({
      select: {
        id: true,
        jobPostId: true,
        staffProfileId: true,
        start: true,
        end: true,
        status: true,
        clockInTime: true,
        clockOutTime: true,
        createdAt: true,
        updatedAt: true,
        staffProfile: {
          select: {
            firstname: true,
            lastname: true,
          }
        }
      },
      where: {
        jobPostId,
      },
    });
  }
}

export const shiftProvider = new ShiftProvider();
