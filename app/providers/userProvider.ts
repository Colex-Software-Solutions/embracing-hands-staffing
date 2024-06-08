import "server-only";
import { User } from "@prisma/client";
import prisma from "@/db/prisma";
import { StaffUserPaginationFilter } from "../api/admin/staff/route";

class UserProvider {
  async createUser(data: Omit<User, "createdAt" | "updatedAt">) {
    return await prisma.user.create({
      data,
    });
  }

  async getUser(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        phone: true,
        status: true,
        staffProfile: {
          select: {
            firstname: true,
            lastname: true,
            profileImage: true,
            id: true,
          },
        },
        facilityProfile: {
          select: {
            profileImage: true,
            id: true,
            signedContractUrl: true,
          },
        },
      },
    });
  }
  async getStaffUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id, role: "STAFF" },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        phone: true,
        status: true,
        staffProfile: {
          select: {
            firstname: true,
            lastname: true,
            profileImage: true,
            id: true,
          },
        },
      },
    });
  }

  async getUserByJobPostId(jobPostId: string) {
    return await prisma.jobPost.findUnique({
      where: {
        id: jobPostId,
      },
      select: {
        facilityProfile: {
          select: {
            user: true,
          },
        },
      },
    });
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getStaffProfileById(id: string) {
    return prisma.user.findUnique({
      select: {
        id: true,
        staffProfile: {
          select: {
            firstname: true,
            lastname: true,
            title: true,
          },
        },
      },
      where: {
        id,
        role: "STAFF",
      },
    });
  }

  async getFacilityProfileById(id: string) {
    return prisma.user.findUnique({
      select: {
        id: true,
        facilityProfile: {
          select: {
            id: true,
            name: true,
            facilityType: true,
            description: true,
            address: true,
          },
        },
      },
      where: {
        id,
        role: "FACILITY",
      },
    });
  }

  async getStaffUsersWithPagination(
    page: number,
    pageSize: number,
    filters: StaffUserPaginationFilter[] = []
  ) {
    const skip = (page - 1) * pageSize;

    const filterConditions = filters.reduce(
      (acc: any, filterObj: any) => {
        Object.keys(filterObj).forEach((key) => {
          // Use contains for partial matching of strings
          acc[key] = {
            contains: filterObj[key],
            mode: "insensitive", // optional, for case-insensitive matching
          };
        });
        return acc;
      },
      { role: "STAFF" }
    );

    const whereClause = {
      ...filterConditions, // Spread the dynamically constructed filter conditions
    };

    const [users, totalCount] = await prisma.$transaction([
      prisma.user.findMany({
        select: {
          id: true,
          staffProfile: {
            select: {
              firstname: true,
              lastname: true,
              title: true,
            },
          },
          email: true,
          phone: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        where: whereClause,
        skip: skip,
        take: pageSize,
      }),
      prisma.user.count({
        where: {
          role: "STAFF",
        },
      }),
    ]);

    return {
      users,
      totalCount,
    };
  }

  async getFacilityUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        facilityProfile: {
          select: {
            id: true,
            name: true,
            facilityType: true,
            description: true,
            address: true,
          },
        },
        email: true,
        phone: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        role: "FACILITY",
      },
    });
  }

  async updateUser(id: string, data: User) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateUserStatus(id: string, status: "APPROVED" | "REJECTED") {
    return prisma.user.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

export const userProvider = new UserProvider();
