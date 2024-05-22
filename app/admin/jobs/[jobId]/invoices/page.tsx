import InvoiceTable from "@/app/admin/components/invoices/invoice-table";
import { Button } from "@/app/components/ui/button";
import { invoiceProvider } from "@/app/providers/invoiceProvider";
import Link from "next/link";

interface FacilityInvoicesPageProps {
  params: {
    jobId: string;
  };
}

interface InvoiceJobPost {
  title: string;
}

export interface Invoice {
  id: string;
  facillityName: string;
  facilityAddress: string;
  invoiceNumber: number;
  paid: boolean;
  createdAt: string;
  items: any;
  jobPost: InvoiceJobPost;
}

// const handlePaymentStatusChange = async (invoiceId: string, paid: boolean) => {
//   const updatedInvoices = await invoiceProvider.updateInvoicePaymentStatus(invoiceId, paid)

//   return updatedInvoices;
// };

const FacilityInvoicesPage = async ({ params }: FacilityInvoicesPageProps) => {
  const { jobId } = params;
  const invoices = (await invoiceProvider.getInvoiceByJobPostId(
    jobId
  )) as Invoice[];

  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Invoices</h1>
        <Link href={`/admin/jobs/${jobId}/invoices/create`}>
          <Button variant="default" className="mt-3">
            New Invoice
          </Button>
        </Link>
      </div>

      <InvoiceTable initialInvoices={invoices} adminMode={true} />
    </div>
  );
};

export default FacilityInvoicesPage;
