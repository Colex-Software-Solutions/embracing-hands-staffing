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

  async getJobPostById(id: string) {
    return await prisma.jobPost.findUnique({
      select: {
        id: true,
        facilityId: true,
        title: true,
        description: true,
        parkingPay: true,
        scrubsProvided: true,
        experience: true,
        location: true,
        shifts: true,
        startDate: true,
        endDate: true,
        housing: true,
        procedures: true,
        paymentPerDay: true,
        patientPopulation: true,
        mie: true,
        bonus: true,
        tags: true,
        createdAt: true,
      },
      where: {
        id,
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

  async getAllValidJobPosts() {
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
      where: {
        status: "OPEN",
      },
    });
  }
}

export const jobPostProvider = new JobPostProvider();
