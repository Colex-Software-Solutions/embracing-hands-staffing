// utils/jobPostProvider.ts
import { JobPost, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class JobPostProvider {
  async createJobPost(
    jobPostData: Omit<JobPost, "id" | "createdAt" | "updatedAt">
  ) {
    // Validation or transformation logic can be added here
    return await prisma.jobPost.create({
      data: jobPostData,
    });
  }
}

export const jobPostProvider = new JobPostProvider();
