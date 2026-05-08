import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (data) => {
        set({
          token: data.token,
          user: data.user,
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
        });
        localStorage.clear(); // Safety clear
      },
    }),
    {
      name: "auth-storage", // Unique name for the item in localStorage
    },
  ),
);

export default authStore;
