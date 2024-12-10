import { IoStatsChart } from "react-icons/io5";
import { TbMessageReport } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../security/store";

export const UserRowItem = ({ user }) => {
  // Obtener id del usuario en sesión
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();

  return (
    <tr key={user.id}>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {user.firstName} {user.lastName}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
      <td className="px-6 py-4 text-sm">
        <span
          className={`px-2 py-1 text-sm rounded ${
            user.roles.includes("ADMIN")
              ? "bg-green-500 text-white"
              : user.roles.includes("ORGANIZER")
              ? "bg-yellow-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {user.roles.includes("ADMIN")
            ? "Admin"
            : user.roles.includes("ORGANIZER")
            ? "Organizer"
            : "Usuario"}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <div className="flex">
          <TbMessageReport size={16} className="mt-1 mr-1" /> {user.reportsCount}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <div className="flex">
          <IoStatsChart size={14} className="mt-1 mr-1" /> {user.ratingsCount}
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium">
        <Link
          to={user.id === loggedUserId ? "/user" : `/user/view/${user.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          Ver detalles
        </Link>
      </td>
    </tr>
  );
};
