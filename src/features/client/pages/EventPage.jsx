import { formatDate, loggedUser } from "../../../shared/utils";
import { useEvents } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Attendances, Comments, EventPageSkeleton } from "../components";

// Simulación del usuario en sesión (Temporal)
const loggedInUser = loggedUser();

export const EventPage = () => {
  const { id } = useParams();
  const { event, loadEventById, deleteEvent, isLoading } = useEvents();
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetching) {
      if (id) {
        loadEventById(id);
        setFetching(false);
      }
    }
  }, [fetching]);

  if (!event || !event.data) {
    return <div>Evento no encontrado.</div>;
  }

  // Verificar si el usuario en sesión es el organizador del evento
  const isOrganizer = loggedInUser.id === event.data.organizerId;

  // Editar el evento
  const handleEditEvent = () => {
    navigate(`/main/event/edit/${id}`);
  };

  // Eliminación del evento
  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar este evento?"
    );
    if (confirmDelete) {
      await deleteEvent(event.data.id);
      navigate("/main");
    }
  };

  const handleAttendancesChange = async () => {
    await loadEventById(id);
  };

  const handleCommentsChange = async () => {
    await loadEventById(id);
  }

  return (
    <div className="container mx-auto p-6">
      
      {/* Información del Evento */}
      {isLoading ? (
        <EventPageSkeleton />
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex">
        {/* Contenedor Izquierdo */}
        <div className="w-full md:w-70">
          <h1 className="text-3xl font-bold mb-2">{event.data.title}</h1>
          <p className="text-xl mb-4">{event.data.description}</p>
          <p className="mb-2">
            <span className="font-bold">Ubicación:</span> {event.data.ubication}
          </p>
          <p>
            <span className="font-bold">Fecha del Evento:</span>{" "}
            {formatDate(event.data.date)}
          </p>
        </div>
        {/* Contenedor Derecho */}
        <div className="w-full md:w-30 md:pl-4 flex flex-col items-end">
          <p className="mb-2 self-end">
            Organizado por{" "}
            <span className="font-bold">{event.data.organizerName}</span>
          </p>
          {isOrganizer && (
            <div>
              <button
                className="my-2 mr-2 px-10 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                onClick={handleEditEvent}
              >
                Editar
              </button>
              <button
                className="my-2 px-8 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                onClick={handleDeleteEvent}
              >
                Eliminar
              </button>
            </div>
          )}
          <div className="text-white bg-orange-500 rounded-3xl px-10 py-2 mt-auto">
            {event.data.categoryName}
          </div>
        </div>
      </div>
      )}

      {/* Lista de Asistentes */}
      <Attendances event={event} handleAttendancesChange={handleAttendancesChange} />

      {/* Sección de Comentarios */}
      <Comments event={event} handleCommentsChange={handleCommentsChange} />

    </div>
  );
};
