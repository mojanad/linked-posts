import { userContext } from "../ context/UserContext";

import { useContext } from "react";
export const useAuth = () => {
  const { userData } = useContext(userContext);

  return !!(localStorage.getItem("token") || userData);
};
