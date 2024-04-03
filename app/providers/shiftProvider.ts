// utils/jobPostProvider.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ShiftProvider {
  // async createJobPost(
  //   jobPostData: Omit<JobPost, "id" | "createdAt" | "updatedAt">
  // ) {
  //   return await prisma.jobPost.create({
  //     data: jobPostData,
  //   });
  // }

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
