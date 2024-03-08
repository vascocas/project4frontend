import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      username: "",
      token: "",
      updateName: (username) => set({ username }),
      updateToken: (token) => set({ token }),
    }),
    {
      name: "mystore",
      getStorage: () => createJSONStorage(() => sessionStorage),
    }
  )
);
