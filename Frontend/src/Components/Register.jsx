import { useState } from "react";
import { Link } from "react-router-dom";
import instance from "./axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
 let navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
   
    try {
      const res = await instance.post("/profile/registration", formData, {withCredentials: true});
      console.log(formData)
      console.log("Register response:", res.data);
      setMessage(res.data.message || "Registration successful!");
      setFormData({ fullName: "", username: "", email: "", password: "" });
      navigate("/")
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4">
      {/* Register Card */}
      <div className="w-full max-w-sm border border-gray-200 bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-semibold text-center mb-6 text-gray-900 tracking-tight" style={{ fontFamily: 'Billabong, cursive' }}>
          Instagram
        </h1>

        <p className="text-center text-gray-600 text-sm mb-6 font-medium">
          Sign up to see photos and videos from your friends.
        </p>

        {message && (
          <div
            className={`text-center mb-4 text-sm px-4 py-2 rounded-md ${
              message.includes("success") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm transition-all"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0095F6] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0084e6] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-sm hover:shadow-md"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up...
              </span>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-xs text-gray-500 font-semibold">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <p className="text-xs text-center text-gray-500 leading-relaxed">
          By signing up, you agree to our Terms, Data Policy and Cookies Policy.
        </p>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-sm border border-gray-200 bg-white rounded-lg p-5 mt-4 text-center text-sm shadow-sm">
        Have an account?{" "}
        <Link to="/" className="text-[#0095F6] font-semibold hover:text-[#0084e6] transition-colors">
          Log in
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-gray-400 text-center">
        <p>from Meta</p>
      </div>
    </div>
  );
};

export default Register;