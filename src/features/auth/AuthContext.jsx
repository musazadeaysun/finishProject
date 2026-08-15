import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getStoredUser,
  getToken,
  loginUser,
  logoutUser,
} from "./authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getStoredUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const logout = () => {
    logoutUser();

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth AuthProvider daxilində istifadə olunmalıdır."
    );
  }

  return context;
}