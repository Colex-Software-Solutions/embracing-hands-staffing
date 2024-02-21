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

  async updateUser(id: string, data: User) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

export const userProvider = new UserProvider();
