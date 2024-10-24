import { MdEmail } from "react-icons/md";
import { ImLock } from "react-icons/im";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-full mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-6 text-center">Iniciar Sesión</h1>
        <div className="flex items-center mb-4">
          <MdEmail className="mr-2" />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border w-full p-2 rounded-md"
          />
        </div>
        <div className="flex items-center mb-6">
          <ImLock className="mr-2" />
          <input
            type="password"
            placeholder="Contraseña"
            className="border w-full p-2 rounded-md"
          />
        </div>
        <Link
          to="/main"
          className="flex justify-center text-center bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md"
        >
          Continuar
        </Link>
      </div>
    </div>
  );
};
