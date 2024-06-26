import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class InvoiceProvider {
  async getInvoiceById(id: string) {
    return await prisma.invoice.findFirst({
      where: {
        id,
      },
    });
  }

  async getAllInvoices() {
    return await prisma.invoice.findMany({
      include: {
        jobPost: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  async getInvoiceByJobPostId(jobPostId: string) {
    return await prisma.invoice.findMany({
      where: {
        jobPostId,
      },
    });
  }

  async getNewInvoiceNumberByJobPostId(jobPostId: string) {
    const jobPost = await prisma.jobPost.findUnique({
      where: { id: jobPostId },
      select: { facilityId: true }
    });
  
    if (!jobPost) {
      throw new Error("Job post not found");
    }
  
    const latestInvoice = await prisma.invoice.findMany({
      where: {
        jobPost: {
          facilityId: jobPost.facilityId,
        },
      },
      orderBy: {
        invoiceNumber: "desc",
      },
      take: 1
    });
  
    if (latestInvoice.length === 0) {
      return 0; // Return 0 if no invoices are found
    }
  
    return latestInvoice[0].invoiceNumber + 1;
  }

  async deleteInvoiceById(invoiceId: string) {
    // Delete the invoice with the given invoiceId
    const deletedInvoice = await prisma.invoice.delete({
      where: {
        id: invoiceId,
      },
    });

    return deletedInvoice;
  }
}

export const revalidate = "no-store";

export const invoiceProvider = new InvoiceProvider();
