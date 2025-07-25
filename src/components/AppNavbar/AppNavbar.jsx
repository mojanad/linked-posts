import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Aave, LogoutCurve } from "iconsax-reactjs";
import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { userContext } from "../../ context/UserContext";
import Skeleton from "react-loading-skeleton";
import AppButton from "../shared/AppButton";
import { useAuth } from "../../hooks/useAuth";

export default function AppNavbar() {
  const { userData, getUserData, isLoadingUserData, logout } =
    useContext(userContext);

  const auth = useAuth();
  const userProfile = window.location.origin;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData(localStorage.getItem("token"));
    }
  }, []);

  return (
    <Navbar rounded>
      <div className="flex justify-between items-center gap-2 sm:gap-12 w-full">
        <NavbarBrand as={Link} href="/">
          <Aave size="32" className="text-blue-600" />
        </NavbarBrand>
        <TextInput
          id="search"
          type="search"
          placeholder="Search"
          shadow
          className="grow"
          size="sm"
        />
        {/* todo: enhance loading functionality */}
        {isLoadingUserData ? (
          <h4 className="w-40">
            <Skeleton />
          </h4>
        ) : userData ? (
          <div className="flex items-center gap-2">
            <Link to={`${userProfile}/user-posts`}>
              <div className="bg-gray-200 w-8 rounded-xl overflow-hidden">
                <img src={userData.photo} alt={userData.name} />
              </div>
            </Link>
            <h4>
              <span className="font-bold">hello</span>{" "}
              {userData.name.split(" ")[0]}
            </h4>
            <button className="py-2 cursor-pointer" onClick={logout}>
              <LogoutCurve size="28" className="text-blue-600" />
            </button>
          </div>
        ) : (
          <Link to={"/login"}>login</Link>
        )}
      </div>
    </Navbar>
  );
}
