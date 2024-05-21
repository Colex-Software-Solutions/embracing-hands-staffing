import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class InvoiceProvider {
  async getInvoiceByJobPostId(jobPostId: string) {
    return await prisma.invoice.findMany({
      where: {
        jobPostId,
      },
    });
  }

  async getNewInvoiceNumberByJobPostId(jobPostId: string) {
    const latestInvoice = await prisma.invoice.findMany({
      where: {
        jobPostId,
      },
      orderBy: {
        invoiceNumber: "desc",
      },
      take: 1,
    });

    if (latestInvoice.length === 0) {
      return 0; // Return 0 if no invoices are found
    }

    return latestInvoice[0].invoiceNumber + 1;
  }
}

export const invoiceProvider = new InvoiceProvider();
