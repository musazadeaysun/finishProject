import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    onAdd(trimmed);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a new task"
        aria-label="Task title"
      />
      <button type="submit" className="primary-btn">
        Add task
      </button>
    </form>
  );
}

export default TaskForm;
