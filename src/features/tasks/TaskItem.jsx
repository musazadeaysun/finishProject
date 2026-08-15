function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.done ? "done" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.title}</span>
      </label>
      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
