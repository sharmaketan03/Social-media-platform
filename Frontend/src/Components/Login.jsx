// import { useState } from "react";
// import { Link } from "react-router-dom";
// import sideimg from "../assets/pngegg.jpg";
// import instance from "./axios";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await instance.post("/profile/login", formData);
//       console.log("Login response:", res.data);

//       if (res.status === 200) {
//         setFormData({ email: "", password: "" });
//         alert("Login successful 🎉");
//       } else {
//         setError("Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong! Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#6bd5e1] via-[#ffd98e] to-[#ffb677] overflow-hidden">
//       {/* Background Decorative Glow */}
//       <div className="absolute inset-0 backdrop-blur-[120px] bg-white/10 z-0"></div>

//       <div className="relative z-10 flex flex-col md:flex-row  justify-center w-[90%] md:w-[80%] bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
//         {/* Left Section - Image */}
//         <div className="hidden md:flex md:w-1/2 justify-center items-center bg-gradient-to-br from-blue-600/20 to-purple-600/20">
//           <img
//             src={sideimg}
//             alt="ConnectHub"
//             className="w-3/4 transition-transform duration-700 hover:scale-105 drop-shadow-2xl"
//           />
//         </div>

//         {/* Right Section - Login Form */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center  p-10">
//           <div className="w-full max-w-sm bg-gradient-to-bl from-[#377d71] via-[#fbc5c5] to-[#fba1a1] rounded-2xl p-8 shadow-lg backdrop-blur-sm">
//             <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 font-sans">
//               Welcome Back 👋
//             </h1>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-sm"
//               />

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-sm"
//               />

//               {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300 disabled:opacity-70"
//               >
//                 {loading ? "Logging in..." : "Log in"}
//               </button>

//               <div className="flex items-center justify-between my-4">
//                 <hr className="w-1/3 border-gray-300" />
//                 <span className="text-xs text-gray-400">OR</span>
//                 <hr className="w-1/3 border-gray-300" />
//               </div>

//               <button
//                 type="button"
//                 className="w-full text-sm text-blue-800 font-medium hover:underline flex items-center justify-center space-x-2"
//               >
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
//                   alt="Facebook"
//                   className="w-4 h-4"
//                 />
//                 <span>Log in with Facebook</span>
//               </button>

//               <a
//                 href="#"
//                 className="block text-xs text-center text-blue-900 mt-3 hover:underline"
//               >
//                 Forgot password?
//               </a>
//             </form>
//           </div>

//           {/* Signup Box */}
//           <div className="w-full max-w-sm bg-white/80 rounded-2xl p-5 mt-4 text-center text-sm shadow-md">
//             Don’t have an account?{" "}
//             <Link to="/register" className="text-indigo-600 font-medium hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sideimg from "../assets/pngegg.jpg";
import instance from "./axios";

const floatingTexts = ["Connect with Friends", "Share Moments", "Explore Reels", "Chat in Real-Time", "Inspire & Create"]; 

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [floatIndex, setFloatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatIndex((i) => (i + 1) % floatingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await instance.post("/profile/login", formData);
      if (res.status === 200) {
        setFormData({ email: "", password: "" });
        alert("Login successful 🎉");
      } else setError("Invalid credentials. Try again.");
    } catch {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden bg-gradient-to-b from-[#8d8daa] via-[#dfdfde] to-[#f7f5f2]">
      {/* LEFT IMAGE 70% */}
     <div
  className="w-[60%] relative hidden md:flex items-center justify-center overflow-hidden bg-cover bg-center"
  
>

        {/* floating text */}
        <div className="absolute text-white text-3xl font-bold animate-fadeSlide">
          {floatingTexts[floatIndex]}
        </div>
      </div>

      {/* RIGHT FORM 30% */}
      <div className="w-full md:w-[40%] flex flex-col justify-center items-center p-6 ">
        <div className="w-full max-w-sm rounded-2xl p-8 shadow-lg bg-white/90">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">ConnectHub</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md bg-gray-50 text-sm" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md bg-gray-50 text-sm" />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition">{loading ? "Logging in..." : "Log in"}</button>
          </form>

          <div className="text-center text-sm mt-5">
            Don't have an account? <Link to="/register" className="text-indigo-600 font-medium">Sign up</Link>
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes fadeSlide {
          0% { opacity:0; transform:translateY(20px); }
          50% { opacity:1; transform:translateY(0); }
          100% { opacity:0; transform:translateY(-20px); }
        }
        .animate-fadeSlide {
          animation: fadeSlide 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}