import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { formatDate } from "../../../shared/utils";
import { useAuthStore } from "../../security/store/useAuthStore";

export const UserPage = () => {
  const logout = useAuthStore((state) => state.logout);
  const [fetching, setFetching] = useState(true);
  const { user, loadUserById } = useUsers();

  // Obtener id del usuario desde el token
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();

  useEffect(() => {
    if(fetching){
      loadUserById(loggedUserId);
      setFetching(false);
    }
  }, [fetching, loadUserById]);

  // Cerrar Sesión
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container mx-auto p-6">
      {/* Información de Usuario */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <img
              className="w-32 h-32 rounded-full"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
            {user?.data?.firstName} {user?.data?.lastName}
            </h2>
            <p className="py-1 text-gray-700">{user?.data?.email}</p>
            <p className="text-gray-700">{user?.data?.location}</p>
          </div>
        </div>
        <div className="ml-auto">
          <Link to="/main/event/create">
            <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-500 mb-4">
              Crear Nuevo Evento
            </button>
          </Link>
          <Link to="/home">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-500">
              Cerrar Sesión
            </button>
          </Link>
        </div>
      </div>

      {/* Eventos */}
      <div className="flex justify-between gap-4">
        {/* Eventos Organizados */}
        <div className="w-full">
          <h2 className="text-2xl text-white mb-4 font-semibold">Eventos Organizados</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
              {user?.data?.organizedEvents?.length > 0 ? (
                user.data.organizedEvents.map(event => (
                  <Link to={`/main/event/${event.id}`} key={event.id} className="flex justify-between p-3 rounded-md transition-colors duration-200 hover:text-white hover:bg-gray-600">
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
                user.data.attendances.map(attendance => (
                  <Link to={`/main/event/${attendance.eventId}`} key={attendance.id} className="flex justify-between p-3 rounded-md transition-colors duration-200 hover:text-white hover:bg-gray-600">
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
                      >{attendance.state}
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
