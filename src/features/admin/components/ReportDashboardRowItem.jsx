export const ReportDashboardRowItem = ({report}) => {
  return (
    <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
        <div>
            <p className="font-medium text-gray-700">Para: {report.organizerName}</p>
            <p className="text-sm text-gray-500">De: {report.reporterName}</p>
        </div>
        <div>
            <p className="font-medium text-gray-700">{report.reportDate}</p>
        </div>
    </li>
  )
}
