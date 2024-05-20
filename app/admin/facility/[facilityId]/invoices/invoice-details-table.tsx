import React from "react";

const InvoiceDetailsTable: React.FC = () => {
  const columns = [
    "Date of Service",
    "Service Details",
    "Employee",
    "In",
    "Out",
    "Hours Worked",
    "Hourly Rate",
    "Total",
  ];

  const rows = [
    {
      date: "2024-05-16",
      details: "Consultation",
      employee: "John Doe",
      in: "09:00 AM",
      out: "05:00 PM",
      hoursWorked: 8,
      hourlyRate: "$50",
      total: "$400",
    },
    {
      date: "2024-05-17",
      details: "Follow-up",
      employee: "Jane Smith",
      in: "10:00 AM",
      out: "04:00 PM",
      hoursWorked: 6,
      hourlyRate: "$50",
      total: "$300",
    },
    {
      date: "2024-05-18",
      details: "Therapy Session",
      employee: "Mark Johnson",
      in: "08:00 AM",
      out: "02:00 PM",
      hoursWorked: 6,
      hourlyRate: "$60",
      total: "$360",
    },
  ];

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
              {Object.values(row).map((value, idx) => (
                <td
                  key={idx}
                  className={`px-6 py-2 whitespace-nowrap text-sm text-gray-900 ${
                    idx < columns.length - 1 ? "border-r border-gray-200" : ""
                  }`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDetailsTable;
