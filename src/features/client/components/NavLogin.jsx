import { Link } from "react-router-dom"

export const NavLogin = () => {
  return (
    <nav className="bg-gray-600 text-white py-4 px-8 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/home"><h1 className="text-2xl font-bold hover:text-gray-800">MeetPoint</h1></Link>
          <div className="flex items-center">
            <Link to="/login" className="bg-gray-800 mr-3 px-4 py-2 rounded hover:bg-gray-700">Iniciar Sesión</Link>
            <Link to="/register" className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">Registrarse</Link>
          </div>
        </div>
    </nav>
  )
}
