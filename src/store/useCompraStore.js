import { create } from "zustand";
import apiCompras from "../utils/axiosConfig.js";

export const useCompraStore = create((set) => ({
  compras: [],
  proveedores: [],
  insumos: [],

  cargarCompras: async () => {
    const res = await apiCompras.get("/compras", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res?.data;
    set({ compras: data });
  },

  registrarCompra: async (nuevaCompra) => {
    try {
      const res = await apiCompras.post("/compras", nuevaCompra, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res?.data;
      set((state) => ({ compras: [...state.compras, data] }));
      return { ok: true }; // ← éxito
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Error al registrar la compra";
      return { ok: false, error: msg }; // ← error
    }
  },

  cargarInsumos: async () => {
    const res = await apiCompras.get("/insumos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.data;
    set({ insumos: data });
  },
}));
