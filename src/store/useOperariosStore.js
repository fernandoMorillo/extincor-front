
import { create } from "zustand";
import apiOperarios from "../utils/axiosConfig.js";

const useOperariosStore = create((set) => ({
    operarios: [],
    cargarOperarios: async () => {
        try {
            const response = await apiOperarios.get("/operarios",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            set({ operarios: response.data });
        } catch (error) {
            console.error("Error cargando operarios", error);
        }
    },
}));

export default useOperariosStore;
