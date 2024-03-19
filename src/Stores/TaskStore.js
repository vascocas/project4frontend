import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const taskStore = create(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (newTasks) => set({ tasks: newTasks }),
      addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
      deleteTask: (taskId) => set((state) => ({ tasks: state.tasks.filter(task => task.id !== taskId) })),
      updateTask: (updatedTask) => set((state) => ({tasks: state.tasks.map(task => task.id === updatedTask.id ? updatedTask : task)})),
      deletedTasks: [],
      setDeletedTasks: (deletedTasks) => set({ deletedTasks }),
      restoreTask: (taskId) => set((state) => ({
        deletedTasks: state.deletedTasks.filter(task => task.id !== taskId)
      })),
      removeTask: (taskId) => set((state) => ({
        deletedTasks: state.deletedTasks.filter(task => task.id !== taskId)
      })),
      categories: [],
      setCategories: (categories) => set({ categories }),
      taskId: null,
      setTaskId: (taskId) => set({ taskId }),     
    }),
    {
      name: "myTaskStore",
      getStorage: () => createJSONStorage(() => sessionStorage),
    }
  )
);
