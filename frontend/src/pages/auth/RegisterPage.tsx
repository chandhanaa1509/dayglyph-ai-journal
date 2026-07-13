import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../services/authService";

function RegisterPage() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await register({
        name,
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
        "Registration failed."
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
          Create your account
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            className="w-full rounded-xl border p-3 outline-none focus:border-purple-500"
          />

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
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-purple-700"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default RegisterPage;