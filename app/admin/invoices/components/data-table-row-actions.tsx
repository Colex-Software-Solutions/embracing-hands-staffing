import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ViewInvoiceModal } from "../../components/modals/view-invoice-modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Invoice } from "../../jobs/[jobId]/invoices/page";
import { AdminTableInvoice } from "../page";
import { useToast } from "@/app/components/ui/use-toast";
import { DeleteInvoiceModal } from "../../components/modals/delete-invoice-modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  handleInvoiceUpdate: (newInvoice: AdminTableInvoice) => void;
  handleDeleteInvoice: (invoiceId: string) => void;
}

export function DataTableRowActions<TData>({
  row,
  handleInvoiceUpdate,
  handleDeleteInvoice,
}: DataTableRowActionsProps<TData>) {
  const { toast } = useToast();
  const [invoice, setInvoice] = useState<AdminTableInvoice | null>(null);
  const id = row.getValue("id") as string;

  const updatePaymentStatus = async (paid: boolean) => {
    const newInvoiceResponse = await axios.put("/api/invoices/", {
      invoiceId: id,
      paid,
    });

    if (newInvoiceResponse.data.success && newInvoiceResponse.data.invoice) {
      handleInvoiceUpdate(newInvoiceResponse.data.invoice);
    }
  };

  const fetchInvoice = async (invoiceId: string) => {
    const response = (await axios.get(
      `/api/invoices/invoice/${invoiceId}`
    )) as Invoice;
    if (response.data.success && response.data.invoice) {
      setInvoice(response.data.invoice);
    }
  };

  const deleteInvoice = async (invoiceId: string) => {
    try {
      const response = await axios.delete(`/api/invoices/invoice/${invoiceId}`);

      if (response.data.success) {
        handleDeleteInvoice(invoiceId);

        toast({
          variant: "default",
          title: "Invoice deleted!",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to delete invoice",
      });
    }
  };

  useEffect(() => {
    if (!invoice) {
      fetchInvoice(id);
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px]">
        {invoice && (
          <ViewInvoiceModal invoice={invoice}>
            <Button
              className="w-full border-0 justify-start flex pl-2 font-normal"
              variant="outline"
            >
              View Invoice
            </Button>
          </ViewInvoiceModal>
        )}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            Update Payment Status
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <Button
              onClick={() => updatePaymentStatus(true)}
              className="w-full border-0 justify-start flex pl-2 font-normal hover:bg-green-600 hover:text-white"
              variant="outline"
            >
              Paid
            </Button>
            <Button
              onClick={() => updatePaymentStatus(false)}
              className="w-full border-0 justify-start flex pl-2 font-normal hover:bg-red-600 hover:text-white"
              variant="outline"
            >
              Unpaid
            </Button>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DeleteInvoiceModal
          deleteInvoice={deleteInvoice}
          invoice={invoice as Invoice}
        >
          <Button
            className="w-full border-0 justify-start flex pl-2 font-normal hover:bg-red-600 hover:text-white"
            variant="outline"
          >
            Delete Invoice
          </Button>
        </DeleteInvoiceModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
