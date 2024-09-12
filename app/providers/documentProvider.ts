import prisma from "@/db/prisma";
import { uploadFile, deleteFile } from "@/app/providers/S3Provider";

class DocumentProvider {
  async getDocumentsPerUser(userId: string) {
    return await prisma.document.findMany({
      where: { userId: userId },
    });
  }
  async createDocument(
    userId: string,
    file: File,
    name: string,
    isAdminUploaded: boolean,
    expiryDate?: Date
  ) {
    const documentBuffer = Buffer.from(await file.arrayBuffer());
    const documentUrl = await uploadFile(documentBuffer, file.name, file.type);

    const newDocument = await prisma.document.create({
      data: {
        userId,
        name,
        documentUrl,
        expiryDate: expiryDate ?? null,
        isAdminUploaded,
      },
    });

    return newDocument;
  }

  async updateDocument(
    documentId: string,
    file: File | null,
    name: string,
    expiryDate?: Date
  ) {
    let documentUrl;
    if (file) {
      const existingDocument = await prisma.document.findUnique({
        where: { id: documentId },
      });
      if (existingDocument?.documentUrl) {
        await deleteFile(existingDocument.documentUrl);
      }

      const documentBuffer = Buffer.from(await file.arrayBuffer());
      documentUrl = await uploadFile(documentBuffer, file.name, file.type);
    }

    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: {
        name,
        documentUrl: documentUrl ?? undefined,
        expiryDate: expiryDate ?? undefined,
      },
    });

    return updatedDocument;
  }

  async deleteDocument(documentId: string) {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (document?.documentUrl) {
      await deleteFile(document.documentUrl);
    }

    await prisma.document.delete({ where: { id: documentId } });
  }
}

export const documentProvider = new DocumentProvider();
