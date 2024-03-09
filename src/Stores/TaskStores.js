import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const taskStore = create(
  persist(
    (set) => ({
      tasks: [],
      taskCategories: [],
      updateTasks: (tasks) => set({ tasks }),
      addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
      editTask: (taskId, updatedTask) => set((state) => ({
        tasks: state.tasks.map(task => task.id === taskId ? updatedTask : task)
      })),
      editTaskState: (taskId, newState) => set((state) => ({
        tasks: state.tasks.map(task => task.id === taskId ? { ...task, state: newState } : task)
      })),
      removeTask: (taskId) => set((state) => ({ tasks: state.tasks.filter(task => task.id !== taskId) })),
      addTaskCategory: (category) => set((state) => ({ taskCategories: [...state.taskCategories, category] })),
      editTaskCategory: (categoryId, updatedCategory) => set((state) => ({
        taskCategories: state.taskCategories.map(cat => cat.id === categoryId ? updatedCategory : cat)
      })),
      removeTaskCategory: (categoryId) => set((state) => ({
        taskCategories: state.taskCategories.filter(cat => cat.id !== categoryId)
      })),
    }),
    {
      name: "taskStore",
      getStorage: () => createJSONStorage(() => sessionStorage),
    }
  )
);
