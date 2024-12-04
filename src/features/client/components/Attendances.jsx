import { useEffect, useState } from "react";
import { useAttendances } from "../hooks/useAttendances";
import { useAuthStore } from "../../security/store";
import { Link } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";

export const Attendances = ({ event, handleAttendancesChange }) => {
  const {
    createAttendance,
    editAttendance,
    deleteAttendance,
    isSubmitting,
    error,
  } = useAttendances();
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Obtener id del usuario desde el token
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();

  // Validar si el usuario tiene una asistencia registrada
  useEffect(() => {
    const userAttendance = event.data.attendances.find(
      (attendance) => attendance.userId === loggedUserId
    );
    setCurrentAttendance(userAttendance || null);
  }, [event.data.attendances]);

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
                  <span>{attendance.userName}</span>
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
          {/* Crear, editar, eliminar asistencia */}
          {currentAttendance ? (
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
            <button
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              onClick={handleConfirmAttendance}
              disabled={isSubmitting}
            >
              Confirmar Asistencia
            </button>
          )}
        </div>
      ) : (
        <div className="">
          <Link to="/security/login" className="text-blue-700 text-lg font-semibold hover:underline">
            <span className="flex"><PiWarningCircleBold size={22} className="mt-1 mr-1"/>Iniciar sesión para visualizar la lista de asistentes</span>
          </Link>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
};
