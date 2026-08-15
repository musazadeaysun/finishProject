import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import authReducer from "./authReducer";

const AuthContext = createContext(null);

function getStoredUser() {
  const saved = localStorage.getItem("task-manager-user");

  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: getStoredUser(),
    isAuthenticated: Boolean(getStoredUser()),
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("task-manager-user", JSON.stringify(state.user));
      return;
    }

    localStorage.removeItem("task-manager-user");
  }, [state.user]);

  const value = useMemo(
    () => ({
      ...state,
      login: (user) => dispatch({ type: "LOGIN", payload: user }),
      logout: () => dispatch({ type: "LOGOUT" }),
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export default AuthContext;
