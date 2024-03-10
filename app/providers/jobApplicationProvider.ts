import prisma from "@/db/prisma";
import { JobApplication } from "@prisma/client";

class JobApplicationProvider {
  async getApplicationsByJobId(jobId: string) {
    return await prisma.jobApplication.findMany({
      where: {
        jobId,
      },
      select: {
        id: true,
        jobId: true,
        staffId: true,
        status: true,
        createdAt: true,
        jobPost: {
          select: {
            title: true,
            status: true,
            facilityProfile: {
              select: {
                name: true,
              },
            },
          },
        },
        staffProfile: {
          select: {
            firstname: true,
            lastname: true,
            id: true,
            user: {
              select: {
                email: true,
              },
            },
            userId: true,
          },
        },
      },
    });
  }

  async updateApplication(
    id: string,
    applicationData: Partial<JobApplication>
  ) {
    return await prisma.jobApplication.update({
      where: { id },
      data: applicationData,
    });
  }
}

export const jobApplicationProvider = new JobApplicationProvider();
