import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { taskReducer } from "./taskReducer";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./taskService";

import { useAuth } from "../auth/AuthContext";
import { validateToken } from "../auth/authService";

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
};

export function TaskProvider({ children }) {
  const { logout, isAuthenticated } = useAuth();

  const [state, dispatch] = useReducer(
    taskReducer,
    initialState
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // TASKLARI YÜKLƏ
  useEffect(() => {
    // Login olmayıbsa API çağırma
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const loadTasks = async () => {
      try {
        setLoading(true);
        setError("");

        // Token-i yoxla
        validateToken();

        const tasks = await getTasks();

        dispatch({
          type: "SET_TASKS",
          payload: tasks,
        });
      } catch (error) {
        // Token expired / 401
        if (error.status === 401) {
          logout();
          return;
        }

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [isAuthenticated, logout]);

  // TASK ƏLAVƏ ET
  const addTask = async (title) => {
    const temporaryId = `temp-${Date.now()}`;

    const newTask = {
      id: temporaryId,
      title,
      completed: false,
    };

    // Optimistic UI
    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });

    try {
      // Token yoxla
      validateToken();

      const createdTask =
        await createTask(newTask);

      // Server-dən gələn task ilə temporary task-i dəyiş
      dispatch({
        type: "UPDATE_TASK_FROM_SERVER",
        payload: {
          temporaryId,
          task: createdTask,
        },
      });
    } catch (error) {
      // Rollback
      dispatch({
        type: "DELETE_TASK",
        payload: temporaryId,
      });

      // 401
      if (error.status === 401) {
        logout();
        return;
      }

      setError(error.message);
    }
  };

  // TASK SİL
  const deleteTaskById = async (id) => {
    const previousTask = state.tasks.find(
      (task) => task.id === id
    );

    // Optimistic UI
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });

    try {
      // Token yoxla
      validateToken();

      await deleteTask(id);
    } catch (error) {
      // Rollback
      if (previousTask) {
        dispatch({
          type: "ADD_TASK",
          payload: previousTask,
        });
      }

      // 401
      if (error.status === 401) {
        logout();
        return;
      }

      setError(error.message);
    }
  };

  // TASK STATUS DƏYİŞ
  const toggleTask = async (id) => {
    const previousTask = state.tasks.find(
      (task) => task.id === id
    );

    if (!previousTask) {
      return;
    }

    const updatedTask = {
      ...previousTask,
      completed: !previousTask.completed,
    };

    // Optimistic UI
    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    });

    try {
      // Token yoxla
      validateToken();

      await updateTask(id, {
        completed: updatedTask.completed,
      });
    } catch (error) {
      // Rollback
      dispatch({
        type: "REPLACE_TASK",
        payload: previousTask,
      });

      // 401
      if (error.status === 401) {
        logout();
        return;
      }

      setError(error.message);
    }
  };

  // TASK REDAKTƏ ET
  const updateTaskById = async (id, title) => {
    const previousTask = state.tasks.find(
      (task) => task.id === id
    );

    if (!previousTask) {
      return;
    }

    // Optimistic UI
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id,
        title,
      },
    });

    try {
      // Token yoxla
      validateToken();

      await updateTask(id, {
        title,
      });
    } catch (error) {
      // Rollback
      dispatch({
        type: "REPLACE_TASK",
        payload: previousTask,
      });

      // 401
      if (error.status === 401) {
        logout();
        return;
      }

      setError(error.message);
    }
  };

  // ERROR TƏMİZLƏ
  const clearError = () => {
    setError("");
  };

  const value = {
    tasks: state.tasks,
    loading,
    error,

    addTask,
    deleteTask: deleteTaskById,
    toggleTask,
    updateTask: updateTaskById,

    clearError,
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