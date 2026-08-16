const DEMO_USER = {
  id: 1,
  name: "Aysun",
  email: "user@gmail.com",
  password: "123456",
};

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

// Token 1 saat keçərlidir
const TOKEN_EXPIRATION = 60 * 60 * 1000;

// LOGIN
export const loginUser = async (email, password) => {
  // Mock API gecikməsi
  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  if (
    email !== DEMO_USER.email ||
    password !== DEMO_USER.password
  ) {
    throw new Error(
      "Email və ya şifrə yanlışdır."
    );
  }

  const token = `mock-token-${Date.now()}`;

  const user = {
    id: DEMO_USER.id,
    name: DEMO_USER.name,
    email: DEMO_USER.email,
  };

  // Token və user yadda saxlanılır
  localStorage.setItem(TOKEN_KEY, token);

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );

  return {
    token,
    user,
  };
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// TOKEN GÖTÜR
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// USER GÖTÜR
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

// TOKEN-IN MÜDDƏTİNİ YOXLA
export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  // Token bizim mock token formatında deyilsə
  if (!token.startsWith("mock-token-")) {
    return true;
  }

  const createdAt = Number(
    token.replace("mock-token-", "")
  );

  if (Number.isNaN(createdAt)) {
    return true;
  }

  return (
    Date.now() - createdAt >= TOKEN_EXPIRATION
  );
};

// MOCK 401 RESPONSE
export const validateToken = () => {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    const error = new Error(
      "Sessiyanın müddəti bitib. Yenidən login edin."
    );

    error.status = 401;

    throw error;
  }

  return true;
};

// AUTHENTICATION YOXLA
export const isAuthenticated = () => {
  const token = getToken();

  return Boolean(
    token && !isTokenExpired(token)
  );
};