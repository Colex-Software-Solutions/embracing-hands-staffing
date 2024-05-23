"use client";
import { formatInvoiceNumber } from "@/lib/utils";
import { ViewInvoiceModal } from "../modals/view-invoice-modal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";
import { DeleteInvoiceModal } from "../modals/delete-invoice-modal";
import { Invoice } from "../../jobs/[jobId]/invoices/page";

interface InvoiceTableProps {
  initialInvoices: Invoice[];
  adminMode?: boolean;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  initialInvoices,
  adminMode,
}) => {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateInvoicePaidStatus = async (invoiceId: string, paid: boolean) => {
    setIsLoading(true);

    try {
      await axios.put("/api/invoices/", {
        invoiceId,
        paid,
      });

      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === invoiceId ? { ...invoice, paid } : invoice
        )
      );

      setIsLoading(false);

      toast({
        variant: "default",
        title: "Payment status updated!",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to update payment status",
      });

      setIsLoading(false);
    }
  };

  const deleteInvoice = async (invoiceId: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/invoices/invoice/${invoiceId}`);

      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice.id !== invoiceId)
      );

      toast({
        variant: "default",
        title: "Invoice deleted!",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to delete invoice",
      });
    }
  };

  return (
    <div className="overflow-x-auto mt-4">
      {invoices.length === 0 ? (
        <p className="text-gray-500">No invoices found.</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                Invoice Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                Paid
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                Created On
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 border-r border-gray-200">
                  <ViewInvoiceModal invoice={invoice}>
                    <p className="cursor-pointer">
                      #{formatInvoiceNumber(invoice.invoiceNumber)}
                    </p>
                  </ViewInvoiceModal>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                  {adminMode ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="text-sm text-gray-900 flex items-center"
                          disabled={isLoading}
                        >
                          {invoice.paid ? "Yes" : "No"}
                          {!isLoading && (
                            <ChevronDown className="w-4 h-4 ml-1" />
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            updateInvoicePaidStatus(invoice.id, true)
                          }
                        >
                          Yes
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateInvoicePaidStatus(invoice.id, false)
                          }
                        >
                          No
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : invoice.paid ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                  {format(new Date(invoice.createdAt), "yyyy-MM-dd")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <DeleteInvoiceModal
                    deleteInvoice={deleteInvoice}
                    invoice={invoice}
                    isLoading={isLoading}
                  >
                    <button className=" text-red-600" disabled={isLoading}>
                      <Trash2 width={20} />
                    </button>
                  </DeleteInvoiceModal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceTable;
