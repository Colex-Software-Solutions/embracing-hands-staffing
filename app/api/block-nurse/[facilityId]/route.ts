import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { blockNurseProvider } from "@/app/providers/blockNurseProvider";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { facilityId: string } }
) {
  try {
    const { staffId } = await request.json();
    const { facilityId } = params;

    const blockedNurse = await blockNurseProvider.blockNurse(
      facilityId,
      staffId
    );

    return NextResponse.json(blockedNurse, { status: 201 });
  } catch (error) {
    console.error("Error blocking nurse:", error);
    return NextResponse.json(
      { error: "Failed to block nurse" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { facilityId: string } }
) {
  try {
    const { staffId } = await request.json();
    const { facilityId } = params;

    await blockNurseProvider.unblockNurse(facilityId, staffId);

    return NextResponse.json(
      { message: "Nurse unblocked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unblocking nurse:", error);
    return NextResponse.json(
      { error: "Failed to unblock nurse" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { facilityId: string } }
) {
  try {
    const { facilityId } = params;

    const blockedNurses = await blockNurseProvider.getBlockedNurses(facilityId);

    return NextResponse.json(blockedNurses, { status: 200 });
  } catch (error) {
    console.error("Error fetching blocked nurses:", error);
    return NextResponse.json(
      { error: "Failed to fetch blocked nurses" },
      { status: 500 }
    );
  }
}
