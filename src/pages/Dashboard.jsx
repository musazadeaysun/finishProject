import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <section className="page">
      <h1>Dashboard</h1>

      <div className="dashboard-card">
        <h2>
          Xoş gəlmisən, {user?.name}! 👋
        </h2>

        <p>
          Email: {user?.email}
        </p>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </section>
  );
}

export default Dashboard;