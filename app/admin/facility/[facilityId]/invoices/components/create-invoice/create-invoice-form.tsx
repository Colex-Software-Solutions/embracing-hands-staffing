"use client";
import InvoicePreview from "./invoice-preview";

const CreateInvoiceForm = () => {
  return (
    <div className="flex bg-gray-100">
      <div className="w-1/3">Window1</div>
      <div className="w-2/3">
        <InvoicePreview />
      </div>
    </div>
  );
};

export default CreateInvoiceForm;
