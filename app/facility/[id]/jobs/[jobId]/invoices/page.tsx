import InvoiceTable from "@/app/admin/components/invoices/invoice-table";
import { invoiceProvider } from "@/app/providers/invoiceProvider";

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
  items: any;
  jobPost: any;
  data: any;
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
