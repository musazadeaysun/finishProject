const API_URL = "http://localhost:3001/tasks";

export const getTasks = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Taskları yükləmək mümkün olmadı.");
  }

  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Task yaratmaq mümkün olmadı.");
  }

  return response.json();
};

export const updateTask = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Taskı yeniləmək mümkün olmadı.");
  }

  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Taskı silmək mümkün olmadı.");
  }

  return true;
};