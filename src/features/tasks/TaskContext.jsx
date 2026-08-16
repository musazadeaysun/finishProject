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

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
};

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialState
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const tasks = await getTasks();

        dispatch({
          type: "SET_TASKS",
          payload: tasks,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

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
      const createdTask = await createTask(newTask);

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

      setError(error.message);
    }
  };

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
      await deleteTask(id);
    } catch (error) {
      // Rollback
      if (previousTask) {
        dispatch({
          type: "ADD_TASK",
          payload: previousTask,
        });
      }

      setError(error.message);
    }
  };

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
      await updateTask(id, {
        completed: updatedTask.completed,
      });
    } catch (error) {
      // Rollback
      dispatch({
        type: "REPLACE_TASK",
        payload: previousTask,
      });

      setError(error.message);
    }
  };

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
      await updateTask(id, {
        title,
      });
    } catch (error) {
      // Rollback
      dispatch({
        type: "REPLACE_TASK",
        payload: previousTask,
      });

      setError(error.message);
    }
  };

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