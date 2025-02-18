import React from "react";
import InvoiceDateAndNumber from "./invoice-date-and-number";
import BillTable from "../../bill-table";
import InvoiceDetailsTable from "../../invoice-details-table";
import {
  calculateHoursBetweenTimes,
  formatDate,
  getDifferentialHoursFromHoursWorked,
} from "@/lib/utils";

const paymentPerShiftDifferentialHour = 5; // $5 per shift differential hour

const adminFeeValue = 0.03; // 3%
const cardPaymentFeeValue = 0.04; // 4%

interface InvoicePreviewProps {
  facilityName: string;
  facilityAddress: string;
  invoiceNumber: number;
  shifts: any[];
  isCardPayment: boolean;
  latePaymentMonths?: number;
}

interface GetCostResponse {
  adminFee: number;
  regularHours: HoursWorkedInfo;
  subtotal: number;
  totalCost: number;
  cardPaymentFee: number;
  shiftDifferential: ShiftDifferentialInfo;
}

interface HoursWorkedInfo {
  hours: number;
  amount: number;
}

interface ShiftDifferentialInfo extends HoursWorkedInfo {}

const getShiftDifferentialInfo = (shifts: any[]): ShiftDifferentialInfo => {
  const shiftDifferentHours = shifts.reduce(
    (total, shift) =>
      total +
      getDifferentialHoursFromHoursWorked({
        startDate: formatDate(new Date(shift.startDate)),
        endDate: formatDate(new Date(shift.endDate)),
        startTime: shift.in,
        endTime: shift.out,
      }),
    0
  );

  return {
    hours: shiftDifferentHours,
    amount: shiftDifferentHours * paymentPerShiftDifferentialHour,
  };
};

const getRegularHoursInfo = (shifts: any[]): HoursWorkedInfo => {
  const regularHours: HoursWorkedInfo = shifts.reduce(
    (total, shift) => {
      const hoursWorked = calculateHoursBetweenTimes({
        startDate: formatDate(new Date(shift.startDate)),
        endDate: formatDate(new Date(shift.endDate)),
        startTime: shift.in,
        endTime: shift.out,
      });

      const hourlyRate = shift.hourlyRate >= 0 ? shift.hourlyRate : 0;

      return {
        hours: total.hours + hoursWorked, // Accumulate total hours
        amount: total.amount + hourlyRate * hoursWorked, // Accumulate total amount
      };
    },
    { hours: 0, amount: 0 }
  );

  return regularHours;
};

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  facilityName,
  facilityAddress,
  shifts,
  invoiceNumber,
  isCardPayment,
  latePaymentMonths,
}) => {
  const getCost = (): GetCostResponse => {
    const regularHours = getRegularHoursInfo(shifts);
    const shiftDifferential = getShiftDifferentialInfo(shifts);
    const subtotal = regularHours.amount + shiftDifferential.amount;
    const adminFee = subtotal * adminFeeValue;
    const cardPaymentFee = isCardPayment ? subtotal * cardPaymentFeeValue : 0;

    const latePaymentFee =
      latePaymentMonths && latePaymentMonths > 0
        ? subtotal * 0.05 * latePaymentMonths
        : 0;

    return {
      adminFee,
      subtotal,
      regularHours,
      totalCost: subtotal + adminFee + cardPaymentFee + latePaymentFee,
      cardPaymentFee,
      shiftDifferential,
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
          <CostText
            title="Regular Hours"
            value={`${cost.regularHours.amount.toFixed(2)} (${
              cost.regularHours.hours
            } hrs)`}
          />

          {cost.shiftDifferential.amount > 0 && (
            <CostText
              title="Shift Differential"
              value={`${cost.shiftDifferential.amount} (${cost.shiftDifferential.hours} hrs)`}
            />
          )}
          <CostText title="Subtotal" value={cost.subtotal.toFixed(2)} />
          {isCardPayment && (
            <CostText
              title="Card Fee (4%):"
              value={cost.cardPaymentFee.toFixed(2)}
            />
          )}
          {latePaymentMonths && latePaymentMonths > 0 ? (
            <CostText
              title={`Late Payment Fee (5% x ${latePaymentMonths} ${
                latePaymentMonths === 1 ? "month" : "months"
              }):`}
              value={(cost.subtotal * 0.05 * latePaymentMonths).toFixed(2)}
            />
          ) : null}
          <CostText
            title={`Admin Fee (${adminFeeValue * 100}%):`}
            value={cost.adminFee.toFixed(2)}
          />
          <div className="border border-primary p-2">
            <p className="text-primary text-3xl">
              Total: ${cost.totalCost.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CostTextProps {
  title: string;
  value: number | string;
}

const CostText: React.FC<CostTextProps> = ({ title, value }) => {
  return (
    <div className="flex justify-between w-72">
      <div>{title}:</div>
      <div className="font-bold">${value}</div>
    </div>
  );
};

export default InvoicePreview;
