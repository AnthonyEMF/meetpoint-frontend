import { FaRegComment } from "react-icons/fa";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";

export const DashboardPage = () => {
    return (
      <div className="min-h-screen">
      {/* Header */}
      <header>
        <div className="container mx-auto mt-4 px-4 py-4 text-center">
          <h1 className="text-4xl font-bold text-white">Administración</h1>
        </div>
      </header>

      {/* Menu */}
      <nav>
        <div className="container mx-auto mt-4 px-4 gap-6 grid grid-cols-1 md:grid-cols-3">
          <button className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Ver todos los Usuarios
          </button>
          <button className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Ver todos los Eventos
          </button>
          <button className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Ver todas las Categorías
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Usuarios Recientes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Usuarios Recientes</h2>
          <ul className="space-y-2">
            <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">Juan Pérez</p>
                <p className="text-sm text-gray-500">juan.perez@email.com</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                Admin
              </span>
            </li>
            <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">María López</p>
                <p className="text-sm text-gray-500">maria.lopez@email.com</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                Usuario
              </span>
            </li>
            <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">Carlos García</p>
                <p className="text-sm text-gray-500">carlos.garcia@email.com</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                Usuario
              </span>
            </li>
          </ul>
        </section>

        {/* Eventos Recientes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Eventos Recientes</h2>
          <ul className="space-y-2">
            <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">Conferencia Tech 2024</p>
                  <p className="text-sm text-gray-500">Categoría: Tecnología</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-gray-500 text-sm">
                  <FaRegComment className="w-5 h-5 mr-1"/>
                    15
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                  <MdOutlinePlaylistAddCheck className="w-5 h-5 mr-1"/>
                    120
                  </div>
                </div>
            </li>
            <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">Concierto Rock</p>
                  <p className="text-sm text-gray-500">Categoría: Música</p>
                </div>
                <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-500 text-sm">
                  <FaRegComment className="w-5 h-5 mr-1"/>
                    8
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                  <MdOutlinePlaylistAddCheck className="w-5 h-5 mr-1"/>
                    45
                  </div>
                </div>
            </li>
            <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">Partido de Futbol</p>
                  <p className="text-sm text-gray-500">Categoría: Deportes</p>
                </div>
                <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-500 text-sm">
                  <FaRegComment className="w-5 h-5 mr-1"/>
                    10
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                  <MdOutlinePlaylistAddCheck className="w-5 h-5 mr-1"/>
                    30
                  </div>
                </div>
            </li>
          </ul>
        </section>

        {/* Categorías Recientes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Categorías Recientes</h2>
          <ul className="space-y-2">
            <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
              <div>
              <p className="font-medium text-gray-700">Tecnología</p>
              <p className="text-sm text-gray-500">Conferencias y meetups tech.</p>
              </div>
            </li>
            <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">Música</p>
                <p className="text-sm text-gray-500">Conciertos, festivales y más.</p>
              </div>
            </li>
            <li className="p-4 bg-gray-50 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">Arte</p>
                <p className="text-sm text-gray-500">Exposiciones, museos y más.</p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
    );
  };
  