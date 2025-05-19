import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Chattrix-theme") || "dracula",
  setTheme: (theme) => {
    localStorage.setItem("Chattrix-theme", theme);
    set({ theme });
  },
}));
