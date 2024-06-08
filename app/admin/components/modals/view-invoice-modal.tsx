import React from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import InvoicePreview from "../../jobs/[jobId]/invoices/components/create-invoice/invoice-preview";
import { Invoice } from "../../jobs/[jobId]/invoices/page";

interface ViewInvoiceModalProps {
  children: React.ReactNode;
  invoice: Invoice;
}

export function ViewInvoiceModal({ children, invoice }: ViewInvoiceModalProps) {
  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-auto max-w-none shadow-none">
        <div>
          <InvoicePreview
            isCardPayment={invoice.cardPayment ?? false}
            facilityName={invoice.facillityName}
            facilityAddress={invoice.facilityAddress}
            shifts={invoice.items}
            invoiceNumber={invoice.invoiceNumber}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
