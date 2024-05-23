"use client";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Invoice } from "../../jobs/[jobId]/invoices/page";
import { AdminTableInvoice } from "../page";

interface IInvoicessManager {
  initialInvoices: AdminTableInvoice[];
}
const InvoicesManager = ({ initialInvoices }: IInvoicessManager) => {
  const [invoices, setInvoices] =
    useState<AdminTableInvoice[]>(initialInvoices);

  const handleInvoiceUpdate = (updatedInvoice: Invoice) => {
    const newInvoices = invoices.map((invoice) =>
      invoice.id === updatedInvoice.id
        ? {
            ...updatedInvoice,
            jobPost: invoice.jobPost,
            paidStr: updatedInvoice.paid ? "yes" : "no",
          }
        : invoice
    ) as AdminTableInvoice[];

    setInvoices(newInvoices);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    const filteredInvoices = invoices.filter(
      (invoice) => invoice.id !== invoiceId
    );

    setInvoices(filteredInvoices);
  };

  return (
    <>
      <DataTable
        data={invoices as any[]}
        columns={columns({ handleInvoiceUpdate, handleDeleteInvoice })}
      />
    </>
  );
};

export default InvoicesManager;
