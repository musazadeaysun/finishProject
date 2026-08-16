import {
  createContext,
  useContext,
  useReducer,
} from "react";

import { taskReducer } from "./taskReducer";

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
};

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialState
  );

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
  };

  const deleteTask = (id) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  const toggleTask = (id) => {
    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    });
  };

  const updateTask = (id, title) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id,
        title,
      },
    });
  };

  const clearTasks = () => {
    dispatch({
      type: "CLEAR_TASKS",
    });
  };

  const value = {
    tasks: state.tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    clearTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTasks TaskProvider daxilində istifadə olunmalıdır."
    );
  }

  return context;
}