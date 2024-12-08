import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomAlerts } from "../../../shared/components";

export const EditUserPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    role: "",
  });

  // Estado del alert
  const [alertData, setAlertData] = useState({ message: "", type: "", show: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mostrar alert de éxito
    setAlertData({
      message: "Usuario actualizado correctamente.",
      type: "success",
      show: true,
    });

    // Redirigir después de 2 segundos
    setTimeout(() => {
      navigate("/users");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-6">
      <main className="flex-1 p-6">
        <h2 className="text-3xl text-white font-bold mb-6">Editar Usuario</h2>

        {/* Mostrar el alert si está habilitado */}
        {alertData.show && (
          <CustomAlerts
            message={alertData.message}
            type={alertData.type}
            onClose={() => setAlertData((prev) => ({ ...prev, show: false }))}
          />
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              Primer Nombre
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Primer Nombre"
              value={userData.firstName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Segundo Nombre
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Segundo Nombre"
              value={userData.lastName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Localización
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Localización"
              value={userData.location}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecciona un rol</option>
              <option value="Admin">Admin</option>
              <option value="User">Usuario</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-80 bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
            >
              Actualizar Usuario
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
