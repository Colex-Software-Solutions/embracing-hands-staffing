import prisma from "@/db/prisma";
import { FacilityProfile } from "@prisma/client";

class FacilityProvider {
  async getFacilityProfile(userId: string) {
    return await prisma.facilityProfile.findUnique({
      where: { userId },
    });
  }

  async getFacilityProfileById(facilityId: string) {
    return await prisma.facilityProfile.findUnique({
      where: { id: facilityId },
    });
  }

  async createfacilityProfile(data: Omit<FacilityProfile, "id" | "createdAt">) {
    return await prisma.facilityProfile.create({
      data,
    });
  }

  async updatefacilityProfile(
    userId: string,
    data: Omit<FacilityProfile, "id" | "createdAt">
  ) {
    return await prisma.facilityProfile.update({
      where: { userId },
      data,
    });
  }
}

export const facilityProvider = new FacilityProvider();
