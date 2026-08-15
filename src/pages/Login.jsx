import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");

    navigate("/dashboard");
  };

  return (
    <section className="page">
      <h1>Login</h1>

      <p>Hələlik mock login istifadə olunur.</p>

      <button onClick={handleLogin}>
        Login
      </button>
    </section>
  );
}

export default Login;