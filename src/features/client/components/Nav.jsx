import { Link } from "react-router-dom";
import { useAuthStore } from "../../security/store/useAuthStore";
import { ProtectedComponent } from "../../../shared/components/ProtectedComponent";
import { rolesListConstant } from "../../../shared/constants";
import { FaHome, FaInfo, FaUserEdit } from "react-icons/fa";
import { FaMapLocationDot, FaPeopleRobbery } from "react-icons/fa6";

export const Nav = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <nav className="bg-gray-600 text-white py-4 px-8 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/home" className="flex">
              <h1 className="text-2xl flex font-bold hover:text-gray-800">
                <FaMapLocationDot size={24} className="mr-2 mt-1" />
                MeetPoint
              </h1>
            </Link>

            {!isAuthenticated ? (
              <Link to="security/login" className="bg-gray-800 ml-3 px-4 py-2 rounded hover:bg-gray-700">Iniciar Sesión</Link>
            ) : (
              <div>
                {/* Mostrar botón de Administración para el rol de ADMIN */}
                <ProtectedComponent requiredRoles={[rolesListConstant.ADMIN]}>
                  <Link to="/administration/dashboard" className="bg-gray-800 ml-3 px-4 py-2 rounded hover:bg-gray-700">Administración</Link>
                </ProtectedComponent>
              </div>
            )}

          </div>
          <div className="flex items-center">
            <Link to="/home" className="flex mr-6 py-2 font-bold hover:text-gray-800">
              <FaHome className="mt-1 mr-1" />
              Inicio
            </Link>
            <Link to="/main" className="flex mr-6 py-2 font-bold hover:text-gray-800">
              <FaPeopleRobbery className="mt-1 mr-1" />
              Eventos
            </Link>

            {isAuthenticated ? (
              <Link to="/user" className="flex mr-5 py-2 font-bold hover:text-gray-800">
                <FaUserEdit size={16} className="mt-1 mr-1" />
                Cuenta
              </Link>
            ) : (
              <div></div>
            )}

            <a href="https://docs.google.com/document/d/1JFwLnAkZl2uyuYaLzzaFbGsA--S6Tyr_/edit?usp=drive_link&ouid=100619136883602753953&rtpof=true&sd=true" target="_blank" className="flex py-2 font-bold hover:text-gray-800">
            <FaInfo size={15} className="mt-1" />
              Información
            </a>
          </div>
        </div>
    </nav>
  )
}
