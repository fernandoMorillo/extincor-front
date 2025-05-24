import { create } from 'zustand';

export const useSessionStore = create((set) => ({
    user: null, // contiene { id, nombre, correo, rol }
    setUser: (user) => set({ user }),
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('correo');
        localStorage.removeItem('rol');
        set({ user: null });
    }
}));
