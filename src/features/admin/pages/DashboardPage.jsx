import { Link } from "react-router-dom";
import { CategoryDashboardRowItem, EventDashboardRowItem, ReportDashboardRowItem, UserDashboardRowItem } from "../components";
UserDashboardRowItem
import { useUsers } from "../../client/hooks/useUsers";
import { useEffect, useState } from "react";
import { useCategories, useEvents } from "../../client/hooks";
import { useReports } from "../../client/hooks/useReports";

export const DashboardPage = () => {
  const { users, loadUsers, isLoading } = useUsers();
  const { events, loadEvents } = useEvents();
  const { categories, loadCategories } = useCategories();
  const { reports, loadReports } = useReports();
  const [currentPage] = useState(1);
  const [searchTerm] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
        loadUsers(searchTerm, currentPage);
      setFetching(false);
    }
  }, [fetching, searchTerm, currentPage]);

  useEffect(() => {
    if (fetching) {
      loadEvents(searchTerm, currentPage);
      setFetching(false);
    }
  }, [fetching, searchTerm, currentPage]);

  useEffect(() => {
    if (fetching) {
      loadCategories(searchTerm, currentPage);
      setFetching(false);
    }
  }, [fetching, searchTerm, currentPage]);

  useEffect(() => {
    if (fetching) {
      loadReports(searchTerm, currentPage);
      setFetching(false);
    }
  }, [fetching, searchTerm, currentPage]);


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
        <div className="container mx-auto mt-4 px-4 gap-6 grid grid-cols-1 md:grid-cols-4">
          <Link to="/administration/users-list" className="px-6 py-2 bg-gray-500 text-white text-center rounded hover:bg-gray-600">
            Ver todos los Usuarios
          </Link>
          <Link to="/administration/events-list" className="px-6 py-2 bg-gray-500 text-white text-center rounded hover:bg-gray-600">
            Ver todos los Eventos
          </Link>
          <Link to="/administration/categories-list" className="px-6 py-2 bg-gray-500 text-white text-center rounded hover:bg-gray-600">
            Ver todas las Categorías
          </Link>
          <Link to="/administration/reports-list" className="px-6 py-2 bg-gray-500 text-white text-center rounded hover:bg-gray-600">
            Ver todos los Reportes
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-2 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Usuarios Recientes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Usuarios Recientes</h2>
          <ul className="space-y-2">
          {isLoading ? (
              <li>
                <p colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Cargando...
                </p>
              </li>
            ) : users?.data?.items?.length ? (
              users.data.items.slice(0, 5).map((user) => (
                <UserDashboardRowItem key={user.id} user={user} />
              ))
            ) : (
              <li>
                <p colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No se encontraron resultados.
                </p>
              </li>
            )}
          </ul>
        </section>

        {/* Eventos Recientes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Eventos Recientes</h2>
          <ul className="space-y-2">
          {isLoading ? (
              <li>
                <p colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Cargando...
                </p>
              </li>
            ) : events?.data?.items?.length ? (
              events.data.items.slice(0, 5).map((event) => (
                <EventDashboardRowItem key={event.id} event={event}/>
              ))
            ) : (
              <li>
                <p colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No se encontraron resultados.
                </p>
              </li>
            )}
          </ul>
        </section>

        {/* Categorías Recientes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Categorías Recientes</h2>
          <ul className="space-y-2">
          {isLoading ? (
              <li>
                <p colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Cargando...
                </p>
              </li>
            ) : categories?.data?.items?.length ? (
              categories.data.items.slice(0, 5).map((category) => (
                <CategoryDashboardRowItem key={category.id} category={category} />
              ))
            ) : (
              <li>
                <p colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No se encontraron resultados.
                </p>
              </li>
            )}
          </ul>
        </section>

        {/* Reportes Recientes */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Reportes Recientes</h2>
          <ul className="space-y-2">
          {isLoading ? (
              <li>
                <p colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Cargando...
                </p>
              </li>
            ) : reports?.data?.items?.length ? (
              reports.data.items.slice(0, 5).map((report) => (
                <ReportDashboardRowItem key={report.id} report={report} />
              ))
            ) : (
              <li>
                <p colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No se encontraron resultados.
                </p>
              </li>
            )}
          </ul>
        </section>
      </main>
    </div>
    );
  };
  