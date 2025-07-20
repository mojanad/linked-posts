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

export default function AppNavbar() {
  const { userData, getUserData, isLoadingUserData, logout } =
    useContext(userContext);
  console.log("🚀 ~ AppNavbar ~ userData:", userData);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData(localStorage.getItem("token"));
    }
  }, []);

  return (
    <Navbar rounded>
      <div className="flex justify-between items-center gap-2 sm:gap-12 w-full">
        <NavbarBrand as={Link} href="https://flowbite-react.com">
          <Aave size="32" color="#FF8A65" />
        </NavbarBrand>
        <TextInput
          id="search"
          type="search"
          placeholder="Search"
          shadow
          className="grow"
          size="sm"
        />

        {isLoadingUserData && (
          <h4 className="w-40">
            <Skeleton />
          </h4>
        )}
        {userData && (
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 w-8 rounded-xl overflow-hidden">
              <img src={userData?.photo} alt={userData?.name} />
            </div>
            <h4>
              <span className="font-bold">hello</span>{" "}
              {userData?.name.split(" ")[0]}
            </h4>
            <AppButton color="dark" size="sm" className="py-2" onClick={logout}>
              <LogoutCurve size="32" color="#FF8A65" />
            </AppButton>
          </div>
        )}
      </div>
      {/* <NavbarToggle />
      <NavbarCollapse> */}
      {/* </NavbarCollapse> */}
    </Navbar>
  );
}
