import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
import { invoiceProvider } from "@/app/providers/invoiceProvider";

export async function PUT(
    req: NextRequest,
  ) {
    try {
      const { invoiceId, ...updateFields } = await req.json();
  
      if (!invoiceId) {
        return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
      }
  
      const updatedInvoice = await prisma.invoice.update({
        where: { id: invoiceId },
        data: updateFields,
      });
  
      return NextResponse.json({ success: true, invoice: updatedInvoice });
    } catch (error: any) {
      console.error("Failed to update invoice:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
