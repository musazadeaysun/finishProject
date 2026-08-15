const API_BASE_URL = "http://localhost:3000";

export async function fetchTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error("Unable to fetch tasks");
  }

  return response.json();
}

export async function addTask(task) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Unable to add task");
  }

  return response.json();
}
