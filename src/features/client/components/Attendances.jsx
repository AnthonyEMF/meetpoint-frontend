import { useState, useEffect } from "react";
import { useAttendances } from "../hooks/useAttendances";
import { loggedUser } from "../../../shared/utils";

// Simulación del usuario en sesión (Temporal)
const loggedInUser = loggedUser();

export const Attendances = ({ event, handleAttendancesChange }) => {
  const {
    createAttendance,
    editAttendance,
    deleteAttendance,
    isSubmitting,
    error,
  } = useAttendances();
  const [currentAttendance, setCurrentAttendance] = useState(null);

  // Validar si el usuario tiene una asistencia registrada
  useEffect(() => {
    const userAttendance = event.data.attendances.find(
      (attendance) => attendance.userId === loggedInUser.id
    );
    setCurrentAttendance(userAttendance || null);
  }, [event.data.attendances]);

  // Crear asistencia
  const handleConfirmAttendance = async () => {
    const attendanceData = {
      userId: loggedInUser.id,
      eventId: event.data.id,
      state: "CONFIRMADO",
    };

    const result = await createAttendance(attendanceData);
    if (result) {
      setCurrentAttendance(result); // Guardar la asistencia creada
      if (handleAttendancesChange) handleAttendancesChange(); // Notificar al componente padre
    }
  };

  // Cambiar el estado de la asistencia
  const handleChangeAttendanceState = async (newState) => {
    const updatedAttendance = {
      userId: loggedInUser.id,
      eventId: event.data.id,
      state: newState,
    };

    const result = await editAttendance(
      currentAttendance.id,
      updatedAttendance
    );
    if (result) {
      setCurrentAttendance(result); // Actualizar la asistencia con el nuevo estado
      if (handleAttendancesChange) handleAttendancesChange(); // Notificar al componente padre
    }
  };

  // Eliminar la asistencia
  const handleDeleteAttendance = async () => {
    const result = await deleteAttendance(currentAttendance.id);
    if (result) {
      setCurrentAttendance(null); // Eliminar la asistencia localmente
      if (handleAttendancesChange) handleAttendancesChange(); // Notificar al componente padre
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Asistentes</h2>
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
          <p>No hay asistentes registrados.</p>
        )}
      </div>
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
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
};
