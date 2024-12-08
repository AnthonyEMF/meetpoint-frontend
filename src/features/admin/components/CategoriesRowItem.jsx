import { Link } from "react-router-dom";
import { useCategoriesStore } from "../store/useCategoriesStore";
import { useEvents } from "../../client/hooks";
import { useEffect, useState } from "react";

export const CategoriesRowItem = ({ category, handleCategoriesChange }) => {
  const { deleteCategory } = useCategoriesStore();
  // cargar eventos para la validación de relaciones con categorías
  const { events, loadEvents } = useEvents();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      loadEvents();
      setFetching(false);
    }
  }, [fetching]);

  const handleDelete = async () => {
    try {
      const isCategoryRelated = events.data.items.some((event) => event.categoryId === category.id);
      if (isCategoryRelated) {
        alert(
          "Error: No se pueden eliminar categorías con eventos relacionados."
        );
        return;
      }

      await deleteCategory(category.id);
      alert("Categoría eliminada correctamente.");
      if (handleCategoriesChange) handleCategoriesChange();
      //console.log(`Categoría ${category.id} eliminada.`);
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <tr key={category.id}>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {category.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {category.description}
      </td>
      <td className="px-6 py-4 text-sm text-white">
        <Link
          className="bg-blue-500 px-4 py-2 rounded mr-2 hover:bg-blue-400"
          to={`/administration/categories-list/edit/${category.id}`}
        >
          Editar
        </Link>
        <button
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-400"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};
