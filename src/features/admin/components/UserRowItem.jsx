import { Link } from "react-router-dom"

export const UserRowItem = ({user}) => {
  return (
    <tr key={user.id}>
        <td className="px-6 py-4 text-sm font-medium text-gray-900">
          {user.firstName} {user.lastName}
        </td>
        <td className="px-6 py-4 text-sm text-gray-700">
          {user.email}
        </td>
        <td className="px-6 py-4 text-sm">
        <span
          className={`px-2 py-1 text-sm rounded-lg ${
            user.rol === "Admin"
              ? "px-2 py-1 bg-green-100 text-green-700 text-sm rounded"
              : "px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded"
          }`}
        >
          {user.rol === "Admin" ? "Admin" : "Usuario"}
        </span>
      </td>
        <td className="px-6 py-4 text-sm font-medium">
          <Link
            to={`/user/view/:id`}
            className="text-blue-600 hover:text-blue-800"
          >
            Ver detalles
          </Link>
        </td>
    </tr>
  )
}
