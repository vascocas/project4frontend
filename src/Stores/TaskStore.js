
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const taskStore = create(
  persist(
    (set) => ({
      taskId: null,
      taskUpdated: false, // New state variable to track task updates
      setTaskId: (taskId) => set({ taskId }),
      setTaskUpdated: (taskUpdated) => set({ taskUpdated }), // Function to update taskUpdated state
    }),
    {
      name: "myTaskStore",
      getStorage: () => createJSONStorage(() => sessionStorage),
    }
  )
);
