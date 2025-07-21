import React from "react";
import { Navigate } from "react-router";

export default function ProtectedRoutes({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  }

  return <Navigate to={"/login"} />;
}
