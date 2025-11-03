// import { useState,useContext } from "react";
// import { Link } from "react-router-dom";
// import instance from "./axios";
// import { useNavigate } from "react-router-dom";
// import { MyContext } from "./UseContext";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//     password: "",
//   });


//   const {userId,setId,userEmail,setUserEmail}=useContext(MyContext)

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//  let navigate=useNavigate()
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);
   
//     try {
//       console.log(formData.email)
//       const res = await instance.post("/profile/registration", formData, {withCredentials: true});
     
//       console.log("Register response:", res.data.user._id);
//       let userid= res.data.user._id
//       setUserEmail(formData.email)
//       setId(userid)
//       localStorage.setItem("userId", res.data.user._id);
//       setMessage(res.data.message || "Registration successful!");
    
//       setFormData({ fullName: "", username: "", email: "", password: "" });
//       navigate("/Dob")
//     } catch (error) {
//       console.error("Registration error:", error);
//       setMessage(error.response?.data?.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-[#8d8daa] via-[#dfdfde] to-[#f7f5f2]">
    

//       {/* Register Card */}
//       <div className="w-full max-w-sm border border-gray-200 bg-white rounded-lg p-8 shadow-lg">
//         <h1 className="text-4xl font-semibold text-center mb-6 text-gray-900 tracking-tight" style={{ fontFamily: 'Billabong, cursive' }}>
//           Instagram
//         </h1>

//         <p className="text-center text-gray-600 text-sm mb-6 font-medium">
//           Sign up to see photos and videos from your friends.
//         </p>

//         {message && (
//           <div
//             className={`text-center mb-4 text-sm px-4 py-2 rounded-md ${
//               message.includes("success") 
//                 ? "bg-green-50 text-green-700 border border-green-200" 
//                 : "bg-red-50 text-red-700 border border-red-200"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-2">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm transition-all"
//           />

//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm transition-all"
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm transition-all"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm transition-all"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#0095F6] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0084e6] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-sm hover:shadow-md"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Signing up...
//               </span>
//             ) : (
//               "Sign up"
//             )}
//           </button>
//         </form>

//         <div className="flex items-center my-6">
//           <div className="flex-1 border-t border-gray-300"></div>
//           <span className="px-4 text-xs text-gray-500 font-semibold">OR</span>
//           <div className="flex-1 border-t border-gray-300"></div>
//         </div>

//         <p className="text-xs text-center text-gray-500 leading-relaxed">
//           By signing up, you agree to our Terms, Data Policy and Cookies Policy.
//         </p>
//       </div>

//       {/* Login Box */}
//       <div className="w-full max-w-sm border border-gray-200 bg-white rounded-lg p-5 mt-4 text-center text-sm shadow-sm">
//         Have an account?{" "}
//         <Link to="/" className="text-[#0095F6] font-semibold hover:text-[#0084e6] transition-colors">
//           Log in
//         </Link>
//       </div>

//       {/* Footer */}
//       <div className="mt-8 text-xs text-gray-400 text-center">
//         <p>from Meta</p>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Loader2 } from "lucide-react";
import instance from "./axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./UseContext";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const { userId, setId, userEmail, setUserEmail } = useContext(MyContext);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      console.log(formData.email);
      const res = await instance.post("/profile/registration", formData, { withCredentials: true });

      console.log("Register response:", res.data.user._id);
      let userid = res.data.user._id;
      setUserEmail(formData.email);
      setId(userid);
      localStorage.setItem("userId", res.data.user._id);
      setMessage(res.data.message || "Registration successful!");

      setFormData({ fullName: "", username: "", email: "", password: "" });
      navigate("/Dob");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 p-5">
      {/* Register Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl"
      >
        {/* Instagram Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 rounded-2xl shadow-lg">
            <Instagram size={40} className="text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
          Connect Hub
        </h1>

        <p className="text-center text-gray-600 text-sm mb-6 font-medium px-4">
          Sign up to see photos and videos from your friends.
        </p>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center mb-4 text-sm px-4 py-3 rounded-xl font-medium ${
              message.includes("success")
                ? "bg-green-50 text-green-700 border-2 border-green-200"
                : "bg-red-50 text-red-700 border-2 border-red-200"
            }`}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 text-sm font-medium transition-all placeholder:text-gray-400"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 text-sm font-medium transition-all placeholder:text-gray-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 text-sm font-medium transition-all placeholder:text-gray-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 text-sm font-medium transition-all placeholder:text-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-4 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Signing up...
              </span>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-xs text-gray-500 font-bold uppercase tracking-wider">
            OR
          </span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <p className="text-xs text-center text-gray-500 leading-relaxed px-2">
          By signing up, you agree to our{" "}
          <span className="font-semibold text-gray-700">Terms</span>,{" "}
          <span className="font-semibold text-gray-700">Data Policy</span> and{" "}
          <span className="font-semibold text-gray-700">Cookies Policy</span>.
        </p>
      </motion.div>

      {/* Login Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md bg-white rounded-2xl p-5 mt-4 text-center text-sm shadow-lg"
      >
        <span className="text-gray-600">Have an account?</span>{" "}
        <Link
          to="/"
          className="text-purple-600 font-bold hover:text-purple-700 transition-colors"
        >
          Log in
        </Link>
      </motion.div>

      {/* Footer */}
      <div className="mt-6 text-xs text-white/80 text-center font-medium">
        <p>from Meta</p>
      </div>
    </div>
  );
};

export default Register;
