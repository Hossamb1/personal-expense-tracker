import { useEffect, useState } from "react";
import { getMonthlyReport } from "../api/expenses";

export default function MonthlyReport({ expenseTrack }) {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [expenseTrack]);

  const fetchReport = async () => {
    try {
      const data = await getMonthlyReport();
      setReport(data);
    } catch (error) {
      console.error("Failed to fetch report", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-2xl h-fit">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Current Month Report
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : report.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table className="w-full text-left border-t">
          <thead>
            <tr>
              <th className="p-2">Category</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {report.map((item, index) => (
              <tr key={`${item.category}-${index}`}>
                <td className="p-2">{item.category}</td>
                <td className="p-2">
                  ${parseFloat(item.totalAmount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t">
            <tr>
              <td className="p-2 font-bold">Total Expenses:</td>
              <td className="p-2">
                $
                {parseFloat(
                  report.reduce((sum, item) => sum + (item.totalAmount || 0), 0)
                ).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
