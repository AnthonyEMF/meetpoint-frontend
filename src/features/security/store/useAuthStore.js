import { create } from "zustand";
import { loginAsync } from "../../../shared/actions/auth";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  message: "",
  error: false,

  // Iniciar Sesión
  login: async (form) => {
    const { status, data, message } = await loginAsync(form);

    if (status) {
      set({
        error: false,
        user: {
            email: data.email,
            tokenExpiration: data.tokenExpiration,
        },
        token: data.token,
        isAuthenticated: true,
        message: message
      });

      // Guardar información en LocalStorage
      localStorage.setItem('user', JSON.stringify(get().user ?? {}));
      localStorage.setItem('token', get().token);

      return;
    }

    // Si status es falso... 
    set({message: message, error: true});
    return;
  },

  // Cerrar Sesión
  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: false,
      message: "",
    });
    localStorage.clear();
  },
}));
