import { useContext } from "react";
import { Navigate } from "react-router";
import { userContext } from '../ context/UserContext';

export default function ProtectedRoutes({ children }) {
  const { userData } = useContext(userContext)
  if (localStorage.getItem("token") || userData) {
    return children;
  }

  return <Navigate to={"/login"} />;
}
