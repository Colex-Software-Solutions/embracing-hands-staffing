import prisma from "@/db/prisma";
import { ApplicationStatus, JobApplication, JobStatus } from "@prisma/client";

class JobApplicationProvider {
  async createJobApplication(
    data: Omit<JobApplication, "id" | "createdAt" | "updatedAt" | "status">
  ) {
    return await prisma.$transaction(async (prisma) => {
      // Create job application
      const jobApplication = await prisma.jobApplication.create({
        data: {
          ...data,
          status: ApplicationStatus.ACCEPTED,
        },
      });

      // Update job status to COMPLETED
      await prisma.jobPost.update({
        where: { id: data.jobId },
        data: { status: JobStatus.COMPLETED },
      });

      // Assign staff to the shift
      await prisma.shift.updateMany({
        where: { jobPostId: data.jobId },
        data: { staffProfileId: data.staffId },
      });

      return jobApplication;
    });
  }

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

  async getJobApplicationStaffProfiles(jobId: string) {
    return await prisma.jobApplication.findMany({
      where: {
        jobId,
      },
      select: {
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
