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

  const handleUpdate = () => {
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    updateTask(task.id, trimmedTitle);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(event) =>
            setEditTitle(event.target.value)
          }
        />
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
          <button onClick={handleUpdate}>
            Yadda saxla
          </button>
        ) : (
          <button
            onClick={() =>
              setIsEditing(true)
            }
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