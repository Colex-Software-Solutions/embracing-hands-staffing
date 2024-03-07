import prisma from "@/db/prisma";

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
          },
        },
        staffProfile: {
          select: {
            firstname: true,
            lastname: true,
            id: true,
            userId: true,
          },
        },
      },
    });
  }
}

export const jobApplicationProvider = new JobApplicationProvider();
