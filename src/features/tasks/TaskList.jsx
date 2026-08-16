import { useState } from "react";
import { useTasks } from "./TaskContext";
import TaskItem from "./TaskItem";

function TaskList() {
  const {
    tasks,
    addTask,
    clearTasks,
  } = useTasks();

  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    addTask(trimmedTitle);
    setTitle("");
  };

  return (
    <div className="task-section">
      <form
        className="task-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Yeni task yaz..."
        />

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