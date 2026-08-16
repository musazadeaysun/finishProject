import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getStoredUser,
  getToken,
  loginUser,
  logoutUser,
  isTokenExpired,
} from "./authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refresh zamanı session-u bərpa et
  useEffect(() => {
    const restoreSession = () => {
      const storedToken = getToken();
      const storedUser = getStoredUser();

      // Token və user yoxdursa
      if (!storedToken || !storedUser) {
        setLoading(false);
        return;
      }

      // Token-in vaxtı bitibsə
      if (isTokenExpired(storedToken)) {
        logoutUser();

        setToken(null);
        setUser(null);
        setLoading(false);

        return;
      }

      // Token keçərlidirsə
      setToken(storedToken);
      setUser(storedUser);

      setLoading(false);
    };

    restoreSession();
  }, []);

  // LOGIN
  const login = useCallback(
    async (email, password) => {
      const data = await loginUser(
        email,
        password
      );

      setToken(data.token);
      setUser(data.user);

      return data;
    },
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    logoutUser();

    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,

    // Token varsa authenticated-dir
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