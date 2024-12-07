export const CategoryDashboardRowItem = ({category}) => {
  return (
    <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
        <div>
            <p className="font-medium text-gray-700">{category.name}</p>
            <p className="text-sm text-gray-500">{category.description}</p>
        </div>
    </li>
  )
}
