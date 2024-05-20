import React from "react";
import InvoiceDateAndNumber from "./invoice-date-and-number";
import BillTable from "../../bill-table";
import InvoiceDetailsTable from "../../invoice-details-table";

const InvoicePreview = () => {
  return (
    <div className="flex-col bg-white shadow-lg m-5 p-3">
      <div className="flex justify-between">
        <div className="flex-col">
          <p className="text-xl text-primary">
            Embracing Hands Healthcare Staffing, LLC
          </p>
          <p className="text-lg text-primary mt-2">
            2557 Indian Hills Drive
            <br />
            Little Elm, TX 75068
          </p>
        </div>
        <div className="flex-col">
          <p className="text-3xl text-primary font-bold">Invoice</p>
          <InvoiceDateAndNumber />
        </div>
      </div>
      <div className="flex">
        <BillTable name="Test name Inc" address="Test address" />
      </div>
      <div className="mt-5">
        <InvoiceDetailsTable />
      </div>
      <div className="flex justify-end mt-3">
        <div className="border border-primary p-2">
          <p className="text-primary mr-5 text-3xl">Total: ${1000.0}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
