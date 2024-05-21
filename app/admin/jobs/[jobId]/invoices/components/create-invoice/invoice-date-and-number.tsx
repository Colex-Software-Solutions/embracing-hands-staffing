import React from "react";
import { formatDate, formatInvoiceNumber } from "@/lib/utils";

interface InvoiceDateAndNumberProps {
  invoiceNumber: number;
}

const InvoiceDateAndNumber: React.FC<InvoiceDateAndNumberProps> = ({
  invoiceNumber,
}) => {
  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Invoice #
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
              {formatDate(new Date())}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              #{formatInvoiceNumber(invoiceNumber)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDateAndNumber;
