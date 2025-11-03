import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import { Cake } from "lucide-react";
import instance from "./axios";
import {MyContext} from "./UseContext";
import { useNavigate } from "react-router-dom";

const Dob = ({ onNext }) => {
  const [dob, setDob] = useState({ month: "", day: "", year: "" });
  let navigate = useNavigate();
  
  const handleChange = async(e) => {
    setDob({ ...dob, [e.target.name]: e.target.value });
  };
  
  let {userId} = useContext(MyContext);
  console.log("userId:", userId);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { month, day, year } = dob;

    if (!month || !day || !year) {
      alert("Please select complete Date of Birth");
      return;
    }

    const finalDob = `${year}-${month}-${day}`;
    console.log("DOB =>", finalDob);
    try {
      let res = await instance.put("/profile/DoB", {dob: finalDob, userId: userId}, {withCredentials: true});
      console.log(res);
      navigate("/EmailVerify");
    } catch(err) {
      console.log("birthday Dob error", err);
    }

    onNext && onNext(finalDob);
  };

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 p-5">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-10 shadow-2xl rounded-3xl w-full max-w-md text-center"
      >
        {/* Icon */}
        <div className="inline-flex p-5 bg-pink-50 rounded-full mb-5">
          <Cake size={48} className="text-pink-500" strokeWidth={2} />
        </div>

        <h2 className="text-3xl font-bold mb-3 text-gray-800">Add Your Birthday</h2>
        <p className="text-gray-500 text-sm mb-2">
          This won't be part of your public profile.
        </p>
        <button className="text-indigo-600 text-sm mb-6 font-semibold hover:underline">
          Why do I need to provide my date of birth?
        </button>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-3">
            <select 
              name="month" 
              className="border-2 border-gray-200 rounded-xl p-3 w-1/3 text-sm font-medium bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={dob.month} 
              onChange={handleChange}
            >
              <option value="">Month</option>
              {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
            </select>

            <select 
              name="day" 
              className="border-2 border-gray-200 rounded-xl p-3 w-1/3 text-sm font-medium bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={dob.day} 
              onChange={handleChange}
            >
              <option value="">Day</option>
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>

            <select 
              name="year" 
              className="border-2 border-gray-200 rounded-xl p-3 w-1/3 text-sm font-medium bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={dob.year} 
              onChange={handleChange}
            >
              <option value="">Year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>You need to enter your birth date.</p>
            <p>Use your real date of birth.</p>
          </div>

          <button 
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 w-full py-4 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Next
          </button>
        </form>

        <Link 
          to="/register" 
          className="block mt-4 text-indigo-600 font-semibold text-sm hover:underline"
        >
          Go back
        </Link>

        <div className="border-t border-gray-200 mt-6 pt-5">
          <p className="text-sm text-gray-600">
            Have an account?{" "}
            <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
              Log in
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dob;