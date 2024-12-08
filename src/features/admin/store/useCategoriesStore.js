import { create } from "zustand";

export const useCategoriesStore = create((set) => ({
    selectedCategory: {},
    categoriesData: {
        hasNextPage: false,
        hasPreviousPage: false,
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        items: []
    },

    //Cargar todas las categorias
    loadData: async (searchTerm = "", page = 1) => {
        const result = await getCategoriesPaginationAsync(searchTerm, page);

        if (result.status) {
            set({categoriesData: result.data});
            return;
        }

        set({categoriesData: null});
        return;
    },

    // Cargar categoría por id
    getCategory: async (id) => {
        const result = await getCategoryByIdAsync(id);

        if (result.status) {
            set({ selectedCategory: result.data });
        } else {
            set({ selectedCategory: null });
        }
    },

    // Editar categoría
    editCategory: async (id, form) => {
        const result = await editCategoryAsync(id, form);

        if (result.status) {
            const updatedCategories = get().categoriesData.items.map((category) =>
                category.id === id ? { ...category, ...result.data } : category
            );

            set((state) => ({
                categoriesData: {
                    ...state.categoriesData,
                    items: updatedCategories
                },
                selectedCategory: result.data
            }));
        } else {
            throw new Error("Error al editar la categoría");
        }
    },

    // Crear categoría 
    createCategory: async (form) => {
        const result = await createCategoryAsync(form);

        if (result.status) {
            set({categoriesData: result.data});
            return;
        }

        set({categoriesData: null});
        return;
    },

    // Eliminar categoría
    deleteCategory: async (id) => {
        const result = await deleteCategoryAsync(id);

        if (result.status) {
            set({categoriesData: result.data});
            return;
        }

        set({categoriesData: null});
        return;
    },
}))