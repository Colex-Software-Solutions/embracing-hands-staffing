"use client";
import React from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog";
import InvoicePreview from "../../jobs/[jobId]/invoices/components/create-invoice/invoice-preview";
import { Invoice } from "../../jobs/[jobId]/invoices/page";
import { Trash2, XIcon } from "lucide-react";
import axios from "axios";

interface DeleteInvoiceModalProps {
  isLoading: boolean;
  deleteInvoice: (invoiceId: string) => Promise<void>;
  invoice: Invoice;
}

export function DeleteInvoiceModal({
  deleteInvoice,
  invoice,
  isLoading,
}: DeleteInvoiceModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" text-red-600" disabled={isLoading}>
          <Trash2 width={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="">
        Permanently delete invoice?
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => deleteInvoice(invoice.id)}
          >
            Delete
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
