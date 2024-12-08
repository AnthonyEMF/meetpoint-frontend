import { Link } from "react-router-dom"

export const CategoriesRowItem = ({category}) => {
  return (
    <tr key={category.id}>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
        <td className="px-6 py-4 text-sm text-white">
          <Link
            className="bg-blue-500 px-4 py-2 rounded mr-2 hover:bg-blue-400" 
            to={`administration/categories-list/edit/${category.id}`} // Mandar al EditCategoryPage
          >
            Editar
          </Link>
          {/* Este no tendrá pagina */}
          <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-400"> 
            Eliminar 
          </button>
        </td>
    </tr>
  )
}
