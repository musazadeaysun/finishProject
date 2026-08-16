import { useNavigate } from "react-router-dom";

import { useAuth } from "../features/auth/AuthContext";
import TaskList from "../features/tasks/TaskList";

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
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Xoş gəlmisən, {user?.name}! 👋
          </p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <TaskList />
    </section>
  );
}

export default Dashboard;