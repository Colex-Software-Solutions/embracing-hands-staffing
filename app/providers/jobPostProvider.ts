// utils/jobPostProvider.ts
import { JobPost, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class JobPostProvider {
  async createJobPost(
    jobPostData: Omit<JobPost, "id" | "createdAt" | "updatedAt">
  ) {
    return await prisma.jobPost.create({
      data: jobPostData,
    });
  }
  async updateJobPost(
    id: string,
    jobPostData: Omit<JobPost, "id" | "createdAt" | "updatedAt">
  ) {
    return await prisma.jobPost.update({
      where: { id },
      data: jobPostData,
    });
  }

  async updatePartialJobPost(id: string, jobPostData: Partial<JobPost>) {
    return await prisma.jobPost.update({
      where: { id },
      data: jobPostData,
    });
  }

  async getJobPostsPerFacility(id: string) {
    return await prisma.jobPost.findMany({
      where: {
        facilityId: id,
      },
    });
  }

  async getAllJobPosts() {
    return await prisma.jobPost.findMany({
      select: {
        id: true,
        title: true,
        location: true,
        paymentPerDay: true,
        shifts: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
    });
  }
}

export const jobPostProvider = new JobPostProvider();
