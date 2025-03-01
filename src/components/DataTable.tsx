import React from "react";

interface DataTableProps {
  data: any[];
  columns: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto bg-grey p-4 rounded-md shadow-md">
      <table className="w-full border-collapse border border-grey">
        <thead className="bg-blue text-black">
          <tr>
            {columns.map((col) => (
              <th key={col} className="border border-grey px-4 py-2 text-left">
                {col.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="border border-grey bg-white hover:bg-yellow">
                {columns.map((col) => (
                  <td key={col} className="border border-grey px-4 py-2">
                    {row[col] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
