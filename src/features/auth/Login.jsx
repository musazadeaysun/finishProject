import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();

    if (!trimmedName || !formData.password.trim()) {
      setError("Please enter a name and password.");
      return;
    }

    login({
      name: trimmedName,
      email: `${trimmedName.toLowerCase()}@taskmanager.dev`,
    });
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Task Manager</p>
        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
