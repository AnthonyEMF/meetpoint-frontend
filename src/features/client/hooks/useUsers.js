import { useState } from "react";
import { getUserById, createUserApi } from "../../../shared/actions/users/users";

export const useUsers = () => {
    //const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    //const [users, setUsers] = useState({});
    const [user, setUser] = useState({});

    // Cargar usuario por Id
    const loadUserById = async (id) => {
        const result = await getUserById(id);
        setUser(result);
    }

    // Crear usuario
    const createUser = async (userData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await createUserApi(userData);
            setUser(result);
        } catch(error) {
            setError(error)
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        // Properties
        user,
        isSubmitting,
        error,
        // Methods
        loadUserById,
        createUser,
    };
}