import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import { Cake } from "lucide-react";
import instance from "./axios";
import { MyContext } from "./UseContext";

const Dob = () => {
  const [dob, setDob] = useState({ month: "", day: "", year: "" });
  const navigate = useNavigate();
  const { userId } = useContext(MyContext);

  const handleChange = (e) => {
    setDob({ ...dob, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { month, day, year } = dob;

    if (!month || !day || !year) {
      alert("Please select complete Date of Birth");
      return;
    }

    const finalDob = `${year}-${month}-${day}`;
    console.log("DOB =>", finalDob);

    try {
      let res = await instance.put(
        "/profile/DoB",
        { dob: finalDob, userId },
        { withCredentials: true }
      );

      console.log("DOB Response:", res.data);
       console.log("Navigate this page")
        navigate("/EmailVerify"); 
      

    } catch (err) {
      console.log("birthday Dob error", err);
    }
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
        <div className="inline-flex p-5 bg-pink-50 rounded-full mb-5">
          <Cake size={48} className="text-pink-500" strokeWidth={2} />
        </div>

        <h2 className="text-3xl font-bold mb-3 text-gray-800">Add Your Birthday</h2>
        <p className="text-gray-500 text-sm mb-2">
          This won't be part of your public profile.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-3">
            <select name="month" className="border-2 border-gray-200 rounded-xl p-3 w-1/3 text-sm font-medium bg-gray-50"
              value={dob.month} onChange={handleChange}>
              <option value="">Month</option>
              {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
            </select>

            <select name="day" className="border-2 border-gray-200 rounded-xl p-3 w-1/3 text-sm font-medium bg-gray-50"
              value={dob.day} onChange={handleChange}>
              <option value="">Day</option>
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>

            <select name="year" className="border-2 border-gray-200 rounded-xl p-3 w-1/3 text-sm font-medium bg-gray-50"
              value={dob.year} onChange={handleChange}>
              <option value="">Year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
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
      </motion.div>
    </div>
  );
};

export default Dob;
