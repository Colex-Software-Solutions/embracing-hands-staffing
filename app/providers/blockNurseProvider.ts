import prisma from "@/db/prisma";

class BlockNurseProvider {
  async blockNurse(facilityId: string, staffId: string) {
    const blockedNurse = await prisma.blockedNurse.create({
      data: {
        facilityId,
        staffId,
      },
    });
    return blockedNurse;
  }

  async unblockNurse(facilityId: string, staffId: string) {
    await prisma.blockedNurse.delete({
      where: {
        facilityId_staffId: {
          facilityId,
          staffId,
        },
      },
    });
  }

  async getBlockedNurses(facilityId: string) {
    return prisma.blockedNurse.findMany({
      where: { facilityId },
      include: {
        staff: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });
  }
  async getBlockedFacilitiesForNurse(staffId: string) {
    return await prisma.blockedNurse.findMany({
      where: { staffId },
    });
  }
  async getAll() {
    return await prisma.blockedNurse.findMany({});
  }
}

export const blockNurseProvider = new BlockNurseProvider();
