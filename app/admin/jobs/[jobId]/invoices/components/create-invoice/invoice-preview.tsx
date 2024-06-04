import React from "react";
import InvoiceDateAndNumber from "./invoice-date-and-number";
import BillTable from "../../bill-table";
import InvoiceDetailsTable from "../../invoice-details-table";

const adminFeeValue = 0.03; // 3%

interface InvoicePreviewProps {
  facilityName: string;
  facilityAddress: string;
  invoiceNumber: number;
  shifts: any[];
}

interface GetCostResponse {
  adminFee: number;
  subtotal: number;
  totalCost: number;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  facilityName,
  facilityAddress,
  shifts,
  invoiceNumber,
}) => {
  const getCost = (): GetCostResponse => {
    const subtotal: number = shifts.reduce((total, shift) => {
      const hourlyRate = shift.hourlyRate >= 0 ? shift.hourlyRate : 0;
      const hoursWorked = shift.hoursWorked >= 0 ? shift.hoursWorked : 0;

      return total + hourlyRate * hoursWorked;
    }, 0);

    const adminFee = subtotal * adminFeeValue;

    return {
      adminFee,
      subtotal,
      totalCost: subtotal + adminFee,
    };
  };

  const cost = getCost();

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
        <div className="flex flex-col gap-1">
          <CostText title="Subtotal" value={cost.subtotal} />
          <CostText title="Admin Fee (3%):" value={cost.adminFee} />
          <div className="border border-primary p-2">
            <p className="text-primary mr-5 text-3xl">
              Total: ${cost.totalCost}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CostTextProps {
  title: string;
  value: number;
}

const CostText: React.FC<CostTextProps> = ({ title, value }) => {
  return (
    <div className="flex justify-between w-60">
      <div>{title}:</div>
      <div className="font-bold">${value.toFixed(2)}</div>
    </div>
  );
};

export default InvoicePreview;
