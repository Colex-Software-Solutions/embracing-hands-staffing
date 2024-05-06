// pages/api/invoices/[jobId].ts

import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/app/providers/S3Provider";
import prisma from "@/db/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const formData = await req.formData();
    const invoiceFile = formData.get("invoice") as File;

    if (!invoiceFile) {
      return NextResponse.json(
        { message: "Invoice file is required." },
        { status: 400 }
      );
    }

    const fileName = `invoice-${params.jobId}-${Date.now()}`;
    const contentType = invoiceFile.type || "application/pdf";

    const invoiceUrl = await uploadFile(
      Buffer.from(await invoiceFile.arrayBuffer()),
      fileName,
      contentType
    );

    const newInvoice = await prisma.invoice.create({
      data: {
        jobPostId: params.jobId,
        url: invoiceUrl,
        paid: false,
      },
    });

    return NextResponse.json({ success: true, invoice: newInvoice });
  } catch (error: any) {
    console.error("Failed to upload invoice:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
