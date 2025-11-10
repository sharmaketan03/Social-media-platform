import React, { useEffect, useState } from "react";
import instance from "./axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "./UseContext";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
   const {userId,setId}=useContext(MyContext)
  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await instance.get("/profile/userlogin", {
          withCredentials: true,
        });

        console.log("User Authenticated ✅", res.data);
        setId(res.data.userId)
        console.log("User login  h")
        setAuth(true);
      } catch (err) {
        console.log("Not Logged In ❌", err);
        setAuth(false);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // ✅ Agar auth hai → children (Home ya aur page render)
  // ❌ Agar auth nahi → Login pe redirect
  return auth ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
