import { Outlet } from "react-router";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import { UserContextProvider } from "../../ context/UserContext";

export default function Layout() {
  return (
    <main className="min-h-screen bg-gray-100">
      {" "}
      <AppNavbar />
      <Outlet />
    </main>
  );
}
