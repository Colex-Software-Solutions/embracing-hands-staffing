import React from "react";

interface BillTableProps {
  name: string;
  address: string;
}

const BillTable: React.FC<BillTableProps> = ({ name, address }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
            >
              Bill To
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-t border-gray-200">
              <p>{name}</p>
              <p>{address}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BillTable;
