import { useForm } from "react-hook-form";

import { useTasks } from "./TaskContext";
import TaskItem from "./TaskItem";

function TaskList() {
  const {
    tasks,
    addTask,
    clearError,
    error,
    loading,
  } = useTasks();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const handleTaskSubmit = async (data) => {
    await addTask(data.title.trim());

    reset();
  };

  if (loading) {
    return (
      <div className="task-section">
        <p>Tasklar yüklənir...</p>
      </div>
    );
  }

  return (
    <div className="task-section">
      {error && (
        <div className="api-error">
          {error}

          <button
            type="button"
            onClick={clearError}
          >
            ×
          </button>
        </div>
      )}

      <form
        className="task-form"
        onSubmit={handleSubmit(handleTaskSubmit)}
        noValidate
      >
        <div className="task-input-wrapper">
          <input
            type="text"
            placeholder="Yeni task yaz..."
            maxLength={100}
            {...register("title", {
              required: "Task adı boş ola bilməz.",
              validate: (value) => {
                const trimmedValue =
                  value.trim();

                if (trimmedValue.length < 3) {
                  return "Task adı ən azı 3 simvoldan ibarət olmalıdır.";
                }

                return true;
              },
            })}
          />

          {errors.title && (
            <p className="field-error">
              {errors.title.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Əlavə olunur..." : "Əlavə et"}
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-message">
          Hələ heç bir task yoxdur.
        </p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;