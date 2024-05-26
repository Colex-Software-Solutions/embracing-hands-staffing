import React from "react";
import InvoiceDateAndNumber from "./invoice-date-and-number";
import BillTable from "../../bill-table";
import InvoiceDetailsTable from "../../invoice-details-table";

interface InvoicePreviewProps {
  facilityName: string;
  facilityAddress: string;
  invoiceNumber: number;
  shifts: any[];
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  facilityName,
  facilityAddress,
  shifts,
  invoiceNumber,
}) => {
  const getTotalCost = () => {
    const totalCost: number = shifts.reduce((total, shift) => {
      const hourlyRate = shift.hourlyRate >= 0 ? shift.hourlyRate : 0;
      const hoursWorked = shift.hoursWorked >= 0 ? shift.hoursWorked : 0;

      return total + hourlyRate * hoursWorked;
    }, 0);

    return totalCost.toFixed(2);
  };

  return (
    <div className="flex-col bg-white m-5 p-3">
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
          <InvoiceDateAndNumber invoiceNumber={invoiceNumber} />
        </div>
      </div>
      <div className="flex">
        <BillTable name={facilityName} address={facilityAddress} />
      </div>
      <div className="mt-5">
        <InvoiceDetailsTable shifts={shifts} />
      </div>
      <div className="flex justify-end mt-3">
        <div className="border border-primary p-2">
          <p className="text-primary mr-5 text-3xl">Total: ${getTotalCost()}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
