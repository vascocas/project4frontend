import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      username: "",
      token: "",
      role: "",
      photo: "",
      users: [],
      isLoginPage: true,
      updateUsername: (username) => set({ username }),
      updateToken: (token) => set({ token }),
      updateRole: (role) => set({ role }),
      updatePhoto: (photo) => set({ photo }),
      setIsLoginPage: (value) => set({ isLoginPage: value }),
      deletedUsers: [],
      setDeletedUsers: (newDeletedUsers) => set({ deletedUsers: newDeletedUsers }),
      removeDeletedUser: (userId) =>
        set((state) => ({ deletedUsers: state.deletedUsers.filter(user => user.id !== userId) })),
      setUsers: (users) => set({ users }),
    }),
    {
      name: "mystore",
      getStorage: () => createJSONStorage(() => sessionStorage),
    }
  )
);
