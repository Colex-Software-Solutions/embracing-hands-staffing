import "server-only";
import { User } from "@prisma/client";
import prisma from "@/db/prisma";

class UserProvider {
  async createUser(data: Omit<User, "createdAt" | "updatedAt" | "stripeId">) {
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
            profileImage: true,
          },
        },
        facilityProfile: {
          select: {
            profileImage: true,
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
        stripeId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getStaffUsers() {
    return await prisma.user.findMany({
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
      where: {
        role: "STAFF",
      },
    });
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
    return await prisma.user.update({
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
