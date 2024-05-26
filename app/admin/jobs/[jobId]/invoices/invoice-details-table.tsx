import React from "react";
import { differenceInMilliseconds, format } from "date-fns";
import { formatDate } from "@/lib/utils";

interface InvoiceDetailsTableProps {
  shifts: any[];
}

const InvoiceDetailsTable: React.FC<InvoiceDetailsTableProps> = ({
  shifts,
}) => {
  const columns = [
    "Shift",
    "Date of Service",
    "Service Details",
    "Employee",
    "In",
    "Out",
    "Hours Worked",
    "Hourly Rate",
  ];

  const rows = shifts.map((shift, index) => ({
    index: index + 1,
    date: formatDate(new Date(shift.dateOfService)),
    details: shift.serviceDetails,
    employee: shift.employee,
    in: shift.in,
    out: shift.out,
    hoursWorked: shift.hoursWorked.toFixed(2),
    hourlyRate: shift.hourlyRate >= 0 ? shift.hourlyRate : 0,
  }));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                {row.index}
              </td>
              {Object.values(row)
                .slice(1)
                .map((value, idx) => (
                  <td
                    key={idx}
                    className={`px-6 py-2 whitespace-nowrap text-sm text-gray-900 ${
                      idx < columns.length - 2 ? "border-r border-gray-200" : ""
                    }`}
                  >
                    {value}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className="flex justify-center items-center p-5 border-l border-r border-b text-primary font-bold">
          There is currently no shift to display
        </div>
      )}
    </div>
  );
};

export default InvoiceDetailsTable;
