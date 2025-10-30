import { useState } from "react";
import { Link } from "react-router-dom";
import instance from "./axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await instance.post("/profile/login", formData);
      console.log("Login response:", res.data);

      if (res.status === 200) {
        setFormData({ email: "", password: "" });
        alert("Login successful 🎉");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      {/* Login Card */}
      <div className="w-full max-w-sm border border-gray-300 bg-white rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 font-sans">
          Instagram
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50 text-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50 text-sm"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0095F6] text-white py-2 rounded-md font-semibold hover:bg-[#1877F2] transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="flex items-center justify-between my-3">
            <hr className="w-1/3 border-gray-300" />
            <span className="text-xs text-gray-400">OR</span>
            <hr className="w-1/3 border-gray-300" />
          </div>

          <button
            type="button"
            className="text-sm text-blue-900 font-medium w-full hover:underline"
          >
            Log in with Facebook
          </button>

          <a
            href="#"
            className="block text-xs text-center text-blue-900 mt-2 hover:underline"
          >
            Forgot password?
          </a>
        </form>
      </div>

      {/* Signup Box */}
      <div className="w-full max-w-sm border border-gray-300 bg-white rounded-lg p-5 mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="text-[#0095F6] font-medium hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
