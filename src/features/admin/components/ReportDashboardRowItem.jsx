import { formatDate } from "../../../shared/utils";
import { useReports } from "../../client/hooks/useReports";

export const ReportDashboardRowItem = ({ reports = [], handleReportsChange }) => {
  const { deleteReport, isSubmitting } = useReports();

  // Eliminar un reporte
  const handleDeleteReport = async (reportId) => {
    await deleteReport(reportId);
    if (handleReportsChange) handleReportsChange();
  };

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id}>
          <li className="p-4 bg-gray-200 rounded shadow flex justify-between items-center">
            <div className="w-1/5">
              <p className="font-bold text-gray-700">
                Para: {report.organizerName}
              </p>
              <p className="text-sm text-gray-700">De: {report.reporterName}</p>
            </div>
            <div className="w-3/5">
              <p className="font-medium text-gray-700">
                <span className="font-bold">Motivo:</span> {report.reason}
              </p>
              <p className="font-bold text-gray-700">
                {formatDate(report.reportDate)}
              </p>
            </div>
            <div className="w-1/5 text-right">
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                onClick={() => handleDeleteReport(report.id)}
                disabled={isSubmitting}
              >
                {" "}
                Eliminar Reporte
              </button>
            </div>
          </li>
        </div>
      ))}
    </div>
  );
};
