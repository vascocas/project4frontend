import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

//define the store
export const userStore = create(
  persist(
    (set) => ({
      username: "", //state variable
      updateName: (username) => set({ username }), //function to update state variable
    }),
    {
      name: "mystore", // name to use for the persisted data
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
