import { Link } from "react-router-dom"

export const UserDashboardRowItem = ({user}) => {
  return (
    <Link
      className="p-4 bg-gray-100 rounded shadow flex justify-between items-center hover:bg-gray-200"
      to={`/user/view/${user.id}`}
    >
        <div>
            <p className="font-medium text-gray-700">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <span
          className={`px-2 py-1 text-sm rounded ${
            user.roles.includes("ADMIN") ?
            "bg-green-500 text-white" 
            : user.roles.includes("ORGANIZER") 
            ? "bg-yellow-500 text-white" 
            : "bg-blue-500 text-white" 
          }`}
        >
          {user.roles.includes("ADMIN") ? "Admin" : user.roles.includes("ORGANIZER") ? "Organizer" : "Usuario"}
        </span>
    </Link>
  )
}

