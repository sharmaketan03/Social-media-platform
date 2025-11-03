// import { useState, useContext } from "react";
// import { motion } from "framer-motion";
// import instance from "./axios";
// import { MyContext } from "./UseContext";
// import { useNavigate } from "react-router-dom";

// const EmailVerification = () => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [shake, setShake] = useState(false);
//   const { userEmail } = useContext(MyContext);
//   const navigate = useNavigate();

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     if (!otp) return alert("Enter OTP");
//      console.log(otp,userEmail)
//     try {
//       setLoading(true);

//       await instance.post(
//         "/profile/verifysendEmail-otp",
//         { email: userEmail, otp },
//         { withCredentials: true }
//       );
    
//       navigate("/profile-Picture-update");
//     } catch (err) {
//       setShake(true);
//       setTimeout(() => setShake(false), 400);
//       alert("Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.4 }}
//         className="bg-white p-8 shadow-lg rounded-xl w-[380px] text-center"
//       >
//         <h2 className="text-xl font-bold mb-2">Verify Email</h2>
//         <p className="text-gray-500 text-sm mb-4">
//           OTP sent to <span className="font-semibold">{userEmail}</span>
//         </p>

//         <form onSubmit={handleOtpSubmit} className="space-y-4">
//           <motion.input
//             animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
//             transition={{ duration: 0.3 }}
//             type="text"
//             maxLength="6"
//             placeholder="Enter OTP"
//             className="border w-full rounded-md p-3 text-center text-lg tracking-widest font-semibold outline-none focus:ring-2 focus:ring-blue-400"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />

//           <button
//             disabled={loading}
//             className="bg-indigo-600 w-full py-2 text-white rounded-md font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default EmailVerification;
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import instance from "./axios";
import { MyContext } from "./UseContext";
import { useNavigate } from "react-router-dom";
import { Mail, Shield } from "lucide-react";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const { userEmail } = useContext(MyContext);
  const navigate = useNavigate();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return alert("Enter OTP");
    console.log(otp, userEmail);
    try {
      setLoading(true);

      await instance.post(
        "/profile/verifysendEmail-otp",
        { email: userEmail, otp },
        { withCredentials: true }
      );

      navigate("/profile-Picture-update");
    } catch (err) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 p-5">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-12 shadow-2xl rounded-3xl w-full max-w-md text-center"
      >
        {/* Icon Header */}
        <div className="inline-flex p-5 bg-indigo-50 rounded-full mb-6">
          <Shield size={48} className="text-indigo-500" strokeWidth={2} />
        </div>

        <h2 className="text-3xl font-bold mb-3 text-gray-800 tracking-tight">
          Verify Your Email
        </h2>
        <p className="text-gray-500 text-sm mb-3">
          We've sent a verification code to
        </p>
        
        <div className="inline-flex items-center gap-2 bg-indigo-50 px-5 py-2.5 rounded-xl mb-8">
          <Mail size={16} className="text-indigo-500" />
          <span className="text-sm font-semibold text-indigo-600">{userEmail}</span>
        </div>

        <form onSubmit={handleOtpSubmit} className="space-y-5">
          <motion.input
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            type="text"
            maxLength="6"
            placeholder="• • • • • •"
            className="border-2 border-gray-200 w-full rounded-xl p-4 text-center text-2xl tracking-[12px] font-bold outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-800 transition-all"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            disabled={loading}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 w-full py-4 text-white rounded-xl font-bold text-base hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Didn't receive code?{" "}
          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default EmailVerification;