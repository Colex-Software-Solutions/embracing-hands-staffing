import { invoiceProvider } from "@/app/providers/invoiceProvider";
import { Invoice } from "../jobs/[jobId]/invoices/page";
import InvoicesManager from "./components/InvoicesManager";

export interface AdminTableInvoice extends Invoice {
  paidStr: string;
}

const mapInvoicesToAdminTableInvoices = (
  invoices: Invoice[]
): AdminTableInvoice[] =>
  invoices.map((invoice) => {
    return {
      ...invoice,
      paidStr: invoice.paid ? "yes" : "no",
    };
  });

const AdminInvoicesPage = async () => {
  const invoices =
    (await invoiceProvider.getAllInvoices()) as unknown as Invoice[];
  const adminTableInvoices = mapInvoicesToAdminTableInvoices(invoices);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">Manage invoices here.</p>
        </div>
      </div>

      <InvoicesManager initialInvoices={adminTableInvoices} />
    </div>
  );
};

export default AdminInvoicesPage;
