import React from "react";

export default function CommonTable({ columns = [], data = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-md bg-white">
      <table className="min-w-full text-sm text-left text-gray-700">
        {/* Table Header */}
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3 font-semibold">{col.label}</th>
            ))}
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {row[col.field]}
                  </td>
                ))}

                {/* Action Buttons */}
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-6 text-gray-400 italic"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}