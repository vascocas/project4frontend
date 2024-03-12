
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const taskStore = create(
  persist(
    (set) => ({
      taskId: null,
      setTaskId: (taskId) => set({ taskId }),
      taskUpdated: false, // New state variable to track task updates
      setTaskUpdated: (taskUpdated) => set({ taskUpdated }), // Function to update taskUpdated state
      categories: [], // Array to store categories
      setCategories: (categories) => set({ categories }), // Function to update categories
    }),
    {
      name: "myTaskStore",
      getStorage: () => createJSONStorage(() => sessionStorage),
    }
  )
);
