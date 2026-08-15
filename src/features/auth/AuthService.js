const DEMO_USER = {
  id: 1,
  name: "Aysun",
  email: "user@gmail.com",
  password: "123456",
};

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export const loginUser = async (email, password) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (
    email !== DEMO_USER.email ||
    password !== DEMO_USER.password
  ) {
    throw new Error("Email və ya şifrə yanlışdır.");
  }

  const token = `mock-token-${Date.now()}`;

  const user = {
    id: DEMO_USER.id,
    name: DEMO_USER.name,
    email: DEMO_USER.email,
  };

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return {
    token,
    user,
  };
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getStoredUser = () => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};