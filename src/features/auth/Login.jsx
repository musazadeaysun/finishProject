import { useForm } from "react-hook-form";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "./AuthContext";

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname ||
    "/dashboard";

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(
        data.email,
        data.password
      );

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error.message ||
          "Email və ya şifrə yanlışdır.",
      });
    }
  };

  return (
    <section className="page">
      <div className="auth-card">
        <h1>Login</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* EMAIL */}
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="user@gmail.com"
              autoComplete="email"
              {...register("email", {
                required:
                  "Email daxil edin.",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Düzgün email ünvanı daxil edin.",
                },
              })}
            />

            {errors.email && (
              <p className="field-error">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label htmlFor="password">
              Şifrə
            </label>

            <input
              id="password"
              type="password"
              placeholder="123456"
              autoComplete="current-password"
              {...register("password", {
                required:
                  "Şifrə daxil edin.",
                minLength: {
                  value: 6,
                  message:
                    "Şifrə ən azı 6 simvol olmalıdır.",
                },
              })}
            />

            {errors.password && (
              <p className="field-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* SERVER ERROR */}
          {errors.root && (
            <p className="error-message">
              {errors.root.message}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Daxil olunur..."
              : "Login"}
          </button>
        </form>

        {/* DEMO ACCOUNT */}
        <div className="demo-info">
          <p>
            <strong>
              Demo hesab:
            </strong>
          </p>

          <p>
            Email: user@gmail.com
          </p>

          <p>
            Şifrə: 123456
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;