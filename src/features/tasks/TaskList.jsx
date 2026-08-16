import { useState } from "react";
import { useTasks } from "./TaskContext";
import TaskItem from "./TaskItem";

function TaskList() {
  const { tasks, addTask, clearTasks } = useTasks();

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

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

    if (error) {
      setError(validateTitle(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateTitle(title);

    if (validationError) {
      setError(validationError);
      return;
    }

    addTask(title.trim());

    setTitle("");
    setError("");
  };

  return (
    <div className="task-section">
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
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? "task-error" : undefined
            }
          />

          {error && (
            <p
              id="task-error"
              className="field-error"
            >
              {error}
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

          <button
            className="clear-button"
            onClick={clearTasks}
          >
            Bütün taskları sil
          </button>
        </>
      )}
    </div>
  );
}

export default TaskList;