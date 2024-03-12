import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      username: "",
      token: "",
      role: "",
      photo: "", 
      isLoginPage: true,
      updateUsername: (username) => set({ username }),
      updateToken: (token) => set({ token }),
      updateRole: (role) => set({ role }),
      updatePhoto: (photo) => set({ photo }),
      setIsLoginPage: (value) => set({ isLoginPage: value }),
    }),
    {
      name: "mystore",
      getStorage: () => createJSONStorage(() => sessionStorage),
    }
  )
);
