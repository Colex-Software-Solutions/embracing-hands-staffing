// pages/api/invoices/[jobId].ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
import { invoiceProvider } from "@/app/providers/invoiceProvider";

export async function POST(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const data = await req.json();
    const newInvoiceNumber = await invoiceProvider.getNewInvoiceNumberByJobPostId(params.jobId)
    
    const newInvoice = await prisma.invoice.create({
      data: {
        jobPostId: params.jobId,
        facilityName: data.facilityName,
        facilityAddress: data.facilityAddress,
        paid: false,
        invoiceNumber: newInvoiceNumber,
        items: data.shifts,
        cardPayment: data.cardPayment
      },
    });

    return NextResponse.json({ success: true, invoice: newInvoice });
  } catch (error: any) {
    console.error("Failed to create invoice:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
