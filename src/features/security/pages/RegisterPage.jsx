import { MdEmail, MdLocationOn } from "react-icons/md";
import { ImLock } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../../client/hooks/useUsers";
import { useState } from "react";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { createUser, isSubmitting, error } = useUsers();
  const [ userData, setUserData ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseñas coincidentes
    if (userData.password !== userData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Crear usuario
    await createUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      location: userData.location,
    });

    // Redireccionar si no hay error
    if (!error) {
      alert("Usuario registrado correctamente.");
      navigate(`/main`);
    }
  };

  return (
    <div className="flex items-center justify-center h-full mt-8 mb-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-6 text-center">Registrarse</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <FaUser className="mr-2" />
            <input
              type="text"
              name="firstName"
              placeholder="Primer nombre"
              className="border w-full p-2 rounded-md"
              value={userData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <FaUser className="mr-2" />
            <input
              type="text"
              name="lastName"
              placeholder="Segundo nombre"
              className="border w-full p-2 rounded-md"
              value={userData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <MdLocationOn className="mr-2" />
            <input
              type="text"
              name="location"
              placeholder="Locación"
              className="border w-full p-2 rounded-md"
              value={userData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <MdEmail className="mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="border w-full p-2 rounded-md"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <ImLock className="mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="border w-full p-2 rounded-md"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center mb-6">
            <ImLock className="mr-2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              className="border w-full p-2 rounded-md"
              value={userData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center text-center bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md w-full"
          >
            {isSubmitting ? "Registrando..." : "Ingresar"}
          </button>
          <Link
            to="/security/login"
            className="flex justify-center pt-3 text-blue-500 underline"
            >
            Iniciar Sesión
          </Link>
        </form>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
};
