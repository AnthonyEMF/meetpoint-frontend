
export const CategoriesRowItem = ({category}) => {
  return (
    <tr key={category.id}>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
    </tr>
  )
}
