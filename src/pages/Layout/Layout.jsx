import { Outlet } from "react-router";
import AppNavbar from "../../components/AppNavbar/AppNavbar";

export default function Layout() {
  return (
    <main className="min-h-screen bg-gray-100">
      <AppNavbar />
      <Outlet />
    </main>
  );
}
