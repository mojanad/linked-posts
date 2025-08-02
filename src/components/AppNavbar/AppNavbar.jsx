import { Button, Navbar, NavbarBrand, TextInput } from "flowbite-react";
import { Aave, LogoutCurve } from "iconsax-reactjs";
import { useContext, useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";
import { userContext } from "../../ context/UserContext";
import { useAuth } from "../../hooks/useAuth";

export default function AppNavbar() {
  const isLogin = useAuth();
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const { userData, getUserData, isLoadingUserData, logout } =
    useContext(userContext);

  const userProfile = window.location.origin;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData(localStorage.getItem("token"));
    }
  }, []);

  // const calc = () => {
  //   console.log("no memo");
  //   let res = 0;
  //   for (let index = 0; index < 20000000; index++) {
  //     res += count;
  //   }
  //   return res;
  // };
  // const calcWithMemo = useMemo(() => {
  //   console.log("with memo");
  //   let res = 0;
  //   for (let index = 0; index < 20000000; index++) {
  //     res += count;
  //   }
  //   return res;
  // }, [count]);

  return (
    <Navbar rounded>
      {/* <p>calc :{calc()}</p>
      <p>calc :{calcWithMemo}</p>
      <Button onClick={() => setCount((prev) => prev + 1)}>+</Button>
      <Button onClick={() => setCount((prev) => prev - 1)}>-</Button> */}
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
          onKeyDown={(e) => setSearchText(e.target.value)}
        />
        {/* todo: enhance loading functionality */}
        {isLoadingUserData ? (
          <h4 className="w-40">
            <Skeleton />
          </h4>
        ) : isLogin ? (
          <div className="flex items-center gap-2">
            <Link to={`${userProfile}/user-posts`}>
              <div className="bg-gray-200 w-8 rounded-xl overflow-hidden">
                <img src={userData?.photo} alt={userData?.name} />
              </div>
            </Link>
            <h4>
              <span className="font-bold">hello</span>{" "}
              {userData?.name.split(" ")[0]}
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
