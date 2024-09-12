import { documentProvider } from "@/app/providers/documentProvider";
import { getServerSession } from "@/lib/getServerSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  let userId = formData.get("userId") as string;
  let isAdminUploaded = false;
  const name = formData.get("name") as string;
  const expiryDateString = formData.get("expiryDate") as string | undefined;
  const expiryDate = expiryDateString ? new Date(expiryDateString) : undefined;
  const documentFile = formData.get("documentFile") as File;
  const session = await getServerSession();

  if (!userId || !documentFile || !name) {
    return NextResponse.json(
      { message: "Required fields are missing." },
      { status: 400, statusText: "Bad Request" }
    );
  }
  if (session.user.role === "ADMIN") {
    isAdminUploaded = true;
  }

  try {
    const newDocument = await documentProvider.createDocument(
      userId,
      documentFile,
      name,
      isAdminUploaded,
      expiryDate
    );

    return NextResponse.json({ success: true, document: newDocument });
  } catch (error: any) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
