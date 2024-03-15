import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      username: "",
      updateUsername: (username) => set({ username }),
      token: "",
      updateToken: (token) => set({ token }),
      role: "",
      updateRole: (role) => set({ role }),
      photo: "",
      updatePhoto: (photo) => set({ photo }),
      isLoginPage: true,
      setIsLoginPage: (value) => set({ isLoginPage: value }),
      users: [],
      setUsers: (users) => set({ users }),
      deletedUsers: [],
      setDeletedUsers: (newDeletedUsers) => set({ deletedUsers: newDeletedUsers }),
      removeDeletedUser: (userId) => set((state) => ({ deletedUsers: state.deletedUsers.filter(user => user.id !== userId) })),
    }),
    {
      name: "mystore",
      getStorage: () => createJSONStorage(() => sessionStorage),
    }
  )
);
