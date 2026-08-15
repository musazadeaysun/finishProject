const STORAGE_KEY = "task-manager-tasks";

function readTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [
      { id: 1, title: "Prepare sprint plan", done: false },
      { id: 2, title: "Review design mockups", done: true },
      { id: 3, title: "Write release notes", done: false },
    ];
  }

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function getTasks() {
  return readTasks();
}

export function createTask(title) {
  const tasks = readTasks();
  const task = {
    id: Date.now(),
    title,
    done: false,
  };

  const nextTasks = [...tasks, task];
  writeTasks(nextTasks);
  return task;
}

export function toggleTask(id) {
  const tasks = readTasks();
  const nextTasks = tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task,
  );

  writeTasks(nextTasks);
  return nextTasks;
}

export function deleteTask(id) {
  const tasks = readTasks();
  const nextTasks = tasks.filter((task) => task.id !== id);
  writeTasks(nextTasks);
  return nextTasks;
}
