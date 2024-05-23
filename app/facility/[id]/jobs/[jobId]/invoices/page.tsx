import InvoiceTable from "@/app/admin/components/invoices/invoice-table";
import { Button } from "@/app/components/ui/button";
import { invoiceProvider } from "@/app/providers/invoiceProvider";
import Link from "next/link";

interface FacilityInvoicesPageProps {
  params: {
    jobId: string;
  };
}

export interface Invoice {
  id: string;
  facillityName: string;
  facilityAddress: string;
  invoiceNumber: number;
  paid: boolean;
  createdAt: string;
}

const FacilityInvoicesPage = async ({ params }: FacilityInvoicesPageProps) => {
  const { jobId } = params;
  const invoices = (await invoiceProvider.getInvoiceByJobPostId(
    jobId
  )) as unknown as Invoice[];

  return (
    <div>
      <h1 className="font-bold text-2xl">Invoices</h1>
      <InvoiceTable initialInvoices={invoices} />
    </div>
  );
};

export default FacilityInvoicesPage;
