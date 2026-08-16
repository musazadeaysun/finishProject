import { useState } from "react";

import { useTasks } from "./TaskContext";

function TaskItem({ task }) {
  const {
    deleteTask,
    toggleTask,
    updateTask,
  } = useTasks();

  const [isEditing, setIsEditing] =
    useState(false);

  const [editTitle, setEditTitle] =
    useState(task.title);

  const [error, setError] =
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

    setEditTitle(value);

    if (error) {
      setError(validateTitle(value));
    }
  };

  const handleUpdate = async () => {
    const validationError =
      validateTitle(editTitle);

    if (validationError) {
      setError(validationError);
      return;
    }

    await updateTask(
      task.id,
      editTitle.trim()
    );

    setError("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setError("");
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div className="edit-wrapper">
          <input
            type="text"
            value={editTitle}
            onChange={handleChange}
            maxLength={100}
          />

          {error && (
            <p className="field-error">
              {error}
            </p>
          )}
        </div>
      ) : (
        <span
          className={
            task.completed
              ? "task-title completed"
              : "task-title"
          }
          onClick={() =>
            toggleTask(task.id)
          }
        >
          {task.title}
        </span>
      )}

      <div className="task-actions">
        {isEditing ? (
          <>
            <button onClick={handleUpdate}>
              Yadda saxla
            </button>

            <button onClick={handleCancel}>
              Ləğv et
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setEditTitle(task.title);
              setError("");
              setIsEditing(true);
            }}
          >
            Redaktə
          </button>
        )}

        <button
          onClick={() =>
            deleteTask(task.id)
          }
        >
          Sil
        </button>
      </div>
    </div>
  );
}

export default TaskItem;