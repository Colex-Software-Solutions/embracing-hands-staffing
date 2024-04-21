import { documentProvider } from "@/app/providers/documentProvider";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const documentId = params.id;
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const expiryDateString = formData.get("expiryDate") as string | undefined;
  const expiryDate = expiryDateString ? new Date(expiryDateString) : undefined;
  const documentFile = formData.get("documentFile") as File | null;

  if (!documentId || !name) {
    return NextResponse.json(
      { message: "Required fields are missing." },
      { status: 400, statusText: "Bad Request" }
    );
  }

  try {
    const updatedDocument = await documentProvider.updateDocument(
      documentId,
      documentFile,
      name,
      expiryDate
    );

    return NextResponse.json({ success: true, document: updatedDocument });
  } catch (error: any) {
    console.error("Error updating document:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const documentId = params.id;

  if (!documentId) {
    return NextResponse.json(
      { message: "Document ID is required." },
      { status: 400, statusText: "Bad Request" }
    );
  }

  try {
    await documentProvider.deleteDocument(documentId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
