import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function ReactRouter() {
  return <RouterProvider router={router} />;
}

export default ReactRouter;
