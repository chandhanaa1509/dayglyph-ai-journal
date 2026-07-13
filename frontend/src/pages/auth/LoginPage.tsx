import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../services/authService";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await login({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "userName",
        response.name
      );

      localStorage.setItem(
        "userEmail",
        response.email
      );

      navigate("/");

    } catch (error: any) {

      alert(
        error?.response?.data?.message ??
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-[#FFF8F0]">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="mb-2 text-center text-4xl font-bold text-purple-700">
          🌸 DayGlyph
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Welcome Back
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full rounded-xl border p-3 outline-none focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="w-full rounded-xl border p-3 outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:opacity-60"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-purple-700"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default LoginPage;