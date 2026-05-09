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

          // support both structures
          user: data.user || {
            role: data.role,
            email: data.email,
            username: data.username,
          },
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
        });

        localStorage.clear();
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default authStore;
