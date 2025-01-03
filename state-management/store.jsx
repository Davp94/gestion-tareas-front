import { create } from "zustand";

export const useStore = create((set) => ({
    proyecto: {},
    addProyecto: (proyecto) => set({ proyecto }),
    removeProyecto: () => set({ proyecto: {} }),
}))