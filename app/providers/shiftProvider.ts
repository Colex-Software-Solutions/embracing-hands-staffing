// utils/jobPostProvider.ts
import { PrismaClient, Shift } from "@prisma/client";
import prisma from "@/db/prisma";

class ShiftProvider {
  async createShift(
    shiftData: Omit<
      Shift,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "clockInTime"
      | "clockOutTime"
      | "status"
    >
  ) {
    return await prisma.shift.create({
      data: shiftData,
    });
  }

  async getShiftsByStaffId(staffId: string) {
    if (!staffId || staffId === "") {
      return [];
    }
    return await prisma.shift.findMany({
      select: {
        id: true,
        jobPostId: true,
        staffProfileId: true,
        start: true,
        end: true,
        status: true,
        clockInTime: true,
        clockOutTime: true,
        createdAt: true,
        updatedAt: true,
        breaks: true,
        staffProfile: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        jobPost: {
          select: {
            location: true,
            latitude: true,
            longitude: true,
            title: true,
            facilityProfile: {
              select: {
                name: true,
                address: true,
              },
            },
          },
        },
      },
      where: {
        staffProfileId: staffId,
      },
    });
  }

  async getAllShifts(jobPostId: string) {
    return await prisma.shift.findMany({
      select: {
        id: true,
        jobPostId: true,
        staffProfileId: true,
        start: true,
        end: true,
        status: true,
        clockInTime: true,
        clockOutTime: true,
        createdAt: true,
        updatedAt: true,
        staffProfile: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
      where: {
        jobPostId,
      },
    });
  }

  async confirmShift(shiftId: string) {
    return prisma.shift.update({
      where: { id: shiftId },
      data: { status: "Confirmed" },
    });
  }

  async startShift(shiftId: string) {
    return prisma.shift.update({
      where: { id: shiftId },
      data: { status: "InProgress", clockInTime: new Date() },
    });
  }

  async endShift(shiftId: string) {
    return prisma.shift.update({
      where: { id: shiftId },
      data: { status: "Completed", clockOutTime: new Date() },
    });
  }

  async startBreak(shiftId: string) {
    await prisma.shift.update({
      where: { id: shiftId },
      data: { status: "OnBreak" },
    });
    return prisma.break.create({
      data: { shiftId: shiftId, start: new Date() },
    });
  }

  async endBreak(shiftId: string) {
    const breaks = await prisma.break.findMany({
      where: { shiftId: shiftId },
      orderBy: { start: "desc" },
    });
    // filtering for null in prisma didn't work
    const ongoingBreak = breaks.find((b) => b.end === null);

    if (!ongoingBreak) throw new Error("No ongoing break found.");

    await prisma.shift.update({
      where: { id: shiftId },
      data: { status: "InProgress" },
    });

    return prisma.break.update({
      where: { id: ongoingBreak.id },
      data: { end: new Date() },
    });
  }

  async deleteShift(id: string) {
    try {
      return await prisma.shift.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting shift:", error);
      throw new Error("Unable to delete shift.");
    }
  }
}

export const shiftProvider = new ShiftProvider();
