import { Outlet } from "react-router";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import { UserContextProvider } from "../../ context/UserContext";
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  return (
    <main className="min-h-screen bg-gray-100 relative">
      <div className="fixed bottom-0 end-2">
        <Online
          polling={{
            timeout: 300,
          }}
        >
          Only shown when you're online
        </Online>
        <Offline
          polling={{
            timeout: 300,
          }}
        >
          Only shown offline (surprise!)
        </Offline>
      </div>
      <AppNavbar />
      <Outlet />
    </main>
  );
}
