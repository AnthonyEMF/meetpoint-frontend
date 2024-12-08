import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { formatDate } from "../../../shared/utils";
import { useAuthStore } from "../../security/store";
import { ProtectedComponent, StarRating } from "../../../shared/components";
import { rolesListConstant } from "../../../shared/constants";

export const UserViewPage = () => {
  const [fetching, setFetching] = useState(true);
  const { user, loadUserById } = useUsers();
  const { id } = useParams();

  // Obtener id del usuario desde el token
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();

  useEffect(() => {
    if (fetching) {
      loadUserById(id);
      setFetching(false);
    }
  }, [fetching, loadUserById]);

  return (
    <div className="container mx-auto p-6">
      {/* Información de Usuario */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <img
              className="w-32 h-32 rounded-full"
              src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              alt="Profile"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
            {user?.data?.firstName} {user?.data?.lastName}
            </h2>
            <p className="py-1 text-gray-700">{user?.data?.email}</p>
            <p className="text-gray-700">{user?.data?.location}</p>
            <div className="mt-2">
              <StarRating rating={user?.data?.averageRating || 0} />
            </div>
          </div>
        </div>
        <div className="ml-auto">
          {/* Restringir botones de eliminar y editar solo para administración */}
          <ProtectedComponent requiredRoles={[rolesListConstant.ADMIN]}>
            <Link to={`/administration/user/edit/${user.id}`}> 
              <button className="bg-blue-500 text-white w-full my-1 py-2 px-4 rounded hover:bg-blue-400">
                Editar
              </button>
            </Link>
            <button 
              className="bg-red-600 text-white w-full my-1 py-2 px-4 rounded hover:bg-red-500">
              Eliminar
            </button>
          </ProtectedComponent>

          {/* Validar que el usuario en sesión no se pueda reportar a si mismo */}
          {loggedUserId != id && (
            <div>
              <Link to="/home">
                <button className="font-semibold bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white w-full my-1 py-2 px-4">
                  Reportar
                </button>
              </Link>
            </div>
          )}
          
        </div>
      </div>

      {/* Eventos */}
      <div className="flex justify-between gap-4">
        {/* Eventos Organizados */}
        <div className="w-full">
          <h2 className="text-2xl text-white mb-4 font-semibold">Eventos Organizados</h2>
          <div className="bg-white shadow-lg rounded-lg p-4">
            {user?.data?.organizedEvents?.length > 0 ? (
              user.data.organizedEvents.map((event) => (
                <Link
                  to={`/main/event/${event.id}`}
                  key={event.id}
                  className="flex justify-between p-3 rounded-md transition-colors duration-200 hover:text-white hover:bg-gray-600"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p>{event.categoryName}</p>
                  </div>
                  <div className="flex-1 text-right">
                    <p>{formatDate(event.date)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-600">No hay eventos organizados aún.</p>
            )}
          </div>
        </div>

        {/* Eventos Registrados (Asistencias) */}
        <div className="w-full">
          <h2 className="text-2xl text-white mb-4 font-semibold">Eventos Registrados</h2>
          <div className="bg-white shadow-lg rounded-lg p-4">
            {user?.data?.attendances?.length > 0 ? (
              user.data.attendances.map((attendance) => (
                <Link
                  to={`/main/event/${attendance.eventId}`}
                  key={attendance.id}
                  className="flex justify-between p-3 rounded-md transition-colors duration-200 hover:text-white hover:bg-gray-600"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{attendance.eventTitle}</h3>
                  </div>
                  <div className="flex text-right">
                    <div
                      className={`font-bold rounded-2xl px-3 py-1 text-white ${
                        attendance.state === "CONFIRMADO"
                          ? "bg-green-500"
                          : attendance.state === "PENDIENTE"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {attendance.state}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-600">No estás registrado en ningún evento.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
