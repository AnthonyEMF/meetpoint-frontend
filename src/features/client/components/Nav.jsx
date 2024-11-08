import { Link } from "react-router-dom"
import { useAuthStore } from "../../security/store/useAuthStore"

export const Nav = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <nav className="bg-gray-600 text-white py-4 px-8 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/home"><h1 className="text-2xl font-bold hover:text-gray-800">MeetPoint</h1></Link>

            {!isAuthenticated ? (
              <Link to="security/login" className="bg-gray-800 ml-3 px-4 py-2 rounded hover:bg-gray-700">Iniciar Sesión</Link>
            ) : (
              <div></div>
            )}

          </div>
          <div className="flex items-center">
            <Link to="/home" className="mr-6 py-2 font-bold hover:text-gray-800">Inicio</Link>
            <Link to="/main" className="mr-6 py-2 font-bold hover:text-gray-800">Eventos</Link>

            {isAuthenticated ? (
              <Link to="/user" className="mr-6 py-2 font-bold hover:text-gray-800">Cuenta</Link>
            ) : (
              <div></div>
            )}

            <a href="https://docs.google.com/document/d/1JFwLnAkZl2uyuYaLzzaFbGsA--S6Tyr_/edit?usp=drive_link&ouid=100619136883602753953&rtpof=true&sd=true" target="_blank" className="py-2 font-bold hover:text-gray-800">Información</a>
          </div>
        </div>
    </nav>
  )
}
