// ReactRouter.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dob from "./Dob";
import EmailVerification from "./EmailVerification";
import ProfileUpdate from "./ProfileUpdate";
import Home from "./Home";
import Explore from "../AllInnerComponents/Explore";
import ProtectedRoute from "./ProtectedRoute";
import RightContent from "../sidebarComponents/RightContent";
import Profile from "../AllInnerComponents/Profile";
import EditProfile from "../AllInnerComponents/EditProfile"
// import ProfilePicUpdate from "../AllInnerComponents/ProfilePicUpdate"
const router = createBrowserRouter([
  { index: true, element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/Dob", element: <Dob /> },
  { path: "/EmailVerify", element: <EmailVerification /> },
  { path: "/profile-Picture-update", element: <ProfileUpdate /> },

  {
    path: "/home",
    element: 
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ,
    children: [
      { index: true, element: <RightContent /> }, 
      { path: "explore", element: <Explore /> }, 
      {path:"profile",element:<Profile/>},
      {path:"editProfile",element:<EditProfile/>} ,
     
    ],
  },
]);

export default function ReactRouter() {
  return <RouterProvider router={router} />;
}
