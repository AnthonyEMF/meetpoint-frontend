export const UserDashboardRowItem = ({user}) => {
  return (
    <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
        <div>
            <p className="font-medium text-gray-700">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <span
          className={`px-2 py-1 text-sm rounded-lg ${
            user.rol === "ADMIN"
              ? "px-2 py-1 bg-green-100 text-green-700 text-sm rounded"
              : "px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded"
          }`}
        >
          {user.rol === "Admin" ? "Admin" : "Usuario"}
        </span>
    </li>
  )
}

