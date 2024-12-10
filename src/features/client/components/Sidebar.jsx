import { Link } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useAuthStore } from "../../security/store/useAuthStore";
import { BiLogOutCircle } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";

export const Sidebar = ({ onCategorySelect }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const { user, loadUserById } = useUsers();
  const { categories, loadCategories, isLoading } = useCategories();
  const [fetching, setFetching] = useState(true);

  // Obtener id del usuario en sesión
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId();

  useEffect(() => {
    if (fetching) {
      loadUserById(loggedUserId);
      loadCategories();
      setFetching(false);
    }
  }, [fetching, loadUserById, loadCategories]);

  // Pasar nombre de categoría para ordenar eventos
  const handleCategoryClick = (category) => {
    onCategorySelect(category.name);
  };

  // Cerrar Sesión
  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 mr-6 mb-6">
      {/* Sección de Usuario */}
      {isAuthenticated ? (
        <div className="bg-white shadow-lg rounded-md p-6 mb-4">
          <div className="text-center mb-2">
            <Link to="/user">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                alt="Perfil"
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
            </Link>
            <h2 className="text-xl font-bold">
              {user?.data?.firstName} {user?.data?.lastName}
            </h2>
          </div>
          <div className="mb-4 text-center">
            <p className="mb-2">Eventos Organizados: <span className="font-bold">{user?.data?.eventsCount}</span></p>
            <p>Eventos Registrados: <span className="font-bold">{user?.data?.attendancesCount}</span></p>
          </div>
          <div className="mb-4">
            <Link to="/main/event/create">
              <button className="flex items-center justify-center bg-green-600 text-white w-full py-2 rounded hover:bg-green-500 mb-4">
                <FiPlusCircle size={17} className="mr-1" />
                Nuevo Evento
              </button>
            </Link>
            <Link to="/home">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center bg-gray-600 text-white w-full py-2 rounded hover:bg-gray-500">
                <BiLogOutCircle size={20} className="mr-1" />
                Cerrar Sesión
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {/* Sección de Categorías */}
      <div className="bg-white shadow-lg rounded-md p-6">
        <h3 className="text-xl font-bold mb-4">Categorías</h3>
        <ul className="space-y-2">
          {isLoading ? (
            <li>Cargando categorías...</li>
          ) : (
            categories?.data?.items?.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="text-gray-600 hover:underline"
                >
                  {category.name}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
};