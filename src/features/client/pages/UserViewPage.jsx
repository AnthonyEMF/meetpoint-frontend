import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useAuthStore } from "../../security/store";
import { formatDate } from "../../../shared/utils";
import { useEvents } from "../hooks";

// Componente para mostrar estrellas de calificación
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return (
            <span key={index} className="text-yellow-500 text-2xl">
              ★
            </span>
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <span key={index} className="text-yellow-500 text-2xl">
              ☆
            </span>
          );
        } else {
          return (
            <span key={index} className="text-gray-300 text-2xl">
              ★
            </span>
          );
        }
      })}
      <span className="ml-2 text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
};

export const UserViewPage = () => {
  const [fetching, setFetching] = useState(true);
  const { user, loadUserById } = useUsers();
  const { event, loadEventById } = useEvents();
  const { id } = useParams();

  const getUserId = useAuthStore((state) => state.getUserId);
  const OrganizerUserId = getUserId();

  useEffect(() => {
    if (fetching) {
      loadUserById(OrganizerUserId);
      setFetching(false);
    }
  }, [fetching, loadUserById]);

  useEffect(() => {
    if (fetching) {
      if (id) {
        loadEventById(id);
        setFetching(false);
      }
    }
  }, [fetching]);

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
            {event?.data?.organizerId}
            </h2>
            <p className="py-1 text-gray-700">{user?.data?.email}</p>
            <p className="text-gray-700">{user?.data?.location}</p>
            <div className="mt-2">
              <StarRating rating={user?.data?.rating || 3.5} />
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <Link to="/home">
            <button className="bg-red-600 text-white w-full py-2 px-4 rounded hover:bg-red-500">
              Reportar
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
