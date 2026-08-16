import { useState } from "react";

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

  const [title, setTitle] = useState("");
  const [validationError, setValidationError] =
    useState("");

  const validateTitle = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Task adı boş ola bilməz.";
    }

    if (trimmedValue.length < 3) {
      return "Task adı ən azı 3 simvoldan ibarət olmalıdır.";
    }

    if (trimmedValue.length > 100) {
      return "Task adı maksimum 100 simvol ola bilər.";
    }

    return "";
  };

  const handleChange = (event) => {
    const value = event.target.value;

    setTitle(value);

    if (validationError) {
      setValidationError(
        validateTitle(value)
      );
    }

    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorMessage =
      validateTitle(title);

    if (errorMessage) {
      setValidationError(errorMessage);
      return;
    }

    await addTask(title.trim());

    setTitle("");
    setValidationError("");
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
        </div>
      )}

      <form
        className="task-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="task-input-wrapper">
          <input
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Yeni task yaz..."
            maxLength={100}
            aria-invalid={Boolean(
              validationError
            )}
          />

          {validationError && (
            <p className="field-error">
              {validationError}
            </p>
          )}
        </div>

        <button type="submit">
          Əlavə et
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-message">
          Hələ heç bir task yoxdur.
        </p>
      ) : (
        <>
          <div className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TaskList;