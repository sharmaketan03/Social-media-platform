import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import cake from "../assets/Cake.png";
import instance from "./axios";
import {MyContext} from "./UseContext";

const Dob = ({ onNext }) => {
  const [dob, setDob] = useState({ month: "", day: "", year: "" });

  const handleChange = async(e) => {
    setDob({ ...dob, [e.target.name]: e.target.value });
  };
let {userId}=useContext(MyContext)
console.log("userId:",userId)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { month, day, year } = dob;

    if (!month || !day || !year) {
      alert("Please select complete Date of Birth");
      return;
    }

    const finalDob = `${year}-${month}-${day}`;
    console.log("DOB =>", finalDob);
    try{
        let res=await instance.put("/profile/DoB",{dob:finalDob,userId:userId},{withCredentials:true})
        console.log(res)
    }catch(err){
         console.log("birthday Dob error",err)

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#8d8daa] via-[#dfdfde] to-[#f7f5f2]">

      {/* ✅ Animation container */}
      <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{
    duration: 0.4,
    ease: "easeOut"
  }}
  className="bg-white p-8 shadow-lg rounded-lg w-[380px] text-center"
>

        <div className="w-[80px] mx-auto flex justify-center mb-4">
          <img src={cake} alt="Cake"/>
        </div>

        <h2 className="text-xl font-semibold mb-2">Add your date of birth</h2>
        <p className="text-gray-500 text-sm mb-1">
          This won't be part of your public profile.
        </p>
        <button className="text-blue-600 text-sm mb-4 font-medium">
          Why do I need to provide my date of birth?
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <select name="month" className="border rounded-md p-2 w-1/3"
              value={dob.month} onChange={handleChange}>
              <option value="">Month</option>
              {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
            </select>

            <select name="day" className="border rounded-md p-2 w-1/3"
              value={dob.day} onChange={handleChange}>
              <option value="">Day</option>
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>

            <select name="year" className="border rounded-md p-2 w-1/3"
              value={dob.year} onChange={handleChange}>
              <option value="">Year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <p className="text-xs text-gray-500">You need to enter your birth date.</p>
          <p className="text-xs text-gray-500 mb-4">Use your real date of birth.</p>

          <button type="submit"
            className="bg-indigo-500 w-full py-2 text-white rounded-md font-semibold hover:bg-indigo-600">
            Next
          </button>
        </form>

        <Link to="/register" className="block mt-3 text-blue-600 font-medium text-sm">
          Go back
        </Link>

        <div className="border-t mt-6 pt-4">
          <p className="text-sm">Have an account? <span className="text-blue-600 font-medium cursor-pointer">Log in</span></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dob;


 