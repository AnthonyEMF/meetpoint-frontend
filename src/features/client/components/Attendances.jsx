import { useEffect, useState } from "react";
import { useAttendances } from "../hooks/useAttendances";
import { useAuthStore } from "../../security/store";
import { Link, useNavigate } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
import { useRatings } from "../hooks/useRatings";
import { useUsers } from "../hooks/useUsers";
import { Loading } from "../../../shared/components";

export const Attendances = ({ event, handleAttendancesChange }) => {
  const { createAttendance, editAttendance, deleteAttendance, isSubmitting, error } = useAttendances();
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const { createRating } = useRatings();
  const [rating, setRating] = useState(null);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const { user, loadUserById } = useUsers();
  const [fetching, setFetching] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar el usuario para verificar los ratings
    if (isLoading || isRatingSubmitted) {
      loadUserById(loggedUserId)
        .then(() => {
          setFetching(false);
          setIsRatingSubmitted(false);
        })
        .catch(() => setFetching(false));
      setIsLoading(false);
    }

    const userAttendance = event.data.attendances.find(
      (attendance) => attendance.userId === loggedUserId
    );
    setCurrentAttendance(userAttendance || null);
  }, [event.data.attendances, loggedUserId, loadUserById, isLoading, isRatingSubmitted]);

  // Verificar si el usuario ya ha calificado el evento
  const hasRated = user?.data?.madeRatings?.some(
    (rating) => rating.eventId === event.data.id
  );

  // Crear asistencia
  const handleConfirmAttendance = async () => {
    const attendanceData = {
      eventId: event.data.id,
      state: "CONFIRMADO", // Se le asigna CONFORMADO automáticamente
    };

    const result = await createAttendance(attendanceData);
    if (result) {
      setCurrentAttendance(result); // Guardar la asistencia creada
      if (handleAttendancesChange) handleAttendancesChange();
    }
  };

  // Editar la asistencia
  const handleChangeAttendanceState = async (newState) => {
    const updatedAttendance = {
      state: newState,
    };

    const result = await editAttendance(
      currentAttendance.id,
      updatedAttendance
    );
    if (result) {
      setCurrentAttendance(result); // Actualizar la asistencia con el nuevo estado
      if (handleAttendancesChange) handleAttendancesChange();
    }
  };

  // Eliminar la asistencia
  const handleDeleteAttendance = async () => {
    const result = await deleteAttendance(currentAttendance.id);
    if (result) {
      setCurrentAttendance(null); // Eliminar la asistencia localmente
      if (handleAttendancesChange) handleAttendancesChange();
    }
  };

  // Manejar cambio en la calificación
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  // Enviar la calificación
  const handleSubmitRating = async () => {
    if (rating < 0 || rating > 5) return alert("La calificación debe estar entre 0 y 5");

    const ratingData = {
      eventId: event.data.id,
      organizerId: event.data.organizerId,
      score: parseFloat(rating),
    };

    await createRating(ratingData);
    setIsRatingSubmitted(true);
    alert("¡Gracias por tu calificación!");
    navigate(`/user/view/${event.data.organizerId}`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold">Lista de Asistentes</h2>
      <div className="font-semibold text-lg text-gray-600 mb-2">{event.data.attendancesCount} asistencias</div>

      {/* Mostrar si el usuario esta autenticado */}
      {isAuthenticated ? (
        <div>
          {/* Lista de asistencias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {event.data.attendances && event.data.attendances.length > 0 ? (
              event.data.attendances.map((attendance) => (
                <div
                  key={attendance.id}
                  className="bg-gray-200 p-4 rounded-lg flex justify-between items-center"
                >
                  <Link 
                    to={attendance.userId === loggedUserId ? "/user" : `/user/view/${attendance.userId}`}
                    className="flex items-center"
                  >
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                      alt="Perfil"
                      className="w-8 h-8 mt-3 mr-2 rounded-full mx-auto mb-3"
                    />
                    <span>{attendance.userName}</span>
                  </Link>
                  <span
                    className={`px-4 py-2 rounded-full text-white ${
                      attendance.state === "CONFIRMADO"
                        ? "bg-green-500"
                        : attendance.state === "PENDIENTE"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {attendance.state}
                  </span>
                </div>
              ))
            ) : (
              <span className="text-lg text-gray-600 font-semibold">No hay asistentes registrados.</span>
            )}
          </div>
          {/* Crear, editar, eliminar asistencia si la fecha del evento no ha expirado */}
          {currentAttendance && new Date(event.data.date) > new Date() ? (
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold mb-2">
                Cambiar estado de asistencia:
              </h3>
              <div className="flex items-center gap-2">
                <button
                  className="mr-2 px-6 py-2 font-semibold bg-white text-yellow-500 border-2 border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white"
                  onClick={() => handleChangeAttendanceState("PENDIENTE")}
                  disabled={isSubmitting}
                >
                  Pendiente
                </button>
                <button
                  className="mr-2 px-6 py-2 font-semibold bg-white text-green-500 border-2 border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
                  onClick={() => handleChangeAttendanceState("CONFIRMADO")}
                  disabled={isSubmitting}
                >
                  Confirmado
                </button>
                <button
                  className="mr-2 px-6 py-2 font-semibold bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                  onClick={() => handleChangeAttendanceState("CANCELADO")}
                  disabled={isSubmitting}
                >
                  Cancelado
                </button>
                <div className="ml-auto">
                  <button
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleDeleteAttendance}
                    disabled={isSubmitting}
                  >
                    Eliminar Asistencia
                  </button>
                </div>
              </div>
            </div>
          ) : (
            new Date(event.data.date) > new Date() && (
              <button
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                onClick={handleConfirmAttendance}
                disabled={isSubmitting}
              >
                Confirmar Asistencia
              </button>
            )
          )}
        </div>
      ) : (
        <div className="">
          <Link to="/security/login" className="text-blue-700 text-lg font-semibold hover:underline">
            <span className="flex"><PiWarningCircleBold size={22} className="mt-1 mr-1"/>Iniciar sesión para visualizar la lista de asistentes</span>
          </Link>
        </div>
      )}

      {/* Mostrar opción para calificar con estrellas */}
      {currentAttendance && event.data.organizerId !== loggedUserId && new Date(event.data.date) < new Date() && !fetching && (
        <div className="mt-4">
          {hasRated || isRatingSubmitted ? (
            <p className="text-center text-xl font-semibold text-blue-600">
              ¡Gracias por tu calificación, esperamos que asistas al próximo evento!
            </p>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-3 text-center">
                ¿Qué calificación le das a este evento?
              </h2>
              <div className="flex items-center gap-2 justify-center">
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="0 - 5"
                  className="p-2 border border-gray-300 rounded"
                  onChange={handleRatingChange}
                />
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleSubmitRating}
                  disabled={isSubmitting}
                >
                  Enviar
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
};
