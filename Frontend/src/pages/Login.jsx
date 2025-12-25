import { useState } from "react";
import API from "../Api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const username2 = username.trim();
    const password2 = password.trim();

    if (!username2) {
      return setError("Username is required");
    }
    if (!password2) {
      return setError("Password is required");
    }
   
    try {
      setLoading(true);

      const res = await API.post("api/auth/login", {
        username: username2,
        password: password2,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/products");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8"
      >
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to manage inventory
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* USERNAME */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className={`w-full py-2.5 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 hover:shadow-lg"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER LINK */}
        <p className="text-center mt-5 text-sm text-gray-600">
          New user?
          <Link
            to="/register"
            className="text-blue-600 ml-1 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
