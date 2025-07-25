import axios from "axios";
import { createContext, useState } from "react";

export const userContext = createContext(null);

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  // getting user data to use in the navbar
  const getUserData = async function (token) {
    setIsLoadingUserData(true);
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/users/profile-data`,
        {
          headers: {
            token,
          },
        }
      );
      setUserData(data?.user);
      localStorage.setItem("userId", data?.user?._id);
      setIsLoadingUserData(false);
    } catch (error) {
      setIsLoadingUserData(false);
      console.log("🚀 ~ getUserData ~ error:", error);
    }
  };

  // logout the user
  const logout = () => {
    localStorage.clear();
    setUserData(null);
  };

  const value = { getUserData, userData, isLoadingUserData, logout };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
