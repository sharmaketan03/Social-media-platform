import React, { useEffect, useState } from "react";
// import axios from "axios";
import instance from "../Components/axios";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
 
    dob: "",
    bio: "",
    website: "",
    isPrivate: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  useEffect(() => {
    let value = async () => {
      try {
        let res = await instance.get("/profile/getProfile", {
          withCredentials: true,
        });
        console.log(res.data.user);

        setFormData({
          fullName: res.data.user.fullName,
          username: res.data.user.username,
          email: res.data.user.email,
         
          dob:  res.data.user.dob?new Date(res.data.user.dob).toISOString().split("T")[0]:"",
          bio:  res.data.user.bio,
          website: res.data.user.website,
          isPrivate:res.data.user.isPrivate || false
        });
      } catch (err) {
        console.log("Get the edit Profile error", err);
      }
    };
    value();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    console.log("formData:",formData)
    try {
      const res = await instance.put("/profile/editProfile", formData,{withCredentials:true});
      setMessage("User registered successfully ✅");
      setFormData({
        fullName: "",
        username: "",
        email: "",
       
        dob: "",
        bio: "",
        website: "",
        isPrivate: false,
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register User</h2>
      {message && (
        <p className="mb-4 text-center text-red-500 font-semibold">{message}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {/* <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          required
        /> */}
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isPrivate"
            checked={formData.isPrivate}
            onChange={handleChange}
            id="isPrivate"
          />
          <label htmlFor="isPrivate">Private Account</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}
