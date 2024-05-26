import { NextRequest, NextResponse } from "next/server";
import { invoiceProvider } from "@/app/providers/invoiceProvider";

export async function GET(
  req: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  try {
    const invoiceId = params.invoiceId as string;

    if (!invoiceId) {
      return NextResponse.json(
        { error: "Invoice ID is required" },
        { status: 400 }
      );
    }

    const invoice = await invoiceProvider.getInvoiceById(invoiceId);

    return NextResponse.json({ success: true, invoice });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  try {
    const invoiceId = params.invoiceId as string;

    if (!invoiceId) {
      return NextResponse.json(
        { error: "Invoice ID is required" },
        { status: 400 }
      );
    }

    await invoiceProvider.deleteInvoiceById(invoiceId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
