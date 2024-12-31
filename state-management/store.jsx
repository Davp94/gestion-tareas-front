import { create } from "zustand";

const useStore = create((set) => ({
    proyecto: {},
    addProyecto: (proyecto) => set({ proyecto: proyecto }),
    removeProyecto: () => set({ proyecto: {} }),
}))