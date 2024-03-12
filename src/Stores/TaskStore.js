
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const taskStore = create(
  persist(
    (set) => ({
      taskId: null,
      setTaskId: (taskId) => set({ taskId }),
      taskUpdated: false,
      setTaskUpdated: (taskUpdated) => set({ taskUpdated }),
      categories: [],
      setCategories: (categories) => {
        console.log("Updating categories:", categories); // Add this line
        set({ categories });
      },
    }),
    {
      name: "myTaskStore",
      getStorage: () => createJSONStorage(() => sessionStorage),
    }
  )
);

