// utils/jobPostProvider.ts
import { JobPost, JobStatus, PrismaClient } from "@prisma/client";
import { blockNurseProvider } from "./blockNurseProvider";
import { shiftProvider } from "./shiftProvider";
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
        scrubsProvided: true,
        location: true,
        shifts: true,
        startDate: true,
        endDate: true,
        housing: true,
        procedures: true,
        patientPopulation: true,
        tags: true,
        createdAt: true,
        facilityProfile: {
          select: {
            name: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        applications: {
          where: {
            status: "ACCEPTED",
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            staffProfile: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
          },
          take: 1,
        },
      },
      where: {
        id,
      },
    });
  }
  async createJobPostWithShift(
    jobPostData: Omit<JobPost, "id" | "createdAt" | "updatedAt"> & {
      startTime: string;
      endTime: string;
    }
  ) {
    const { startTime, endTime, ...jobData } = jobPostData;

    return await prisma.$transaction(async (prisma) => {
      const jobPost = await prisma.jobPost.create({
        data: jobData,
      });

      // staffProfileId will be null when the shift is first created
      const shift = await prisma.shift.create({
        data: {
          jobPostId: jobPost.id,
          start: new Date(startTime),
          end: new Date(endTime),
        },
      });

      return { ...jobPost, shift };
    });
  }

  async updateJobPostWithShift(
    id: string,
    jobPostData: Partial<JobPost> & {
      startTime: string;
      endTime: string;
    }
  ) {
    const { startTime, endTime, ...jobData } = jobPostData;

    return await prisma.$transaction(async (prisma) => {
      const jobPost = await prisma.jobPost.update({
        where: { id },
        data: jobData,
      });

      const shift = await prisma.shift.updateMany({
        where: { jobPostId: id },
        data: {
          start: new Date(startTime),
          end: new Date(endTime),
        },
      });

      return { ...jobPost, shift };
    });
  }

  async getJobPostInvoiceDataById(id: string) {
    return await prisma.jobPost.findUnique({
      select: {
        id: true,
        facilityId: true,
        title: true,
        location: true,
        createdAt: true,
        tags: true,
        shifts: {
          include: {
            staffProfile: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
          },
          where: {
            status: "Completed",
          },
        },
        facilityProfile: {
          select: {
            name: true,
            address: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
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
        facilityProfile: {
          select: {
            name: true,
          },
        },
        title: true,
        location: true,
        shifts: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
    });
  }

  async getAllValidJobPosts(staffId: string | undefined) {
    const blockedFacilities = staffId
      ? await blockNurseProvider.getBlockedFacilitiesForNurse(staffId)
      : [];

    const blockedFacilityIds = blockedFacilities.map(
      (facility) => facility.facilityId
    );
    const jobs = await prisma.jobPost.findMany({
      select: {
        id: true,
        title: true,
        location: true,
        shiftsTime: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        tags: true,
        facilityId: true,
      },
      where: {
        status: "OPEN",
        NOT: {
          facilityId: {
            in: blockedFacilityIds,
          },
        },
      },
    });
    return jobs;
  }

  async getJobSummaryByJobId(jobId: string) {
    return prisma.jobPost.findUnique({
      where: { id: jobId },
      include: {
        invoices: {},
        shifts: {
          include: {
            staffProfile: {
              select: {
                firstname: true,
                lastname: true,
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
            breaks: {
              select: {
                id: true,
                start: true,
                end: true,
                shiftId: true,
              },
            },
          },
        },
      },
    });
  }

  async assignStaffToJob(jobId: string, staffId: string) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        // Look for an existing job application
        const existingApplication = await tx.jobApplication.findFirst({
          where: { jobId, staffId },
        });

        // If an application exists, update its status
        let jobApplication;
        if (existingApplication) {
          jobApplication = await tx.jobApplication.update({
            where: { id: existingApplication.id },
            data: { status: "ACCEPTED" },
          });
        } else {
          // Otherwise, create a new job application
          jobApplication = await tx.jobApplication.create({
            data: { jobId, staffId, status: "ACCEPTED" },
          });
        }

        await tx.jobPost.update({
          where: { id: jobId },
          data: { status: JobStatus.COMPLETED },
        });

        // Also update the shift by assigning the staff member to it
        await tx.shift.updateMany({
          data: { staffProfileId: staffId },
          where: { jobPostId: jobId },
        });

        return jobApplication;
      });

      return result;
    } catch (error: any) {
      console.error(
        "Error creating or updating job application:",
        error.message
      );
      throw new Error(
        error.message || "Failed to assign staff to the job. Please try again."
      );
    }
  }
}

export const jobPostProvider = new JobPostProvider();
