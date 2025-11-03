import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dob from "./Dob";
import EmailVerification from "./EmailVerification";
import ProfileUpdate from "./ProfileUpdate"
const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },{
    path:"/Dob",
    element:<Dob/>
  },
  {
    path:"/EmailVerify",
    element:<EmailVerification/>
  },{
    path:"/profile-Picture-update",
    element:<ProfileUpdate/>
  }
]);

function ReactRouter() {
  return <RouterProvider router={router} />;
}

export default ReactRouter;
